export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center space-y-12 mt-[-200px]">
      <div>
        <h2 className="text-2xl font-bold">유의사항</h2>
        <ul className="list-disc mt-4 text-gray-700 text-left max-w-md mx-auto">
          <li>PDF로 변환하는 것은 성능이 준수합니다.(XLSX ➡️ PDF 제외)</li>
          <li>
            PDF를 변환하는 것은 이미지로 만들어 변환하기 때문에 편집이
            불가능합니다.
          </li>
        </ul>
      </div>

      <div>
        <h2 className="text-2xl font-bold">파일 정책</h2>
        <ul className="list-disc mt-4 text-gray-700 text-left max-w-md mx-auto">
          <li>PDF ⇄ DOCX, PPTX, XLSX 변환만 지원합니다.</li>
          <li>
            ⏰ 1시간 마다 주기적으로 생성 시간이 30분 이상 지난 파일을
            삭제합니다.
          </li>
        </ul>
      </div>
    </div>
  );
}
