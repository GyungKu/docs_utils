from app.core.exceptions import ErrorCode

class GlobalException(Exception):
  def __init__(self, error_code: ErrorCode):
    self.error_code = error_code