import "./RenameCollectionModal.css";
import { useState } from "react";

const RenameCollectionModal = ({
  open,
  currentName,
  onClose,
  onSave,
}) => {

  const [name, setName] = useState(currentName);

  if (!open) return null;

  return (

    <div className="modal-overlay">

      <div className="modal-box">

        <h2>Rename Collection</h2>

        <input
          value={name}
          onChange={(e)=>setName(e.target.value)}
        />

        <div className="modal-actions">

          <button
            className="cancel-btn"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="create-btn"
            onClick={()=>onSave(name)}
          >
            Save
          </button>

        </div>

      </div>

    </div>

  );

};

export default RenameCollectionModal;