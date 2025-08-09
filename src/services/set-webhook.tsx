type SetWebhookProps = {
  sessionId: string;
  webhookUrl: string;
};

export const setWebhook = async ({
  sessionId,
  webhookUrl,
}: SetWebhookProps) => {
  try {
    const response = await fetch("http://localhost:3000/set-webhook", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sessionId, webhookUrl }),
    });

    if (!response.ok) {
      throw new Error("Erro ao definir webhook");
    }

    return { success: true };
  } catch (error) {
    console.error("Erro em setWebhook:", error);
    return { success: false };
  }
};
