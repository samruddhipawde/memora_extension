import api from "./api";

export const askAI = async (question) => {

  try {

    const response = await api.post("/chat", {
      question,
    });

    return response.data;

  } catch (error) {

    console.error("AI Chat Error:", error);

    if (error.response) {

      throw new Error(
        error.response.data.detail ||
        error.response.data.message ||
        "AI request failed."
      );

    }

    throw new Error("Unable to connect to AI server.");

  }

};

export const sendMessage = askAI;