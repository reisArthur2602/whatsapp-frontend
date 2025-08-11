import axios from "axios";

type UpsertWebhookProps = {
  sessionId: string;
  webhookUrl: string;
};

export const upsertWebhook = async ({
  sessionId,
  webhookUrl,
}: UpsertWebhookProps) => {
  await axios.post("http://localhost:3000/set-webhook", {
    sessionId,
    webhookUrl,
  });
};
