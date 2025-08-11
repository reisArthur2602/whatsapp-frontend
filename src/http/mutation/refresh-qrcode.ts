import axios from "axios";

type RefreshQrCodeProps = {
  sessionId: string;
};

export const refreshQrCode = async ({ sessionId }: RefreshQrCodeProps) => {
  await axios.post("http://localhost:3000/session/refresh-qrcode", {
    sessionId,
  });
};
