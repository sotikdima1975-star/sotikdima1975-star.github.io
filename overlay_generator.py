from PIL import Image, ImageDraw, ImageFont

W, H = 1920, 1080

# Позиции и размеры
GAME_X, GAME_Y = 20, 200  # геймплей: отступ 20px слева, 200px сверху
GAME_W, GAME_H = 900, 600  # геймплей: 900x600 пикселей

CHAT_X, CHAT_Y = 1920 - 400 - 20, 50  # чат: 400px ширины, 800px высоты, отступ 20px справа, 50px сверху
CHAT_W, CHAT_H = 400, 800

CAM_X, CAM_Y = 1920 - 300 - 20, 1080 - 300 - 20  # камера: 300x300 пикселей, отступ 20px снизу и справа
CAM_W, CAM_H = 300, 300

# Создание изображения
img = Image.new("RGB", (W, H), (5, 6, 10))
draw = ImageDraw.Draw(img)

def box(x, y, w, h, label):
    draw.rectangle([x, y, x+w, y+h], outline="white", width=3)
    try:
        font = ImageFont.truetype("arial.ttf", 40)
    except:
        font = ImageFont.load_default()
    bbox = draw.textbbox((0, 0), label, font=font)
    tw = bbox[2] - bbox[0]
    th = bbox[3] - bbox[1]
    draw.text((x + (w - tw)//2, y + (h - th)//2), label, fill="white", font=font)

# Рисуем зоны
box(GAME_X, GAME_Y, GAME_W, GAME_H, "ГЕЙМПЛЕЙ")
box(CHAT_X, CHAT_Y, CHAT_W, CHAT_H, "ЧАТ")
box(CAM_X, CAM_Y, CAM_W, CAM_H, "КАМЕРА")

# Сохраняем
img.save("images/overlay_1920x1080.png")
print("Готово: images/overlay_1920x1080.png")