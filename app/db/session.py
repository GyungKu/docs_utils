from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from app.core.config import settings

DATABASE_URL = settings.DATABASE_URL

engine = create_async_engine(DATABASE_URL, echo=True, future=True)

SessionLocal = sessionmaker(bind=engine, expire_on_commit=False, class_=AsyncSession)

def get_db():
  db = SessionLocal()
  try:
    yield db
  finally:
    db.close()