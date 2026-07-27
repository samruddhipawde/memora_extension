import "./QuickActions.css";

import { useNavigate } from "react-router-dom";

import {

PlusCircle,

Search,

BrainCircuit,

FolderKanban

} from "lucide-react";

const QuickActions = () => {

const navigate = useNavigate();

const actions=[

{

title:"Save Memory",

description:"Save any webpage instantly.",

icon:<PlusCircle size={24}/>,

path:"/save"

},

{

title:"Semantic Search",

description:"Find memories using AI.",

icon:<Search size={24}/>,

path:"/search"

},

{

title:"AI Chat",

description:"Ask questions from memories.",

icon:<BrainCircuit size={24}/>,

path:"/chat"

},

{

title:"Collections",

description:"Manage memory collections.",

icon:<FolderKanban size={24}/>,

path:"/collections"

}

];

return(

<div className="quick-actions">

{

actions.map(action=>(

<div

key={action.title}

className="action-card"

onClick={()=>navigate(action.path)}

>

<div className="action-icon">

{action.icon}

</div>

<h3>{action.title}</h3>

<p>{action.description}</p>

</div>

))

}

</div>

);

};

export default QuickActions;