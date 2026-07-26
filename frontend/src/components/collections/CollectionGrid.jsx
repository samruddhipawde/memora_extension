import "./CollectionGrid.css";

import CollectionCard from "./CollectionCard";

const CollectionGrid = ({
    collections,
    onOpen,
    onDelete
}) => {

    return (

        <div className="collection-grid">

            {

                collections.map(collection => (

                    <CollectionCard

                        key={collection.id}

                        collection={collection}

                        onOpen={onOpen}

                        onDelete={onDelete}

                    />

                ))

            }

        </div>

    );

};

export default CollectionGrid;