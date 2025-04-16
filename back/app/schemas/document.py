from pydantic import BaseModel, ConfigDict

class DocumentCreate(BaseModel):
  output_filename: str
  convert_filename: str
  is_success: bool

class DocumentRead(BaseModel):
  id: int
  output_filename: str
  convert_filename: str
  is_success: bool

  model_config = ConfigDict(from_attributes=True)