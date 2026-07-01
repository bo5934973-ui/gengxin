import { Buffer } from "node:buffer";
import { connectLambda, getStore } from "@netlify/blobs";

const STORE_NAME = "portfolio-media";
const MAX_FILE_SIZE = 6 * 1024 * 1024;

const corsHeaders = {
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Origin": "*"
};

function json(statusCode, body) {
  return {
    statusCode,
    headers: {
      ...corsHeaders,
      "Cache-Control": "no-store",
      "Content-Type": "application/json; charset=utf-8"
    },
    body: JSON.stringify(body)
  };
}

function sanitizeName(name = "image") {
  const clean = name
    .toLowerCase()
    .replace(/\.[a-z0-9]+$/i, "")
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);

  return clean || "image";
}

function extensionFor(type) {
  return {
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
    "image/gif": "gif",
    "image/svg+xml": "svg"
  }[type];
}

function arrayBufferFromBuffer(buffer) {
  return buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);
}

export async function handler(event) {
  connectLambda(event);

  if (event.httpMethod === "OPTIONS") {
    return json(204, {});
  }

  const store = getStore(STORE_NAME);

  if (event.httpMethod === "GET") {
    const url = new URL(event.rawUrl || `https://site.local${event.path}?${event.rawQuery || ""}`);
    const key = url.searchParams.get("key");

    if (!key) return json(400, { error: "Missing image key." });

    const result = await store.getWithMetadata(key, { type: "arrayBuffer" }).catch(() => null);
    if (!result?.data) return json(404, { error: "Image not found." });

    const contentType = String(result.metadata?.contentType || "application/octet-stream");
    return {
      statusCode: 200,
      headers: {
        ...corsHeaders,
        "Cache-Control": "public, max-age=31536000, immutable",
        "Content-Type": contentType
      },
      isBase64Encoded: true,
      body: Buffer.from(result.data).toString("base64")
    };
  }

  if (event.httpMethod !== "POST") {
    return json(405, { error: "Method not allowed." });
  }

  const expectedPassword = process.env.ADMIN_PASSWORD;
  if (!expectedPassword) {
    return json(500, { error: "Server is missing ADMIN_PASSWORD." });
  }

  let body;
  try {
    body = JSON.parse(event.body || "{}");
  } catch {
    return json(400, { error: "Invalid JSON body." });
  }

  if (body.password !== expectedPassword) {
    return json(401, { error: "后台密码不正确。" });
  }

  const contentType = String(body.contentType || "");
  const ext = extensionFor(contentType);
  if (!ext) {
    return json(400, { error: "只支持 JPG、PNG、WebP、GIF、SVG 图片。" });
  }

  const base64 = String(body.data || "").replace(/^data:[^;]+;base64,/, "");
  const buffer = Buffer.from(base64, "base64");
  if (!buffer.length) return json(400, { error: "图片内容为空。" });
  if (buffer.length > MAX_FILE_SIZE) {
    return json(400, { error: "图片不能超过 6MB。" });
  }

  const key = `${Date.now()}-${sanitizeName(body.filename)}.${ext}`;
  await store.set(key, arrayBufferFromBuffer(buffer), {
    metadata: {
      contentType,
      filename: String(body.filename || key)
    }
  });

  return json(200, {
    key,
    url: `/.netlify/functions/media?key=${encodeURIComponent(key)}`
  });
}
