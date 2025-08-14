import axiosClient from "@/lib/axios";

type DeleteSessionProps = {
  sessionId: string;
};

export const deleteSession = async ({ sessionId }: DeleteSessionProps) => {
  await axiosClient.delete(`/`, {
    headers: {
      Authorization: sessionId,
    },
  });
};
