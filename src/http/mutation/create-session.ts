import axios from "axios";

type CreateSessionProps = {
  name: string;
};

export const createSession = async ({ name }: CreateSessionProps) => {
  await axios.post("http://localhost:3000/session", { name:name });
};
