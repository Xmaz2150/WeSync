from os import getenv
"""
    CONFIGURATION of the APPLICATION
    IMPORTANT ENV VARS Docs comming sooon!!
"""


class Config:
    """ Platform settings """

    """ Database Initialization """
    WSYNC_PGSQL_USER = getenv('WSYNC_PGSQL_USER')
    WSYNC_PGSQL_PWD = getenv('WSYNC_PGSQL_PWD')
    WSYNC_PGSQL_HOST_PORT = getenv('WSYNC_PGSQL_HOST_PORT', '5432')
    WSYNC_PGSQL_HOST = getenv('WSYNC_PGSQL_HOST', 'localhost')
    WSYNC_PGSQL_DB = getenv('WSYNC_PGSQL_DB', 'wesync')
    WSYNC_PGSQL_C_HOST = '{}:{}'.format(WSYNC_PGSQL_HOST, WSYNC_PGSQL_HOST_PORT)
    POSTGRESQL_DATABASE_URI = getenv(
        'DATABASE_URL') or 'postgresql+psycopg2://{}:{}@{}/{}'.format(
            WSYNC_PGSQL_USER,
            WSYNC_PGSQL_PWD,
            WSYNC_PGSQL_C_HOST,
            WSYNC_PGSQL_DB
    )

    """ Administrative Options """
    WSYNC_ENV = getenv('WSYNC_ENV')
    IS_SU = getenv('IS_SU')
    SECRET_KEY = getenv('SECRET_KEY')
    JWT_SECRET_KEY = getenv('JWT_SECRET_KEY')
    JWT_ACCESS_TOKEN_EXPIRES = getenv('JWT_ACCESS_TOKEN_EXPIRES', 86400)

    """ Image Options """
    ''' Local '''
    UPLOAD_FOLDER = getenv('UPLOAD_PATH', 'static/uploads/images')
    IMG_URL_PREFIX = getenv('IMG_URL_PREFIX', '/wesync/img/')
    ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'webp'}

    ''' DigitalOcean Spaces '''
    ONLINE_STORAGE = getenv('ONLINE_STORAGE') # Decides whether to use local or online storage

    REGION = getenv('DO_REGION')
    ENDPOINT = getenv('DO_ENDPOINT')
    ACCESS_KEY = getenv('DO_ACCESS_KEY')
    SECRET_KEY = getenv('DO_SECRET_KEY')
    BUCKET_NAME = getenv('DO_BUCKET_NAME')
