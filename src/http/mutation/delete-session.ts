import axios from "axios";

type DeleteSessionProps = {
  sessionId: string;
};

export const deleteSession = async ({ sessionId }: DeleteSessionProps) => {
  await axios.delete(`http://localhost:3000/session/${sessionId}`);
};
