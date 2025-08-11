import axiosClient from "@/lib/axios";

type RefreshQrCodeProps = {
  sessionId: string;
};

export const refreshQrCode = async ({ sessionId }: RefreshQrCodeProps) => {
  await axiosClient.post("/session/refresh-qrcode", {
    sessionId,
  });
};
