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
      text: "Hi 👋 I'm Memora AI. Ask me anything about your saved memories."
    }
  ]);

  const [loading, setLoading] = useState(false);

  const handleSend = async (question) => {

    const userMessage = {
      sender: "user",
      text: question,
    };

    setMessages((prev) => [...prev, userMessage]);

    setLoading(true);

    try {

      const response = await askAI(question);

      setMessages((prev) => [
        ...prev,
        {
          sender: "assistant",
          text: response.answer,
        },
      ]);

    } catch (err) {

      console.log(err);

      setMessages((prev) => [
        ...prev,
        {
          sender: "assistant",
          text: "Sorry, something went wrong.",
        },
      ]);

    }

    setLoading(false);
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