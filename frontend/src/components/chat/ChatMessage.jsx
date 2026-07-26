import "./ChatMessage.css";

import assistantAvatar from "../../assets/ai/assistant.png";
import userAvatar from "../../assets/user/user.png";
import { Copy } from "lucide-react";

const ChatMessage = ({ message }) => {

  const isAI =
    message.sender === "assistant" ||
    message.sender === "ai";

  return (

    <div className={`chat-message ${isAI ? "ai" : "user"}`}>

      <img
        src={isAI ? assistantAvatar : userAvatar}
        alt={isAI ? "Assistant" : "User"}
        className="avatar"
      />

      <div className="message-content">

        <div className="bubble">
          {message.text}
        </div>

        <div className="message-footer">

          <span>Just now</span>

          <button
            className="copy-btn"
            onClick={() => navigator.clipboard.writeText(message.text)}
          >
            <Copy size={15} />
          </button>

        </div>

      </div>

    </div>

  );

};

export default ChatMessage;