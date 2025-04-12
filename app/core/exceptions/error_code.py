from enum import Enum

class ErrorCode(Enum):
  NOT_FOUND_DOCUMENTS = ("F001", "존재하지 않는 문서입니다.", 400)
  CONVERSION_FAILED_DOCUMENTS = ("F002", "문서 변환에 실패한 파일입니다.", 400)

  def code(self):
    return self.value[0]

  def message(self):
    return self.value[1]

  def status(self):
    return self.value[2]