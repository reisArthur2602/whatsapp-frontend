import axiosClient from "@/lib/axios";

type CreateSessionProps = {
  name: string;
};

export const createSession = async ({ name }: CreateSessionProps) => {
  await axiosClient.post("/", { name });
};
