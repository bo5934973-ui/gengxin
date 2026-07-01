import { connectLambda, getStore } from "@netlify/blobs";
import defaultContent from "../../public/content/site.json" with { type: "json" };

const STORE_NAME = "portfolio-content";
const CONTENT_KEY = "site";

const headers = {
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Origin": "*",
  "Cache-Control": "no-store",
  "Content-Type": "application/json; charset=utf-8"
};

function json(statusCode, body) {
  return {
    statusCode,
    headers,
    body: JSON.stringify(body)
  };
}

function getStoreClient() {
  return getStore(STORE_NAME);
}

function validateContent(content) {
  return (
    content &&
    typeof content === "object" &&
    content.site &&
    content.hero &&
    content.worksSection &&
    content.about &&
    content.contact &&
    Array.isArray(content.works)
  );
}

export async function handler(event) {
  connectLambda(event);

  if (event.httpMethod === "OPTIONS") {
    return json(204, {});
  }

  const store = getStoreClient();

  if (event.httpMethod === "GET") {
    const content = await store.get(CONTENT_KEY, { type: "json" }).catch(() => null);
    return json(200, { content: content || defaultContent });
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

  if (!validateContent(body.content)) {
    return json(400, { error: "内容格式不完整，保存失败。" });
  }

  await store.setJSON(CONTENT_KEY, body.content);
  return json(200, { content: body.content, savedAt: new Date().toISOString() });
}
