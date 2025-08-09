type RefreshQrCodeProps = {
  sessionId: string;
};

export const refreshqrCode = async ({ sessionId }: RefreshQrCodeProps) => {
  try {
    const response = await fetch(`http://localhost:3000/session/refresh-qrcode`, {
      method: "POST",
      body: JSON.stringify({ sessionId }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return {
      success: true,
      data: null,
    };
  } catch (error) {
    console.log("Erro ao gerar novo qrCode", error);
    return {
      success: false,
      data: null,
    };
  }
};
