import axiosClient from "@/lib/axios";

type UpsertWebhookProps = {
  sessionId: string;
  onReceive_webhookUrl?: string;
  onSend_webhookUrl?: string;
  onUpdateStatus_webhookUrl?: string;
  onChangeSession_webhookUrl?: string;
};

export const upsertWebhook = async ({
  sessionId,
  onReceive_webhookUrl,
  onSend_webhookUrl,
  onUpdateStatus_webhookUrl,
  onChangeSession_webhookUrl,
}: UpsertWebhookProps) => {
  await axiosClient.patch(
    "/webhook",
    {
      onReceive_webhookUrl,
      onSend_webhookUrl,
      onUpdateStatus_webhookUrl,
      onChangeSession_webhookUrl,
    },
    {
      headers: {
        Authorization: sessionId,
      },
    }
  );
};
