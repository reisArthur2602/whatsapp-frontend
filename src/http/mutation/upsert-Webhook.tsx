import axiosClient from "@/lib/axios";

type UpsertWebhookProps = {
  sessionId: string;
  webhookUrl: string;
};

export const upsertWebhook = async ({
  sessionId,
  webhookUrl,
}: UpsertWebhookProps) => {
  await axiosClient.patch(
    "/webhook",
    { webhookUrl }, 
    {
      headers: {
        Authorization: sessionId, 
      },
    }
  );
};
