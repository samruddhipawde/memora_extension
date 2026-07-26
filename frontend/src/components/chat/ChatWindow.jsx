import "./ChatWindow.css";

import { useEffect, useRef } from "react";

import ChatMessage from "./ChatMessage";
import TypingIndicator from "./TypingIndicator";

const ChatWindow = ({ messages = [], loading }) => {

  const bottomRef = useRef(null);

  useEffect(() => {

    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });

  }, [messages, loading]);

  return (

    <div className="chat-window">

      {messages.map((message, index) => (

        <ChatMessage
          key={message.id || index}
          message={message}
        />

      ))}

      {loading && <TypingIndicator />}

      <div ref={bottomRef}></div>

    </div>

  );

};

export default ChatWindow;