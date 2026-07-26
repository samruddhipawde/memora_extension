import api from "./api";

export const askAI = async (question) => {
  const { data } = await api.post("/chat", {
    question: question,
  });

  return data;
};

export const sendMessage = askAI;