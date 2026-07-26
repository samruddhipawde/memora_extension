import "./ChatHistory.css";

const ChatHistory = ({ chats = [], onSelect }) => {

  return (

    <div className="chat-history">

      {

        chats.length === 0 ?

        (

          <p className="empty-history">

            No conversations yet

          </p>

        )

        :

        (

          chats.map(chat => (

            <div

              key={chat.id}

              className="history-item"

              onClick={() => onSelect(chat)}

            >

              <h4>{chat.title}</h4>

              <span>{chat.date}</span>

            </div>

          ))

        )

      }

    </div>

  );

};

export default ChatHistory;