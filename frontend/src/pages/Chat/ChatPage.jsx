import "./ChatPage.css";

import { useEffect, useState } from "react";

import ChatSidebar from "../../components/chat/ChatSidebar";
import ChatWindow from "../../components/chat/ChatWindow";
import ChatInput from "../../components/chat/ChatInput";

import { askAI } from "../../services/chatService";

const DEFAULT_MESSAGE = [
  {
    sender: "assistant",
    text: "Hi 👋 I'm Memora AI. Ask me anything about your saved memories.",
  },
];

const ChatPage = () => {

  const [messages, setMessages] = useState(DEFAULT_MESSAGE);

  const [loading, setLoading] = useState(false);

  const [conversations, setConversations] = useState([]);

  const [currentChatId, setCurrentChatId] = useState(Date.now());

  useEffect(() => {

    const chats = JSON.parse(
      localStorage.getItem("memora_conversations")
    );

    if (chats && chats.length > 0) {

      setConversations(chats);

      setCurrentChatId(chats[0].id);

      setMessages(chats[0].messages);

    }

  }, []);

  useEffect(() => {

    localStorage.setItem(
      "memora_conversations",
      JSON.stringify(conversations)
    );

  }, [conversations]);

  const saveConversation = (chatMessages, title) => {

    setConversations((prev) => {

      const existing = prev.find(
        (c) => c.id === currentChatId
      );

      if (existing) {

        return prev.map((chat) =>
          chat.id === currentChatId
            ? {
                ...chat,
                title,
                messages: chatMessages,
              }
            : chat
        );

      }

      return [
        {
          id: currentChatId,
          title,
          messages: chatMessages,
        },
        ...prev,
      ];

    });

  };

  const handleSend = async (question) => {

    if (!question.trim()) return;

    const userMessages = [
      ...messages,
      {
        sender: "user",
        text: question,
      },
    ];

    setMessages(userMessages);

    saveConversation(
      userMessages,
      question.slice(0, 35)
    );

    setLoading(true);

    try {

      const data = await askAI(question);

      const reply =
        data?.answer ||
        data?.response ||
        data?.message ||
        "No response.";

      const finalMessages = [
        ...userMessages,
        {
          sender: "assistant",
          text: reply,
        },
      ];

      setMessages(finalMessages);

      saveConversation(
        finalMessages,
        question.slice(0, 35)
      );

    }

    catch (error) {

      const finalMessages = [
        ...userMessages,
        {
          sender: "assistant",
          text:
            error.message ||
            "Unable to contact AI.",
        },
      ];

      setMessages(finalMessages);

      saveConversation(
        finalMessages,
        question.slice(0, 35)
      );

    }

    finally {

      setLoading(false);

    }

  };

  const handleNewChat = () => {

    const id = Date.now();

    setCurrentChatId(id);

    setMessages(DEFAULT_MESSAGE);

  };

  const handleClearHistory = () => {

    localStorage.removeItem("memora_conversations");

    setConversations([]);

    setCurrentChatId(Date.now());

    setMessages(DEFAULT_MESSAGE);

  };

  const handleSelectConversation = (id) => {

    const chat = conversations.find(
      (c) => c.id === id
    );

    if (!chat) return;

    setCurrentChatId(id);

    setMessages(chat.messages);

  };

  return (

    <div className="chat-page">

      <ChatSidebar
        conversations={conversations}
        onNewChat={handleNewChat}
        onClearHistory={handleClearHistory}
        onSelectConversation={handleSelectConversation}
      />

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