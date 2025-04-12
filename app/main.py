from typing import Union
from fastapi import FastAPI
import pkgutil
import importlib

app = FastAPI()

def register_routers(app: FastAPI):
  import api  # 디렉토리 자체 import
  for _, module_name, _ in pkgutil.iter_modules(api.__path__):
    module = importlib.import_module(f"api.{module_name}")
    if hasattr(module, "router"):
      app.include_router(module.router)

register_routers(app)