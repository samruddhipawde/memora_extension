import "./ChatInput.css";

import { useState } from "react";

import {
  Send,
  Mic,
  Paperclip,
  Smile
} from "lucide-react";

const ChatInput = ({ onSend }) => {

  const [message, setMessage] = useState("");

  const sendMessage = () => {

    if (!message.trim()) return;

    if (onSend) {
      onSend(message);
    }

    setMessage("");
  };

  return (

    <div className="chat-input">

      <button className="icon-btn">
        <Paperclip size={20}/>
      </button>

      <button className="icon-btn">
        <Smile size={20}/>
      </button>

      <textarea

        rows="1"

        placeholder="Ask Memora AI anything..."

        value={message}

        onChange={(e)=>setMessage(e.target.value)}

        onKeyDown={(e)=>{

          if(e.key==="Enter" && !e.shiftKey){

            e.preventDefault();

            sendMessage();

          }

        }}

      />

      <button className="icon-btn">
        <Mic size={20}/>
      </button>

      <button

        className="send-btn"

        onClick={sendMessage}

      >

        <Send size={18}/>

      </button>

    </div>

  );

};

export default ChatInput;