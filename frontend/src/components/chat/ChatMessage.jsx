import "./ChatMessage.css";

import { User, Bot } from "lucide-react";

const ChatMessage = ({ message }) => {

  const isUser = message.sender === "user";

  return (

    <div className={`chat-message ${isUser ? "user" : "assistant"}`}>

      <div className="message-avatar">

        {isUser ? <User size={18}/> : <Bot size={18}/>}

      </div>

      <div className="message-content">

        {message.text}

      </div>

    </div>

  );

};

export default ChatMessage;