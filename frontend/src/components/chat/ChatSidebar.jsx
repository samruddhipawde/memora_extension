import "./ChatSidebar.css";

import {
  MessageSquarePlus,
  Trash2
} from "lucide-react";

const ChatSidebar = () => {

  return (

    <div className="chat-sidebar">

      <h2>Memora AI</h2>

      <button>

        <MessageSquarePlus size={18}/>

        New Chat

      </button>

      <div
        style={{
          flex:1,
          display:"flex",
          alignItems:"center",
          justifyContent:"center",
          color:"#94A3B8",
          textAlign:"center",
          padding:"30px"
        }}
      >

        <div>

          <p
            style={{
              fontSize:"15px",
              lineHeight:"1.8"
            }}
          >

            Your conversations will appear here.

          </p>

        </div>

      </div>

      <button className="clear-btn">

        <Trash2 size={18}/>

        Clear History

      </button>

    </div>

  );

};

export default ChatSidebar;