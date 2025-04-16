from fastapi import APIRouter, File, UploadFile, Depends
from app.core.config import settings
from starlette.responses import FileResponse, JSONResponse
from app.services import converter
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.session import get_db

router = APIRouter(prefix="/api/v1/documents")

@router.post("/convert/{input_ext}/{output_ext}")
async def convert_documents(input_ext: str, output_ext: str, 
                            files: list[UploadFile] = File(...), db: AsyncSession = Depends(get_db)):
  documents = []
  for file in files:
    doc = await converter.convert_document(input_ext=input_ext, output_ext=output_ext, 
                                           file=file, db=db)
    
    documents.append(doc.model_dump())

  return JSONResponse(status_code=200, content={"documents": documents})

@router.get("/downloads/{convert_filename}")
async def download_document(convert_filename: str, db: AsyncSession = Depends(get_db)):
  output_filename, convert_filepath = await converter.docs_download(convert_filename=convert_filename, db=db)

  return FileResponse(status_code=200, filename=output_filename, path=convert_filepath)