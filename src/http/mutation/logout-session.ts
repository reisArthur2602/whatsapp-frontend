import axiosClient from "@/lib/axios";

type LogoutSessionProps = {
  sessionId: string;
};

export const logoutSession = async ({ sessionId }: LogoutSessionProps) => {
  await axiosClient.patch(`/session/${sessionId}/logout`);
};
