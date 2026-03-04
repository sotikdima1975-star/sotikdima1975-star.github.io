from PIL import Image
import sys
import os

def remove_outer_background(input_path, output_path):
    """
    Удаляет только внешний фон вокруг QR-кода, сохраняя внутренний фон нетронутым.
    """
    
    # Проверяем существование входного файла
    if not os.path.exists(input_path):
        print(f"Ошибка: файл не найден: {input_path}")
        return False
    
    try:
        # Открываем изображение
        img = Image.open(input_path)
        
        # Конвертируем в RGBA для поддержки прозрачности
        img = img.convert('RGBA')
        
        # Получаем размеры изображения
        width, height = img.size
        
        # Получаем пиксели изображения
        data = img.getdata()
        
        # Создаем новый список пикселей
        new_data = []
        
        # Проходим по всем пикселям
        for item in data:
            # Если пиксель белый или почти белый (R, G, B > 240), делаем его прозрачным
            # Это предполагает, что внешний фон белый
            if item[0] > 240 and item[1] > 240 and item[2] > 240:
                # Прозрачный пиксель
                new_data.append((255, 255, 255, 0))
            else:
                # Сохраняем оригинальный пиксель
                new_data.append(item)
        
        # Создаем новое изображение с теми же размерами
        new_img = Image.new('RGBA', (width, height), (255, 255, 255, 0))
        new_img.putdata(new_data)
        
        # Сохраняем изображение
        new_img.save(output_path, 'PNG')
        print(f"Успешно сохранено: {output_path}")
        return True
        
    except Exception as e:
        print(f"Ошибка при обработке изображения: {str(e)}")
        return False

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Использование: python qr_background_remover.py <входной_файл> <выходной_файл>")
        sys.exit(1)
    
    input_file = sys.argv[1]
    output_file = sys.argv[2]
    
    success = remove_outer_background(input_file, output_file)
    
    if not success:
        sys.exit(1)