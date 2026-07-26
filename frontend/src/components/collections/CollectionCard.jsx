import "./CollectionCard.css";
import { FolderKanban, Trash2 } from "lucide-react";

const CollectionCard = ({
    collection,
    onOpen,
    onDelete
}) => {

    return (

        <div className="collection-card">

            <div
                className="collection-top"
                onClick={() => onOpen(collection.id)}
            >

                <div className="collection-icon">
                    <FolderKanban />
                </div>

                <div>

                    <h3>{collection.name}</h3>

                    <p>
                        {collection.memory_count || 0} Memories
                    </p>

                </div>

            </div>

            <button
                className="delete-btn"
                onClick={() => onDelete(collection.id)}
            >
                <Trash2 size={18}/>
            </button>

        </div>

    );

};

export default CollectionCard;