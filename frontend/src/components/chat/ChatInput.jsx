import "./ChatInput.css";

import { useState } from "react";

import {
  Send,
  Mic,
  Paperclip,
  Smile,
} from "lucide-react";

const ChatInput = ({ onSend }) => {

  const [message, setMessage] = useState("");

  const sendMessage = () => {

    if (!message.trim()) return;

    onSend?.(message);

    setMessage("");

  };

  return (

    <div className="chat-input">

      <button className="icon-btn">

        <Paperclip size={19} />

      </button>

      <textarea

        rows={1}

        placeholder="Ask Memora AI about your memories..."

        value={message}

        onChange={(e) => setMessage(e.target.value)}

        onInput={(e) => {

          e.target.style.height = "auto";

          e.target.style.height = e.target.scrollHeight + "px";

        }}

        onKeyDown={(e) => {

          if (e.key === "Enter" && !e.shiftKey) {

            e.preventDefault();

            sendMessage();

          }

        }}

      />

      <button className="icon-btn">

        <Smile size={19} />

      </button>

      <button className="icon-btn">

        <Mic size={19} />

      </button>

      <button

        className="send-btn"

        onClick={sendMessage}

      >

        <Send size={18} />

      </button>

    </div>

  );

};

export default ChatInput;