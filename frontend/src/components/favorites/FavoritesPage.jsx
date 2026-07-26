import "./FavoritesPage.css";

import { useEffect, useState } from "react";

import { getFavoriteMemories } from "../../services/memoryService";
import MemoryCard from "../memories/MemoryCard";

const FavoritesPage = () => {

  const [favorites, setFavorites] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    loadFavorites();

  }, []);

  const loadFavorites = async () => {

    try {

      const data = await getFavoriteMemories();

      setFavorites(data);

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);

    }

  };

  const handleDelete = (id) => {

    setFavorites((prev) =>

      prev.filter((memory) => memory.id !== id)

    );

  };

  if (loading) {

    return <h2>Loading...</h2>;

  }

  return (

    <div className="favorites-page">

      <h1>⭐ Favorite Memories</h1>

      <div className="favorites-grid">

        {

          favorites.length === 0 ?

          (

            <p className="empty">

              No favorite memories yet.

            </p>

          )

          :

          (

            favorites.map((memory) => (

              <MemoryCard

                key={memory.id}

                memory={memory}

                onDelete={handleDelete}

              />

            ))

          )

        }

      </div>

    </div>

  );

};

export default FavoritesPage;