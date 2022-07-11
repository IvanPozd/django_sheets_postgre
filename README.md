# Вэб-приложение Таблица

Табличные данные отображаются в режиме реального времени.
Данные берутся из Google Sheets c помощью Google API

## Установка и настройка окружения

Для развертывания приложения на своем локальном или удаленном сервере
потребуется: git, docker, docker-compose

Если программы не установлены, пройдите про следующим ссылкам:

* <https://git-scm.com/book/en/v2/Getting-Started-Installing-Git>

* <https://docs.docker.com/engine/install/>

* <https://docs.docker.com/compose/install/compose-desktop/>

### 1. Клонируем git репозиторий

```bash
git clone https://github.com/IvanPozd/django_sheets_postgre.git
```

### 2. Создайте таблицу в Google Sheets

2.1 Создайте таблицу (по примеру файла ```example.xslx```, который находится в корне проекта) в своём аккаунте Google Sheets.
Выдайте себе права сервисного аккаунта.

2.2 В деректории ```/data``` создайте папку ```/creds```

2.3 В папку ```/creds``` поместите JSON file выданный Вам от Google. Скопируйте его полное название.

2.4 В директории ```/data``` в файле ```build.py``` укажите название файла credentials.

```python
27  def get_service_sacc():
28      creds_json = (os.path.dirname(__file__) + "/creds/НАЗВАНИЕ-ВАШЕГО-ФАЙЛА")
```

2.5 Скопируйте ID Вашей таблицы в Google Sheets.

```https://docs.google.com/spreadsheets/d/ID-БУДЕТ-НАХОДИТЬСЯ-ЗДЕСЬ/edit#gid=0```

2.6 В директории ```/data``` в файле ```build.py```

```python
53    def master():
54        all_data = []
55        # service = get_service_simple()
56        service = get_service_sacc()
57        sheet = service.spreadsheets()
58
59        
60        sheet_id = "ID-ВАШЕЙ-ТАБЛИЦЫ"
```

### 3. Создайте файл ```.env.dev``` в корневой деректории

```python
SECRET_KEY=django-insecure-3802pj3#5k=2f3xv%behpd^=jcloige8q!$$u573r@a_0ld4u-
DEBUG=1
SQL_ENGINE=django.db.backends.postgresql
SQL_DATABASE=НАЗВАНИЕ-ВАШЕЙ-ДБ
SQL_USER=ИМЯ-ЮЗЕРА
SQL_PASSWORD=ПАРОЛЬ-ЮЗЕРА
SQL_HOST=db
SQL_PORT=5432
DJANGO_ALLOWED_HOSTS=localhost 127.0.0.1 [::1]
DATABASE=postgres
```

## Создание образа и развертывание приложения

1. Создайте образ приложения

```bash
docker-compose build
```

2. Запустите контейнеры в фоновом режиме

```bash
docker-compose up -d
```

3. Произведите создание миграций

```bash
docker-compose exec goo_pars_backend python manage.py makemigrations
```

4. Запустите мигарции данных

```bash
docker-compose exec goo_pars_backend python manage.py migrate
```

5. Создайте админа (суперпользователя) для доступа к админ-панели <http://localhost:8000/admin>

```bash
docker-compose exec goo_pars_backend python manage.py createsuperuser
```

## Настройка приложения завершена

Для работы открыть в браузере <http://localhost:3000>
