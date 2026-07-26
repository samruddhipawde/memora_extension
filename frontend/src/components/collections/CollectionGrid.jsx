import "./CollectionGrid.css";

import {
  FolderKanban,
  Trash2,
  ChevronRight,
} from "lucide-react";

const CollectionGrid = ({
  collections = [],
  onOpen,
  onDelete,
}) => {

  if (collections.length === 0) {

    return (

      <div className="collection-empty">

        <FolderKanban size={70} />

        <h2>No Collections Yet</h2>

        <p>

          Create your first collection to organize your memories.

        </p>

      </div>

    );

  }

  return (

    <div className="collection-grid">

      {

        collections.map((collection) => (

          <div

            key={collection.id}

            className="collection-card"

          >

            <div

              className="collection-body"

              onClick={() => onOpen(collection.id)}

            >

              <div className="collection-icon">

                <FolderKanban size={30} />

              </div>

              <h3>

                {collection.name}

              </h3>

              <p>

                {collection.memory_count || 0} Memories

              </p>

            </div>

            <div className="collection-actions">

              <button

                className="open-btn"

                onClick={() => onOpen(collection.id)}

              >

                <ChevronRight size={18} />

              </button>

              <button

                className="delete-btn"

                onClick={() => onDelete(collection.id)}

              >

                <Trash2 size={18} />

              </button>

            </div>

          </div>

        ))

      }

    </div>

  );

};

export default CollectionGrid;