from PIL import Image
import sys

if len(sys.argv) != 3:
    print("Usage: python remove_background.py <input_path> <output_path>")
    sys.exit(1)

input_path = sys.argv[1]
output_path = sys.argv[2]

# Открываем изображение
img = Image.open(input_path)
img = img.convert('RGBA')

data = img.getdata()
newData = []

# Удаляем белый фон
for item in data:
    # Если пиксел белый (или почти белый), делаем его прозрачным
    if item[0] > 200 and item[1] > 200 and item[2] > 200:
        newData.append((255, 255, 255, 0))
    else:
        newData.append(item)

# Применяем новые данные и сохраняем
img.putdata(newData)
img.save(output_path, 'PNG')
print(f'Изображение сохранено с прозрачным фоном: {output_path}')