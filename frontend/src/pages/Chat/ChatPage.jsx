import "./ChatPage.css";

import { useState } from "react";

import ChatSidebar from "../../components/chat/ChatSidebar";
import ChatWindow from "../../components/chat/ChatWindow";
import ChatInput from "../../components/chat/ChatInput";

import { askAI } from "../../services/chatService";

const ChatPage = () => {

  const [messages, setMessages] = useState([
    {
      sender: "assistant",
      text: "Hii👋 I'm Memora AI. Ask me anything about your saved memories."
    }
  ]);

  const [loading, setLoading] = useState(false);

  const handleSend = async (question) => {

    if (!question.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text: question,
      },
    ]);

    setLoading(true);

    try {

      const data = await askAI(question);

      const reply =
        data?.answer ||
        data?.response ||
        data?.message ||
        data?.reply ||
        data?.result ||
        "No response received.";

      setMessages((prev) => [
        ...prev,
        {
          sender: "assistant",
          text: reply,
        },
      ]);

    } catch (error) {

      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          sender: "assistant",
          text:
            error?.response?.status === 500
              ? "⚠️ AI Server Error."
              : "⚠️ Unable to contact AI.",
        },
      ]);

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="chat-page">

      <ChatSidebar />

      <div className="chat-main">

        <ChatWindow
          messages={messages}
          loading={loading}
        />

        <ChatInput
          onSend={handleSend}
        />

      </div>

    </div>

  );

};

export default ChatPage;