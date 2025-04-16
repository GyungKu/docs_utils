"use client";

import { useConvertedFileStore } from "@/src/stores/convertedFiles";
// import { Button } from "@/components/ui/button"; // shadcn 사용하게 되면
import { saveAs } from "file-saver";
import toast from "react-hot-toast";

export default function DownloadPage() {
  const { files } = useConvertedFileStore();

  const handleDownload = async (id: number, filename: string) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/documents/downloads/${id}`
      );
      if (!res.ok) throw new Error("다운로드 실패");

      const blob = await res.blob();
      saveAs(blob, filename);
      toast.success(`'${filename}' 다운로드 완료`);
    } catch {
      toast.error("다운로드 중 오류가 발생했습니다.");
    }
  };

  if (files.length === 0) {
    return (
      <p className="text-center text-gray-500">다운로드할 파일이 없습니다.</p>
    );
  }

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">파일 목록</h1>
      {files.map((file) => (
        <div
          key={file.id}
          className="flex items-center justify-between border p-2 rounded mb-2"
        >
          <span>{file.output_filename}</span>
          {file.is_success ? (
            <button
              className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 cursor-pointer"
              onClick={() => handleDownload(file.id, file.output_filename)}
            >
              다운로드
            </button>
          ) : (
            <span className="text-red-500">변환 실패</span>
          )}
        </div>
      ))}
    </div>
  );
}
