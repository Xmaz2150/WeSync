from os import getenv

class Config:
    SEASE_PGSQL_USER = 'postgres' # getenv('SEASE_PGSQL_USER')
    SEASE_PGSQL_PWD = 'root' # getenv('SEASE_PGSQL_PWD') 
    SEASE_PGSQL_HOST = 'localhost' # getenv('SEASE_PGSQL_HOST')
    SEASE_PGSQL_DB = 'shopease' # getenv('SEASE_PGSQL_DB')
    SEASE_ENV = getenv('SEASE_ENV')
    POSTGRESQL_DATABASE_URI = getenv(
        'DATABASE_URL') or 'postgresql+psycopg2://{}:{}@{}/{}'.format(
            SEASE_PGSQL_USER, SEASE_PGSQL_PWD, SEASE_PGSQL_HOST, SEASE_PGSQL_DB
    )
    SECRET_KEY = getenv('SECRET_KEY', 'supersecretkey')
    JWT_SECRET_KEY = getenv('JWT_SECRET_KEY', 'supersecretjwtkey')

    UPLOAD_FOLDER = getenv('UPLOAD_PATH') or 'static/uploads/images'
    IMG_URL_PREFIX = 'http://localhost:5000/SE/img/'
    ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}
