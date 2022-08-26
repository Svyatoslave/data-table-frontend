const createBlobFromBuffer = (buffer: ArrayBuffer, type: string): Blob =>
  new Blob([buffer], {
    type,
  });

export const createDocxBlobFromBuffer = (buffer: ArrayBuffer): Blob =>
  createBlobFromBuffer(
    buffer,
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  );

export const createPdfBlobFromBuffer = (buffer: ArrayBuffer): Blob =>
  createBlobFromBuffer(buffer, "application/pdf");
