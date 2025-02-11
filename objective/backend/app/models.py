from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func
from app.database import Base

class File(Base):
    __tablename__ = "files"

    id = Column(Integer, primary_key=True, index=True)
    filename = Column(String, index=True)
    file_path = Column(String, unique=False, index=True)
    revision = Column(Integer, default=0)
    uploaded_at = Column(DateTime, server_default=func.now())
    user_id = Column(Integer)
