import axios from "axios";

type Session = {
  id: string;
  name: string;
  connected: boolean;
  webhookUrl: string | null;
};

export const getSessions = async () => {
  const sessions = (
    await axios.get<Session[] | []>("http://localhost:3000/sessions")
  ).data;
  return sessions;
};
