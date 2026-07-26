import "./QuickActions.css";

import { useNavigate } from "react-router-dom";

import {
  Brain,
  Search,
  FolderKanban,
  MessageCircle,
  Heart,
} from "lucide-react";

const QuickActions = () => {

  const navigate = useNavigate();

  const actions = [

    {
      title: "All Memories",
      icon: <Brain size={28}/>,
      color: "#8B5CF6",
      path: "/memories",
    },

    {
      title: "AI Search",
      icon: <Search size={28}/>,
      color: "#2563EB",
      path: "/chat",
    },

    {
      title: "Collections",
      icon: <FolderKanban size={28}/>,
      color: "#06B6D4",
      path: "/collections",
    },

    {
      title: "AI Chat",
      icon: <MessageCircle size={28}/>,
      color: "#10B981",
      path: "/chat",
    },

    {
      title: "Favorites",
      icon: <Heart size={28}/>,
      color: "#EF4444",
      path: "/favorites",
    },

  ];

  return (

    <div className="quick-actions">

      {

        actions.map((action,index)=>(

          <div

            key={index}

            className="quick-card"

            onClick={()=>navigate(action.path)}

          >

            <div

              className="icon"

              style={{

                background:action.color,

              }}

            >

              {action.icon}

            </div>

            <h3>

              {action.title}

            </h3>

          </div>

        ))

      }

    </div>

  );

};

export default QuickActions;