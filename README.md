## 📄 Document Converter

문서를 업로드하면 지정한 형식으로 변환하고, 변환된 파일을 다운로드할 수 있는 API입니다.

---

### Link

https://docs-convert.kro.kr/
- 위 주소에서 사용해 보실 수 있습니다.
- 무료 호스팅을 이용 중이므로 속도가 느릴 수 있습니다.

---

### 🔄 변환 API

**`POST /api/v1/documents/convert/{input_ext}/{output_ext}`**

지정된 확장자(`input_ext`)에서 다른 확장자(`output_ext`)로 문서를 변환합니다.

---

#### ✅ 지원 형식

- PDF ↔️ DOCX
- PDF ↔️ PPTX
- PDF ↔️ XLSX

---

#### 📥 요청

- **경로 변수**

  - `input_ext`: 입력 파일 확장자 (`pdf`, `docx`, `pptx`, `xlsx`)
  - `output_ext`: 변환할 확장자 (`pdf`, `docx`, `pptx`, `xlsx`)

- **FormData**
  - `files`: 여러 개의 파일 업로드 가능

---

#### ❌ 실패하는 경우

1. `input_ext`와 실제 파일 확장자가 다른 경우
2. 서버에 파일 업로드가 실패한 경우
3. 변환에 실패한 경우
   - `1`, `2`번은 저장조차 안 됨
   - `3`번은 저장은 되지만 변환 실패

---

### ⬇️ 다운로드 API

**`GET /api/v1/documents/downloads/{id}`**

변환된 문서를 다운로드합니다.

---

#### ❌ 실패하는 경우

1. `id`에 해당하는 문서가 존재하지 않는 경우
2. 변환에 실패한 문서일 경우

---

### ⏰ 파일 보관 정책

- **30분 이상 지난 파일은 1시간 마다 주기적으로 삭제됩니다**

---

### API 명세서

---

#### 변환 요청

![Image](https://github.com/user-attachments/assets/79bd8c3a-2766-4a0a-aa5f-a513fcbd4bee)

---

#### 변환 응답

![Image](https://github.com/user-attachments/assets/c5b4a79e-ac68-4ea4-a6ab-eff04fb2b7dd)

---

#### 다운로드 요청

![Image](https://github.com/user-attachments/assets/1c0d0076-c6c7-4f8a-8fa3-7790ef0c3ed7)

---

#### 다운로드 응답

![Image](https://github.com/user-attachments/assets/23c3e8ff-4753-4383-b1f4-a667bb7de8d6)
