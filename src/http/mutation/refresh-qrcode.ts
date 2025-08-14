import axiosClient from "@/lib/axios";

type RefreshQrCodeProps = {
  sessionId: string;
};

export const refreshQrCode = async ({ sessionId }: RefreshQrCodeProps) => {
  await axiosClient.patch(
    "/qr/refresh",
    {},
    {
      headers: {
        Authorization: sessionId,
      },
    }
  );
};
