import "./TrashList.css";

import { useEffect, useState } from "react";

import MemoryCard from "../memories/MemoryCard";

import {
  getTrashMemories,
  restoreMemory
} from "../../services/memoryService";

const TrashList = () => {

  const [memories, setMemories] = useState([]);

  useEffect(() => {
    loadTrash();
  }, []);

  const loadTrash = async () => {

    try {

      const data = await getTrashMemories();

      setMemories(data);

    } catch (err) {

      console.log(err);

    }

  };

  const handleRestore = async (id) => {

    await restoreMemory(id);

    loadTrash();

  };

  return (

    <div className="trash-page">

      <h1>🗑 Trash</h1>

      {

        memories.length === 0 ?

        (

          <p>No deleted memories.</p>

        )

        :

        (

          memories.map(memory => (

            <div
              key={memory.id}
              className="trash-item"
            >

              <MemoryCard memory={memory} />

              <button
                onClick={() => handleRestore(memory.id)}
              >

                Restore

              </button>

            </div>

          ))

        )

      }

    </div>

  );

};

export default TrashList;