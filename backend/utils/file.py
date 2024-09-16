import os
from config.settings import Config
from werkzeug.utils import secure_filename


UPLOAD_FOLDER = Config.UPLOAD_FOLDER
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in Config.ALLOWED_EXTENSIONS

def upload_file(file):
    if file.filename == '':
        return None

    if file and allowed_file(file.filename):
        filename = '{}'.format(secure_filename(file.filename))
        file.save(os.path.join(UPLOAD_FOLDER, filename))
        return filename

def rename_file(filename, new_filename):
    os.rename(os.path.join(UPLOAD_FOLDER, filename), os.path.join(UPLOAD_FOLDER, new_filename))
    