from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from app.core.exceptions.global_exception import GlobalException

def register_exception_handlers(app: FastAPI):
  @app.exception_handler(GlobalException)
  async def global_error_handler(request: Request, exc: GlobalException):
    e = exc.error_code
    return JSONResponse(
        status_code= e.status(),
        content={"message": e.message(), "code": e.code()}
    )
