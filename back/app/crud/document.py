from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.models.document import Document
from app.schemas.document import DocumentCreate, DocumentRead


async def create_document(db: AsyncSession, create: DocumentCreate) -> DocumentRead:
  document = Document(**create.model_dump())
  db.add(document)
  await db.commit()
  await db.refresh(document)
  await db.close()
  return DocumentRead.model_validate(document)

async def get_document(db: AsyncSession, convert_filename: str) -> DocumentRead | None:
  result = await db.execute(select(Document).where(Document.convert_filename == convert_filename))
  doc = result.scalar_one_or_none()
  if not doc:
    return None
  return DocumentRead.model_validate(doc)