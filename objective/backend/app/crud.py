from sqlalchemy.orm import Session
import os
from app import models

UPLOAD_DIR = "uploaded_files"

def create_file(db: Session, filename: str, path: str, user_id: int):
    base_name, extension = os.path.splitext(filename)

    max_revision = db.query(models.File).filter(
        models.File.filename.like(f"{base_name}%"),
        models.File.user_id == user_id
    ).order_by(models.File.revision.desc()).first()

    if max_revision is None:
        revision = 1
    else:
        revision = max_revision.revision + 1

    while True:
        new_filename = f"{base_name}_v{revision}{extension}"
        new_file_path = os.path.join(UPLOAD_DIR, new_filename)
        
        existing_file = db.query(models.File).filter(
            models.File.file_path == new_file_path
        ).first()

        if existing_file is None:
            break

        revision += 1

    db_file = models.File(filename=new_filename, file_path=new_file_path, user_id=user_id, revision=revision)
    
    db.add(db_file)
    db.commit()
    db.refresh(db_file)

    return db_file
