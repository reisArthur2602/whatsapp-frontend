type GenerateQrCodeProps = {
  sessionId: string;
};

type QrCodeResponse = {
  qr: string;
};

export const generateQrCode = async ({
  sessionId,
}: GenerateQrCodeProps): Promise<QrCodeResponse> => {
  const response = await fetch(`http://localhost:3000/qr/${sessionId}`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const qrCode = await response.json();
  console.log(qrCode)

  return qrCode;
};
