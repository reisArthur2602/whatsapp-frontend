type CreateSessionProps = {
  name: string;
};

export const createSession = async ({ name }: CreateSessionProps) => {
  try {
    const response = await fetch("http://localhost:3000/session", {
      method: "POST",
      body: JSON.stringify({ name }),
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
    console.log("Erro ao criar sessão", error);
    return {
      success: false,
      data: null,
    };
  }
};
