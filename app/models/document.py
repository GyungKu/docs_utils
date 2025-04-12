from sqlalchemy import Column, String, Integer, Boolean

from app.db.base import Base


class Document(Base):
  __tablename__ = "documents"

  id = Column(Integer, primary_key=True, index=True)
  output_filename = Column(String(255), nullable=False)
  convert_filename = Column(String(255), nullable=False)
  is_zip = Column(Boolean, nullable=False)
  is_success = Column(Boolean, nullable=False)