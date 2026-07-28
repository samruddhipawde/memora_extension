import "./QuickActions.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  PlusCircle,
  Search,
  BrainCircuit,
  FolderKanban,
} from "lucide-react";

import SaveMemoryModal from "../SaveMemoryModal";

const QuickActions = () => {

  const navigate = useNavigate();

  const [openSave, setOpenSave] = useState(false);

  const actions = [

    {
      title: "Save Memory",
      description: "Save any webpage instantly.",
      icon: <PlusCircle size={24} />,
      action: () => setOpenSave(true),
    },

    {
      title: "Semantic Search",
      description: "Find memories using AI.",
      icon: <Search size={24} />,
      action: () => navigate("/search"),
    },

    {
      title: "AI Chat",
      description: "Ask questions from memories.",
      icon: <BrainCircuit size={24} />,
      action: () => navigate("/chat"),
    },

    {
      title: "Collections",
      description: "Manage memory collections.",
      icon: <FolderKanban size={24} />,
      action: () => navigate("/collections"),
    },

  ];

  return (
    <>

      <div className="quick-actions">

        {actions.map((action) => (

          <div
            key={action.title}
            className="action-card"
            onClick={action.action}
          >

            <div className="action-icon">
              {action.icon}
            </div>

            <h3>{action.title}</h3>

            <p>{action.description}</p>

          </div>

        ))}

      </div>

      <SaveMemoryModal
        open={openSave}
        onClose={() => setOpenSave(false)}
        onSaved={() => {
          setOpenSave(false);
          window.dispatchEvent(new Event("memoryUpdated"));
        }}
      />

    </>
  );

};

export default QuickActions;