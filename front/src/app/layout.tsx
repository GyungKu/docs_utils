import { Toaster } from "react-hot-toast";
import Header from "@/src/component/Header";
import "@/src/styles/globals.css";

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
