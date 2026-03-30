import { saveAs } from 'file-saver';
import { fullUrlServer } from './base_url';

export const handleDownloadFile = (file: string | undefined | null) => {
  const fileURL = `${fullUrlServer}/${file}`;
  
  fetch(fileURL, {
    method: 'GET',
    credentials: 'include', // penting untuk kirim cookie/session
  })
  .then(response => {
    if (!response.ok) {
      throw new Error("Failed to download file");
    }
    return response.blob();
  })
  .then(blob => {
    const fileName = file?.substring(file.indexOf("-", file.indexOf("-") + 1) + 1);
    saveAs(blob, fileName);
  })
  .catch(error => {
    alert(error?.message || "Failed to download file.");
  });
};
