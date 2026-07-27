import "./CreateCollectionModal.css";

import { useState } from "react";
import { FolderPlus } from "lucide-react";

const CreateCollectionModal = ({
  open,
  onClose,
  onCreate,
}) => {

  const [name, setName] = useState("");

  if (!open) return null;

  const handleCreate = () => {

    if (!name.trim()) return;

    onCreate(name);

    setName("");

  };

  return (

    <div className="modal-overlay">

      <div className="collection-modal">

        <div className="modal-header">

          <div className="modal-icon">

            <FolderPlus size={28} />

          </div>

          <div>

            <h2>Create Collection</h2>

            <p>
              Organize your memories into collections.
            </p>

          </div>

        </div>

        <input
          type="text"
          placeholder="Collection Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => {

            if (e.key === "Enter") {

              handleCreate();

            }

          }}
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
            onClick={handleCreate}
          >

            Create Collection

          </button>

        </div>

      </div>

    </div>

  );

};

export default CreateCollectionModal;