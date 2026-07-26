import "./CollectionList.css";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import CollectionGrid from "./CollectionGrid";
import CreateCollectionModal from "./CreateCollectionModal";

import {
  getCollections,
  createCollection,
  deleteCollection,
  renameCollection,
} from "../../services/collectionService";

const CollectionList = () => {

  const navigate = useNavigate();

  const [collections, setCollections] = useState([]);

  const [open, setOpen] = useState(false);

  useEffect(() => {

    loadCollections();

  }, []);

  const loadCollections = async () => {

    try {

      const data = await getCollections();

      setCollections(data);

    } catch (err) {

      console.log(err);

    }

  };

  const handleCreate = async (name) => {

    if (!name.trim()) return;

    await createCollection(name);

    setOpen(false);

    loadCollections();

  };

  const handleRename = async(id,name)=>{

await renameCollection(id,name);

loadCollections();

}

  const handleDelete = async (id) => {

    if (!window.confirm("Delete this collection?")) return;

    await deleteCollection(id);

    loadCollections();

  };

  return (

    <div className="collection-page">

      <div className="collection-header">

        <div>

          <h1>Collections</h1>

          <p>Organize your memories</p>

        </div>

        <button
          className="new-btn"
          onClick={() => setOpen(true)}
        >
          + New Collection
        </button>

      </div>

      <CollectionGrid
        collections={collections}
        onOpen={(id) => navigate(`/collections/${id}`)}
        onDelete={handleDelete}
      />

      <CreateCollectionModal
        open={open}
        onClose={() => setOpen(false)}
        onCreate={handleCreate}
      />

    </div>
    

  );

};

export default CollectionList;