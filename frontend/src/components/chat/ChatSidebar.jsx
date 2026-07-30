import "./ChatSidebar.css";

import {
  MessageSquarePlus,
  Trash2,
} from "lucide-react";

const ChatSidebar = ({
  conversations = [],
  onNewChat,
  onClearHistory,
  onSelectConversation,
}) => {

  return (

    <div className="chat-sidebar">

      <h2>Memora AI</h2>

      <button
        onClick={onNewChat}
      >
        <MessageSquarePlus size={18} />
        New Chat
      </button>

      <div
        style={{
          flex: 1,
          overflowY: "auto",
          marginTop: "25px",
        }}
      >

        {conversations.length === 0 ? (

          <div
            style={{
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "#94A3B8",
              textAlign: "center",
              padding: "30px",
            }}
          >

            <p
              style={{
                fontSize: "15px",
                lineHeight: "1.8",
              }}
            >
              Your conversations will appear here.
            </p>

          </div>

        ) : (

          conversations.map((chat) => (

            <div
              key={chat.id}
              onClick={() => onSelectConversation(chat.id)}
              style={{
                padding: "14px 16px",
                marginBottom: "10px",
                borderRadius: "12px",
                cursor: "pointer",
                background: "#1B2436",
                color: "white",
                transition: "0.25s",
                border: "1px solid rgba(255,255,255,.05)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#7C3AED";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#1B2436";
              }}
            >

              <span
                style={{
                  display: "block",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  fontWeight: 500,
                }}
              >
                {chat.title}
              </span>

            </div>

          ))

        )}

      </div>

      <button
        className="clear-btn"
        onClick={onClearHistory}
      >
        <Trash2 size={18} />
        Clear History
      </button>

    </div>

  );

};

export default ChatSidebar;