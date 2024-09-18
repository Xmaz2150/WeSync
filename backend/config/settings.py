from os import getenv

class Config:
    """ Platform settings """

    ''' Database Initialization '''
    WSYNC_PGSQL_USER = getenv('WSYNC_PGSQL_USER', 'postgres')
    WSYNC_PGSQL_PWD = getenv('WSYNC_PGSQL_PWD', 'root')
    WSYNC_PGSQL_HOST_PORT = getenv('WSYNC_PGSQL_HOST_PORT', '5432')
    WSYNC_PGSQL_HOST = getenv('WSYNC_PGSQL_HOST', 'localhost:{}'.format(WSYNC_PGSQL_HOST_PORT))
    WSYNC_PGSQL_DB = getenv('WSYNC_PGSQL_DB', 'wesync')
    POSTGRESQL_DATABASE_URI = getenv(
        'DATABASE_URL') or 'postgresql+psycopg2://{}:{}@{}/{}'.format(
            WSYNC_PGSQL_USER, WSYNC_PGSQL_PWD, WSYNC_PGSQL_HOST, WSYNC_PGSQL_DB
    )

    ''' Administrative Options'''
    WSYNC_ENV = getenv('WSYNC_ENV')
    IS_SU = getenv('IS_SU')
    SECRET_KEY = getenv('SECRET_KEY')
    JWT_SECRET_KEY = getenv('JWT_SECRET_KEY')

    ''' Image Options '''
    UPLOAD_FOLDER = getenv('UPLOAD_PATH', 'static/uploads/images')
    IMG_URL_PREFIX = getenv('IMG_URL_PREFIX', '/wesync/img/')
    ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}
