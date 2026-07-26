import "./CollectionList.css";

import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FolderKanban,
  Search,
  Plus,
} from "lucide-react";

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
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {

    loadCollections();

  }, []);

  const loadCollections = async () => {

    try {

      const data = await getCollections();

      setCollections(Array.isArray(data) ? data : []);

    }

    catch (err) {

      console.log(err);

    }

    finally {

      setLoading(false);

    }

  };

  const handleCreate = async (name) => {

    if (!name.trim()) return;

    await createCollection(name);

    setOpen(false);

    await loadCollections();

    window.dispatchEvent(new Event("memoryUpdated"));

};

  const handleRename = async (id,name)=>{

    await renameCollection(id,name);

    await loadCollections();

    window.dispatchEvent(new Event("memoryUpdated"));

};

 const handleDelete = async(id)=>{

    if(!window.confirm("Delete this collection?")) return;

    await deleteCollection(id);

    await loadCollections();

    window.dispatchEvent(new Event("memoryUpdated"));

};

  const filtered = useMemo(() => {

    return collections.filter((collection) =>

      collection.name
        ?.toLowerCase()
        .includes(search.toLowerCase())

    );

  }, [collections, search]);

  if (loading) {

    return (

      <h2 style={{ color: "white" }}>

        Loading Collections...

      </h2>

    );

  }

  return (

    <div className="collection-page">

      <div className="collection-header">

        <div>

          <h1>

            <FolderKanban size={30} />

            Collections

          </h1>

          <p>

            Organize your memories into collections.

          </p>

        </div>

        <div className="collection-actions">

          <div className="collection-search">

            <Search size={18} />

            <input

              placeholder="Search collections..."

              value={search}

              onChange={(e) => setSearch(e.target.value)}

            />

          </div>

          <button

            className="new-btn"

            onClick={() => setOpen(true)}

          >

            <Plus size={18} />

            New Collection

          </button>

        </div>

      </div>

      {

        filtered.length === 0 ?

          (

            <div className="collection-empty">

              <FolderKanban size={60} />

              <h2>No Collections Found</h2>

              <p>

                Create your first collection to organize memories.

              </p>

            </div>

          )

          :

          (

            <CollectionGrid

              collections={filtered}

              onOpen={(id) => navigate(`/collections/${id}`)}

              onDelete={handleDelete}

              onRename={handleRename}

            />

          )

      }

      <CreateCollectionModal

        open={open}

        onClose={() => setOpen(false)}

        onCreate={handleCreate}

      />

    </div>

  );

};

export default CollectionList;