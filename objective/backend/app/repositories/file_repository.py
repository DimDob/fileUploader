import os
import shutil

UPLOAD_DIR = "uploads"

class FileRepository:
    @staticmethod
    async def save_file(user: str, path: str, file):
        user_dir = os.path.join(UPLOAD_DIR, user)
        os.makedirs(user_dir, exist_ok=True)
        
        file_path = os.path.join(user_dir, path)
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        
        return {"message": "File uploaded", "path": file_path}

    @staticmethod
    async def get_file(user: str, path: str, revision: int):
        user_dir = os.path.join(UPLOAD_DIR, user)
        file_path = os.path.join(user_dir, path)
        
        if not os.path.exists(file_path):
            return {"error": "File not found"}
        
        return {"file_path": file_path, "message": "File retrieved"}
