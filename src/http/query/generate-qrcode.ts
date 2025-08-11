import axios from "axios";

type GenerateQrCodeProps = {
  sessionId: string;
};

type QrCodeResponse = {
  qr: string;
};

export const generateQrCode = async ({ sessionId }: GenerateQrCodeProps) => {
  const qrCode = (await axios.get<QrCodeResponse>(`http://localhost:3000/qr/${sessionId}`)).data
  return qrCode;
};


