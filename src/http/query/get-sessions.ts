import axiosClient from "@/lib/axios";

type Session = {
  id: string;
  name: string;
  connected: boolean;
  webhookUrl: string | null;
};

export const getSessions = async () => {
  const sessions = (await axiosClient.get<Session[] | []>("/all")).data;
  return sessions;
};
