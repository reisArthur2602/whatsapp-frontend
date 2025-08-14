import axiosClient from "@/lib/axios";

type Session = {
  id: string;
  name: string;
  onReceive_webhookUrl: string | null;
  onSend_webhookUrl: string | null;
  onUpdateStatus_webhookUrl: string | null;
  connected: boolean;
  webhookUrl: string | null;
  created_at: string;
  updated_at: string;
};

export const getSessions = async () => {
  const sessions = (await axiosClient.get<Session[] | []>("/all")).data;
  return sessions;
};
