import axiosClient from "@/lib/axios";

type LogoutSessionProps = {
  sessionId: string;
};

export const logoutSession = async ({ sessionId }: LogoutSessionProps) => {
  await axiosClient.patch(
    "/disconnect",

    {},

    {
      headers: {
        Authorization: sessionId,
      },
    }
  );
};
