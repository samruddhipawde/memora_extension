import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import MainLayout from "../../components/layout/MainLayout";
import MemoryCard from "../../components/memories/MemoryCard";

import {
  getAllMemories,
  deleteMemory,
  toggleFavorite,
} from "../../services/memoryService";


const Memories = () => {

  const [searchParams] = useSearchParams();

  const showToday = searchParams.get("today") === "true";

  const [memories, setMemories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    loadMemories();

    const reload = () => loadMemories();

    window.addEventListener("memoryUpdated", reload);

    return () => {
      window.removeEventListener("memoryUpdated", reload);
    };

  }, [showToday]);

  const loadMemories = async () => {

    try {

      setLoading(true);

      const data = await getAllMemories();

      let list = Array.isArray(data) ? data : [];

      if (showToday) {

        const today = new Date();

        list = list.filter((memory) => {

          const date = new Date(
            memory.created_at ||
            memory.createdAt ||
            memory.saved_at ||
            memory.timestamp
          );

          return (
            date.getFullYear() === today.getFullYear() &&
            date.getMonth() === today.getMonth() &&
            date.getDate() === today.getDate()
          );

        });

      }

      setMemories(list);

    } catch (err) {

      console.log(err);
      setMemories([]);

    } finally {

      setLoading(false);

    }

  };

  const handleDelete = async (id) => {

    try {

      await deleteMemory(id);

      window.dispatchEvent(new Event("memoryUpdated"));

    } catch (err) {

      console.log(err);

    }

  };

  const handleFavorite = async (id) => {

    try {

      await toggleFavorite(id);

      window.dispatchEvent(new Event("memoryUpdated"));

    } catch (err) {

      console.log(err);

    }

  };

  return (

    <MainLayout>

      <div className="page-container">

        <h1>
          {showToday ? "Today's Memories" : "All Memories"}
        </h1>

        {

          loading ? (

            <p>Loading...</p>

          ) : memories.length === 0 ? (

            <p>No memories found.</p>

          ) : (

            memories.map((memory) => (

              <MemoryCard
                key={memory.id}
                memory={memory}
                onDelete={() => handleDelete(memory.id)}
                onFavorite={() => handleFavorite(memory.id)}
              />

            ))

          )

        }

      </div>

    </MainLayout>

  );

};

export default Memories;