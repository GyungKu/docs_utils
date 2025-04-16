import os
import time

from apscheduler.schedulers.background import BackgroundScheduler

from app.core.config import settings

PATH = os.path.abspath(settings.FILE_STORAGE_PATH)

def delete_old_files(threshold_minutes: int = 30):
  now = time.time()
  for filename in os.listdir(PATH):
    file_path = os.path.join(PATH, filename)
    if os.path.isfile(file_path):
      created_time = os.path.getctime(file_path)
      if now - created_time > threshold_minutes * 60:
        try:
          os.remove(file_path)
        except Exception as e:
          print(f"[오류] {file_path} 삭제 실패: {e}")

def start_scheduler():
  scheduler = BackgroundScheduler()
  scheduler.add_job(delete_old_files, 'interval', minutes=60)
  scheduler.start()