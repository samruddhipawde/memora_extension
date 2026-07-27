import "./ChatMessage.css";

import { User } from "lucide-react";

import assistant from "../../assets/ai/assistant.png";

const ChatMessage = ({ message }) => {

  const isUser = message.sender === "user";

  return (

    <div
      className={`chat-message ${isUser ? "user" : "assistant"}`}
    >

      <div className="message-avatar">

        {

          isUser ?

          <User size={18}/>

          :

          <img
            src={assistant}
            alt="Assistant"
            className="assistant-chat-logo"
          />

        }

      </div>

      <div className="message-content">

        {message.text}

      </div>

    </div>

  );

};

export default ChatMessage;