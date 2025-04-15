import { Toaster } from "react-hot-toast";
import Header from "@/src/component/Header";
import "@/src/styles/globals.css";

export const metadata = {
  title: "문서 변환기",
  description: "간단한 문서 포맷 변환 서비스",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="bg-gray-50 text-gray-900">
        <Header />
        <main className="max-w-4xl mx-auto p-4">{children}</main>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
