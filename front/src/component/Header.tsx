"use client";

import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";

const formats = ["docx", "pptx", "xlsx"];

export default function Header() {
  const [openMenu, setOpenMenu] = useState<"to" | "from" | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // 바깥 클릭하면 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header
      className="flex items-center justify-between px-8 py-4 border-b bg-white shadow-md"
      ref={menuRef}
    >
      <div
        onClick={() => router.push("/")}
        className="cursor-pointer text-lg font-semibold"
      >
        메인
      </div>

      <div className="flex items-center gap-8">
        <div className="relative">
          <button
            onClick={() => setOpenMenu(openMenu === "to" ? null : "to")}
            className="font-semibold text-lg cursor-pointer"
          >
            PDF로 변환
          </button>
          {openMenu === "to" && (
            <div className="absolute top-full mt-2 bg-white border shadow-lg rounded-md z-10 w-32">
              {formats.map((format) => (
                <div
                  key={format}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    router.push(`/convert?input_ext=${format}&output_ext=pdf`);
                    setOpenMenu(null);
                  }}
                >
                  {format.toUpperCase()}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="relative">
          <button
            onClick={() => setOpenMenu(openMenu === "from" ? null : "from")}
            className="font-semibold text-lg cursor-pointer"
          >
            PDF를 변환
          </button>
          {openMenu === "from" && (
            <div className="absolute top-full mt-2 bg-white border shadow-lg rounded-md z-10 w-32">
              {formats.map((format) => (
                <div
                  key={format}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    router.push(`/convert?input_ext=pdf&output_ext=${format}`);
                    setOpenMenu(null);
                  }}
                >
                  {format.toUpperCase()}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
