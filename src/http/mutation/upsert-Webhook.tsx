import axiosClient from "@/lib/axios";

type UpsertWebhookProps = {
  sessionId: string;
  webhookUrl: string;
};

export const upsertWebhook = async ({
  sessionId,
  webhookUrl,
}: UpsertWebhookProps) => {
  await axiosClient.post("/set-webhook", {
    sessionId,
    webhookUrl,
  });
};
