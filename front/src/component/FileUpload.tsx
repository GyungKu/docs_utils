"use client";

import React, { DragEvent, ChangeEvent } from "react";
import toast from "react-hot-toast";

export function FileUpload({
  inputExt,
  files,
  setFiles,
}: {
  inputExt: string;
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
}) {
  const handleFiles = (selectedFiles: FileList | null) => {
    if (!selectedFiles) return;

    const validFiles: File[] = [];

    Array.from(selectedFiles).forEach((file) => {
      const ext = file.name.split(".").pop()?.toLowerCase();
      if (ext !== inputExt) {
        toast.error(
          `'${file.name}' 업로드 실패: ${inputExt} 파일만 업로드 가능합니다.`
        );
      } else {
        validFiles.push(file);
      }
    });

    setFiles((prev) => [...prev, ...validFiles]);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
  };

  return (
    <div
      className="border-2 border-dashed border-gray-400 rounded-lg p-4 text-center cursor-pointer"
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      <p className="mb-2 text-gray-500">
        여기로 파일을 드래그하거나 클릭해서 업로드하세요
      </p>
      <input
        type="file"
        multiple
        accept={`.${inputExt}`}
        onChange={handleInputChange}
        className="hidden"
        id="fileInput"
      />
      <label
        htmlFor="fileInput"
        className="cursor-pointer text-blue-600 underline"
      >
        파일 선택하기
      </label>

      {files.length > 0 && (
        <ul className="mt-3 text-green-600 text-sm text-left list-disc pl-5">
          {files.map((file, idx) => (
            <li key={idx} className="flex items-center justify-between pr-2">
              <span>{file.name}</span>
              <button
                onClick={() =>
                  setFiles((prev) => prev.filter((_, i) => i !== idx))
                }
                className="text-red-500 hover:text-red-700 text-sm ml-2 cursor-pointer"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
