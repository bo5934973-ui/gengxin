from pathlib import Path
from math import sin, cos, pi
import random

from PIL import Image, ImageDraw, ImageFilter, ImageFont


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "works"
OUT.mkdir(parents=True, exist_ok=True)

W, H = 1600, 1200


def font(size, bold=False):
    candidates = [
        Path("C:/Windows/Fonts/msyhbd.ttc" if bold else "C:/Windows/Fonts/msyh.ttc"),
        Path("C:/Windows/Fonts/simhei.ttf"),
        Path("C:/Windows/Fonts/arial.ttf"),
    ]
    for item in candidates:
        if item.exists():
            return ImageFont.truetype(str(item), size=size)
    return ImageFont.load_default()


def gradient(size, top, bottom):
    img = Image.new("RGB", size, top)
    pix = img.load()
    for y in range(size[1]):
        t = y / max(1, size[1] - 1)
        color = tuple(int(top[i] * (1 - t) + bottom[i] * t) for i in range(3))
        for x in range(size[0]):
            pix[x, y] = color
    return img


def add_noise(img, amount=10):
    rng = random.Random(18)
    pix = img.load()
    for _ in range(W * H // 38):
        x = rng.randrange(W)
        y = rng.randrange(H)
        r, g, b = pix[x, y]
        delta = rng.randrange(-amount, amount + 1)
        pix[x, y] = tuple(max(0, min(255, c + delta)) for c in (r, g, b))
    return img


def glow_layer(center, radius, color, opacity=180):
    layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    draw = ImageDraw.Draw(layer)
    cx, cy = center
    for i in range(80, 0, -1):
        t = i / 80
        alpha = int(opacity * (t ** 2))
        rr = int(radius * (1 - t * 0.84))
        draw.ellipse((cx - rr, cy - rr, cx + rr, cy + rr), fill=(*color, alpha))
    return layer.filter(ImageFilter.GaussianBlur(24))


def text(draw, xy, value, size, fill, bold=False):
    draw.text(xy, value, font=font(size, bold), fill=fill)


def save(img, name):
    img = add_noise(img.convert("RGB"), 6)
    img.save(OUT / name, quality=94)


def smart_ring():
    img = gradient((W, H), (4, 5, 8), (18, 22, 30)).convert("RGBA")
    img.alpha_composite(glow_layer((820, 520), 520, (210, 230, 255), 150))
    layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    draw = ImageDraw.Draw(layer)
    draw.ellipse((468, 258, 1132, 922), fill=(220, 225, 232, 255), outline=(255, 255, 255, 120), width=3)
    draw.ellipse((610, 400, 990, 780), fill=(5, 6, 9, 255), outline=(255, 255, 255, 80), width=3)
    for i in range(34):
        a = i / 34 * pi * 2
        x = 800 + cos(a) * 320
        y = 590 + sin(a) * 320
        alpha = int(60 + 120 * max(0, sin(a + 0.7)))
        draw.line((800, 590, x, y), fill=(255, 255, 255, alpha), width=2)
    layer = layer.filter(ImageFilter.GaussianBlur(0.4))
    img.alpha_composite(layer)
    draw = ImageDraw.Draw(img)
    text(draw, (112, 1000), "DalingRing 智能戒指视觉", 48, (255, 255, 255, 220), True)
    text(draw, (112, 1064), "智能硬件 / 产品视觉 / 产品渲染", 24, (255, 255, 255, 128))
    save(img, "dalingring-smart-ring.png")


def product_render():
    img = gradient((W, H), (241, 243, 247), (218, 224, 232)).convert("RGBA")
    img.alpha_composite(glow_layer((790, 500), 540, (255, 255, 255), 160))
    draw = ImageDraw.Draw(img)
    draw.rounded_rectangle((380, 300, 1220, 780), radius=70, fill=(205, 211, 220), outline=(255, 255, 255), width=6)
    draw.rounded_rectangle((470, 386, 1130, 700), radius=44, fill=(18, 21, 28))
    draw.ellipse((700, 438, 900, 638), fill=(176, 204, 238), outline=(255, 255, 255, 150), width=4)
    draw.ellipse((744, 482, 856, 594), fill=(18, 21, 28))
    draw.rounded_rectangle((500, 828, 1100, 856), radius=14, fill=(45, 50, 58, 36))
    text(draw, (142, 996), "产品渲染作品合集", 48, (17, 17, 17), True)
    text(draw, (142, 1062), "精致材质、克制高光与干净的商业展示", 24, (95, 99, 108))
    save(img, "product-rendering-collection.png")


def world_cup():
    img = gradient((W, H), (5, 5, 6), (20, 22, 28)).convert("RGBA")
    img.alpha_composite(glow_layer((820, 440), 380, (255, 255, 255), 120))
    draw = ImageDraw.Draw(img)
    draw.polygon([(0, 916), (320, 760), (690, 840), (1050, 700), (1600, 620), (1600, 1200), (0, 1200)], fill=(190, 208, 232, 180))
    draw.ellipse((560, 240, 1040, 720), fill=(245, 245, 247))
    pts = []
    for i in range(10):
        a = -pi / 2 + i * pi * 2 / 10
        r = 178 if i % 2 == 0 else 78
        pts.append((800 + cos(a) * r, 480 + sin(a) * r))
    draw.polygon(pts, fill=(10, 10, 12))
    draw.line((460, 240, 1150, 780), fill=(210, 229, 255, 110), width=16)
    text(draw, (116, 1000), "世界杯活动海报", 50, (255, 255, 255), True)
    text(draw, (116, 1066), "海报设计 / 活动传播 / 运动视觉", 24, (255, 255, 255, 132))
    save(img, "world-cup-campaign-poster.png")


def ecommerce():
    img = gradient((W, H), (7, 7, 9), (25, 28, 36)).convert("RGBA")
    img.alpha_composite(glow_layer((1120, 430), 430, (210, 231, 255), 170))
    draw = ImageDraw.Draw(img)
    draw.rounded_rectangle((214, 250, 760, 654), radius=38, fill=(255, 255, 255, 26), outline=(255, 255, 255, 42), width=2)
    text(draw, (256, 362), "新品视觉", 62, (255, 255, 255), True)
    text(draw, (256, 440), "电商横幅设计", 28, (255, 255, 255, 160))
    draw.rounded_rectangle((256, 534, 466, 592), radius=29, fill=(255, 255, 255))
    text(draw, (314, 552), "立即查看", 20, (17, 17, 17), True)
    draw.rounded_rectangle((860, 330, 1320, 790), radius=82, fill=(225, 230, 238), outline=(255, 255, 255, 80), width=3)
    draw.ellipse((968, 438, 1212, 682), fill=(36, 39, 46))
    draw.ellipse((1026, 496, 1154, 624), fill=(192, 212, 240))
    text(draw, (142, 1000), "电商横幅设计", 48, (255, 255, 255, 220), True)
    text(draw, (142, 1064), "电商 / 活动视觉 / 转化设计", 24, (255, 255, 255, 126))
    save(img, "ecommerce-banner-design.png")


def brand_identity():
    img = gradient((W, H), (246, 247, 249), (232, 235, 240)).convert("RGBA")
    draw = ImageDraw.Draw(img)
    draw.rounded_rectangle((112, 120, 1488, 1080), radius=50, fill=(255, 255, 255))
    text(draw, (190, 300), "JQ", 170, (17, 17, 17), True)
    draw.rounded_rectangle((196, 464, 566, 474), radius=5, fill=(17, 17, 17))
    draw.rounded_rectangle((196, 510, 716, 520), radius=5, fill=(135, 138, 145, 90))
    draw.rounded_rectangle((906, 252, 1246, 592), radius=34, fill=(5, 5, 5))
    draw.ellipse((984, 330, 1168, 514), fill=(160, 170, 184))
    draw.rounded_rectangle((906, 652, 1246, 824), radius=28, fill=(245, 245, 247), outline=(17, 17, 17, 20), width=2)
    draw.rounded_rectangle((966, 722, 1186, 738), radius=8, fill=(17, 17, 17, 180))
    text(draw, (190, 996), "品牌识别探索", 48, (17, 17, 17), True)
    text(draw, (190, 1062), "字体设计 / 视觉识别 / 品牌系统", 24, (116, 120, 128))
    save(img, "brand-identity-exploration.png")


def ai_visual():
    img = gradient((W, H), (5, 5, 6), (15, 18, 24)).convert("RGBA")
    img.alpha_composite(glow_layer((802, 502), 500, (218, 235, 255), 150))
    draw = ImageDraw.Draw(img)
    for i in range(12):
        y = 420 + i * 28
        draw.arc((300, y, 1300, y + 260), start=190, end=350, fill=(210, 225, 245, 40 + i * 8), width=10)
    draw.rounded_rectangle((580, 312, 1020, 752), radius=88, fill=(255, 255, 255, 24), outline=(255, 255, 255, 48), width=2)
    draw.ellipse((682, 414, 918, 650), fill=(230, 238, 250))
    draw.ellipse((744, 476, 856, 588), fill=(18, 22, 30))
    text(draw, (116, 1000), "AI 视觉实验", 50, (255, 255, 255), True)
    text(draw, (116, 1066), "AI 指导 / 情绪板 / 视觉概念", 24, (255, 255, 255, 132))
    save(img, "ai-visual-experiments.png")


if __name__ == "__main__":
    smart_ring()
    product_render()
    world_cup()
    ecommerce()
    brand_identity()
    ai_visual()
    print("created png portfolio images")
