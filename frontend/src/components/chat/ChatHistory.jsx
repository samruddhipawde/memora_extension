import "./ChatHistory.css";

import { MessageSquare } from "lucide-react";

const ChatHistory = ({ chats = [], onSelect }) => {

  return (

    <div className="chat-history">

      {

        chats.length === 0 ?

        (

          <div className="empty-history">

            <MessageSquare size={40} />

            <h3>No Chats Yet</h3>

            <p>

              Start a conversation with Memora AI.

            </p>

          </div>

        )

        :

        (

          chats.map((chat) => (

            <div

              key={chat.id}

              className="history-item"

              onClick={() => onSelect(chat)}

            >

              <div className="history-icon">

                <MessageSquare size={18} />

              </div>

              <div className="history-content">

                <h4>

                  {chat.title}

                </h4>

                <span>

                  {chat.date}

                </span>

              </div>

            </div>

          ))

        )

      }

    </div>

  );

};

export default ChatHistory;