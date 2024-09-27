import os
from config.settings import Config as WSConfig
from werkzeug.utils import secure_filename

import boto3
from botocore.client import Config


UPLOAD_FOLDER = WSConfig.UPLOAD_FOLDER

REGION = WSConfig.REGION
ENDPOINT = WSConfig.ENDPOINT
ACCESS_KEY = WSConfig.ACCESS_KEY
SECRET_KEY = WSConfig.SECRET_KEY
BUCKET_NAME = WSConfig.BUCKET_NAME

ONLINE_STORAGE = WSConfig.ONLINE_STORAGE


class ImageStorage:
    __session = None
    __client = None
    def __init__(self):
        if ONLINE_STORAGE == 'yes':    
            # Initialize a session using DigitalOcean Spaces.
            self.__session = boto3.session.Session()
            self.__client = self.__session.client('s3',
                region_name= REGION, # 'nyc3',
                endpoint_url= ENDPOINT, # 'https://nyc3.digitaloceanspaces.com',
                aws_access_key_id= ACCESS_KEY, # '532SZONTQ6ALKBCU94OU',
                aws_secret_access_key= SECRET_KEY # 'zCkY83KVDXD8u83RouEYPKEm/dhPSPB45XsfnWj8fxQ'
            )
        else:
            if not os.path.exists(UPLOAD_FOLDER):
                os.makedirs(UPLOAD_FOLDER)
    
    def new_file_cdn(self, file_obj, image_type, file_name):
        self.__client.upload_fileobj(file_obj,
            BUCKET_NAME,
            file_name,
            ExtraArgs={
                'ACL': 'public-read',
                'ContentType': image_type,
                'ContentDisposition': 'inline'
            }
        )
    
    def allowed_file(self, filename):
        return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in WSConfig.ALLOWED_EXTENSIONS

    def upload_file(self, file, f_filename):
        if file.filename == '':
            return None    
        else:
            if file:
                if ONLINE_STORAGE == 'yes':
                    stream = file.stream
                    headers = list(file.headers)
                    image_type = list(next((item for item in headers if item[0] == 'Content-Type'), None))[1]
                    try:
                        self.new_file_cdn(stream, image_type, f_filename)
                        return f_filename
                    except Exception as e:
                        print(e)
                        return None
                else:
                    filename = secure_filename(f_filename)
                    file.save(os.path.join(UPLOAD_FOLDER, filename))
                    return filename
            return None

    def rename_file(self, filename, new_filename):
        os.rename(os.path.join(UPLOAD_FOLDER, filename), os.path.join(UPLOAD_FOLDER, new_filename))
    