from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse, FileResponse
from sqlalchemy.orm import Session
from app.database import SessionLocal, engine, Base
from app import models, crud
import shutil
import os
from contextlib import asynccontextmanager
from fastapi import FastAPI, UploadFile, File
from app.cors_config import get_cors_middleware

@asynccontextmanager
async def lifespan(app: FastAPI):
    Base.metadata.create_all(bind=engine)
    yield  

app = FastAPI(lifespan=lifespan)

get_cors_middleware(app)

UPLOAD_DIR = "uploaded_files"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@app.post("/upload/")
async def upload_file(file: UploadFile = File(...), user_id: int = 1):
    file_name = file.filename
    base_name, extension = os.path.splitext(file_name)
    
    os.makedirs(UPLOAD_DIR, exist_ok=True)

    db: Session = SessionLocal()
    try:
        created_file = crud.create_file(db=db, filename=file_name, path=None, user_id=user_id)
        versioned_filename = created_file.filename
        file_path = os.path.join(UPLOAD_DIR, versioned_filename)

        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        return JSONResponse(
            content={
                "message": "File uploaded successfully with a new revision",
                "filename": created_file.filename,
                "file_path": created_file.file_path,
                "revision": created_file.revision
            },
            status_code=200
        )
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        db.close()

@app.get("/files/{filename}/")
async def get_file(filename: str, user_id: int, revision: int = None):
    db: Session = SessionLocal()

    try:
        if revision is not None:
            file = db.query(models.File).filter(
                models.File.filename == filename,
                models.File.user_id == user_id,
                models.File.revision == revision
            ).first()
        else:
            file = db.query(models.File).filter(
                models.File.filename == filename,
                models.File.user_id == user_id
            ).order_by(models.File.revision.desc()).first()

        if not file:
            raise HTTPException(status_code=404, detail="File not found")

        return {
            "message": "File details retrieved successfully",
            "filename": file.filename,
            "file_path": file.file_path,
            "revision": file.revision,
            "uploaded_at": file.uploaded_at
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        db.close()

@app.get("/files/{filename}/download/")
async def download_file(filename: str, user_id: int, revision: int = None):
    db: Session = SessionLocal()

    try:
        if revision is not None:
            file = db.query(models.File).filter(
                models.File.filename == filename,
                models.File.user_id == user_id,
                models.File.revision == revision
            ).first()
        else:
            file = db.query(models.File).filter(
                models.File.filename == filename,
                models.File.user_id == user_id
            ).order_by(models.File.revision.desc()).first()

        if not file:
            raise HTTPException(status_code=404, detail="File not found")

        file_path = file.file_path

        print(f"Attempting to access file at: {file_path}")

        if not os.path.exists(file_path):
            raise HTTPException(status_code=404, detail="File not found on the server")

        return FileResponse(file_path, media_type="application/pdf", headers={"Content-Disposition": f"attachment; filename={filename}"})

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        db.close()

@app.get("/")
def read_root():
    return {"message": "Welcome to the File versioning app!"}
