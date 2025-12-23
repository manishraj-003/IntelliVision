import uuid

def save_temp_file(file):
    content = file.file.read()
    file.file.close()
    return content
