from datetime import date, datetime

some_str = '24.05.2022'
array = some_str.split('.')

print(date(int(array[2]), int(array[1]), int(array[0])))