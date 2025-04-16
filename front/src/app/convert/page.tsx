"use client";

export const dynamic = "force-dynamic";

import { FileUpload } from "@/src/component/FileUpload";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { useConvertedFileStore } from "@/src/stores/convertedFiles";
import toast from "react-hot-toast";
import { convertFilesToServer } from "@/src/utils/convertFiles";

const allowedExts = ["pdf", "docx", "pptx", "xlsx"];

function ConvertPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const inputExt = searchParams.get("input_ext")!;
  const outputExt = searchParams.get("output_ext")!;
  const [files, setFiles] = useState<File[]>([]);
  const setConvertedFiles = useConvertedFileStore((state) => state.setFiles);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (
      inputExt == outputExt ||
      !inputExt ||
      !outputExt ||
      !allowedExts.includes(inputExt) ||
      !allowedExts.includes(outputExt)
    ) {
      router.replace("/");
    }
    setFiles([]);
  }, [inputExt, outputExt, router]);

  const handleConvert = async () => {
    if (files.length === 0) {
      toast.error("업로드된 파일이 없습니다.");
      return;
    }

    setIsLoading(true);
    toast.loading("변환 중입니다...");

    try {
      const result = await convertFilesToServer(files, inputExt, outputExt);
      setConvertedFiles(result.documents);
      toast.dismiss();
      router.push("/download");
    } catch {
      toast.dismiss();
      toast.error("변환 중 오류가 발생했습니다.");
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center">
        <span className="text-xl font-bold">{`${inputExt?.toUpperCase()} ➡️ ${outputExt?.toUpperCase()}`}</span>
      </div>
      <FileUpload inputExt={inputExt!} files={files} setFiles={setFiles} />
      <div className="flex flex-col items-center justify-center">
        <button
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          onClick={handleConvert}
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="animate-spin inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full"></span>
          ) : (
            "변환하기"
          )}
        </button>
      </div>
    </div>
  );
}

export default function ConvertPage() {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <ConvertPageContent />
    </Suspense>
  );
}
