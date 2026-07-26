import "./ChatSidebar.css";

import {

MessageSquarePlus,

Trash2

} from "lucide-react";

import ChatHistory from "./ChatHistory";

const demoChats = [

{

id:1,

title:"React Hooks",

date:"Today"

},

{

id:2,

title:"FastAPI Notes",

date:"Yesterday"

},

{

id:3,

title:"Machine Learning",

date:"2 days ago"

}

];

const ChatSidebar = () => {

return(

<div className="chat-sidebar">

<h2>

Memora AI

</h2>

<button>

<MessageSquarePlus size={18}/>

New Chat

</button>

<ChatHistory

chats={demoChats}

onSelect={(chat)=>console.log(chat)}

/>

<button className="clear-btn">

<Trash2 size={18}/>

Clear History

</button>

</div>

);

};

export default ChatSidebar;