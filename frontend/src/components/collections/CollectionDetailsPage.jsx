import "./CollectionDetailsPage.css";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FolderKanban } from "lucide-react";
import { motion } from "framer-motion";

import { getCollectionMemories } from "../../services/collectionService";
import MemoryCard from "../memories/MemoryCard";

const CollectionDetailsPage = () => {

  const { id } = useParams();

  const [memories, setMemories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    loadMemories();

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

      console.error("Failed to load collection:", err);

      setMemories([]);

    } finally {

      setLoading(false);

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

          <h1>

            Collection Memories

          </h1>

          <p>

            View every memory stored inside this collection.

          </p>

        </div>

      </div>

      {

        memories.length === 0 ?

        (

          <div className="collection-empty">

            <FolderKanban size={70} />

            <h2>

              This collection is empty

            </h2>

            <p>

              Start adding memories to organize your knowledge.

            </p>

          </div>

        )

        :

        (

          <div className="collection-memory-grid">

            {

              memories.map((memory) => (

                <MemoryCard

                  key={memory.id}

                  memory={memory}

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