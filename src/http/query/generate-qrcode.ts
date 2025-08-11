import axiosClient from "@/lib/axios";

type GenerateQrCodeProps = {
  sessionId: string;
};

type QrCodeResponse = {
  qr: string;
};

export const generateQrCode = async ({ sessionId }: GenerateQrCodeProps) => {
  const qrCode = (await axiosClient<QrCodeResponse>(`/qr/${sessionId}`)).data;
  return qrCode;
};
