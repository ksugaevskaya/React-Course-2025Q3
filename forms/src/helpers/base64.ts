export const fileToBase64 = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string); // e.g. "data:image/png;base64,AAAA..."
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
