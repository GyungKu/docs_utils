export async function convertFilesToServer(
  files: File[],
  inputExt: string,
  outputExt: string
) {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append("files", file);
  });

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/documents/convert/${inputExt}/${outputExt}`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error("변환 요청에 실패했습니다.");
  }

  return await response.json();
}
