import "./CollectionDetailsPage.css";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FolderKanban } from "lucide-react";
import { motion } from "framer-motion";

import {
  getCollectionMemories,
  removeMemoryFromCollection,
  addMemoryToCollection,
} from "../../services/collectionService";

import { getAllMemories } from "../../services/memoryService";
import MemoryCard from "../memories/MemoryCard";

const CollectionDetailsPage = () => {

  const { id } = useParams();

  const [memories, setMemories] = useState([]);
  const [loading, setLoading] = useState(true);

  const [allMemories, setAllMemories] = useState([]);
  const [selectedMemory, setSelectedMemory] = useState("");

  useEffect(() => {

    loadMemories();
    loadAllMemories();

  }, [id]);

  const loadMemories = async () => {

    try {

      const data = await getCollectionMemories(id);

      if (Array.isArray(data)) {

        setMemories(data);

      } else if (Array.isArray(data.memories)) {

        setMemories(data.memories);

      } else {

        setMemories([]);

      }

    } catch (err) {

      console.error(err);
      setMemories([]);

    } finally {

      setLoading(false);

    }

  };

  const loadAllMemories = async () => {

    try {

      const data = await getAllMemories();

      setAllMemories(Array.isArray(data) ? data : []);

    } catch (err) {

      console.log(err);

    }

  };

  const handleAddMemory = async () => {

    if (!selectedMemory) return;

    try {

      await addMemoryToCollection(id, selectedMemory);

      setSelectedMemory("");

      loadMemories();

    } catch (err) {

      console.log(err);

    }

  };

  const handleDelete = async (memoryId) => {

    try {

      await removeMemoryFromCollection(memoryId);

      loadMemories();

    } catch (err) {

      console.log(err);

    }

  };

  if (loading) {

    return (

      <div className="collection-loading">
        <h2>Loading Collection...</h2>
      </div>

    );

  }

  return (

    <motion.div
      className="collection-details-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: .4 }}
    >

      <div className="collection-header">

        <div className="collection-icon">
          <FolderKanban size={34} />
        </div>

        <div>

          <h1>Collection Memories</h1>

          <p>
            View every memory stored inside this collection.
          </p>

        </div>

      </div>

      <div
        style={{
          display: "flex",
          gap: "12px",
          marginBottom: "25px",
          alignItems: "center",
        }}
      >

        <select
          value={selectedMemory}
          onChange={(e) => setSelectedMemory(e.target.value)}
          style={{
            padding: "12px",
            borderRadius: "12px",
            background: "#1E293B",
            color: "white",
            border: "1px solid rgba(255,255,255,.1)",
            minWidth: "260px",
          }}
        >

          <option value="">
            Select Memory
          </option>

          {allMemories.map((memory) => (

            <option
              key={memory.id}
              value={memory.id}
            >

              {memory.title}

            </option>

          ))}

        </select>

        <button
          onClick={handleAddMemory}
          style={{
            padding: "12px 22px",
            background: "#7C3AED",
            border: "none",
            borderRadius: "12px",
            color: "white",
            cursor: "pointer",
            fontWeight: 600,
          }}
        >

          Add Memory

        </button>

      </div>

      {

        memories.length === 0 ? (

          <div className="collection-empty">

            <FolderKanban size={70} />

            <h2>
              This collection is empty
            </h2>

            <p>
              Start adding memories to organize your knowledge.
            </p>

          </div>

        ) : (

          <div className="collection-memory-grid">

            {

              memories.map((memory) => (

                <MemoryCard
                  key={memory.id}
                  memory={memory}
                  onDelete={handleDelete}
                />

              ))

            }

          </div>

        )

      }

    </motion.div>

  );

};

export default CollectionDetailsPage;