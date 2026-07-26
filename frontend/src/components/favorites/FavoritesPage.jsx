import "./FavoritesPage.css";

import { useEffect, useState } from "react";

import { getFavoriteMemories } from "../../services/memoryService";
import MemoryCard from "../memories/MemoryCard";

const FavoritesPage = () => {

  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {

    try {

      const data = await getFavoriteMemories();

      setFavorites(data);

    } catch (err) {

      console.log(err);

    }

  };

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

            favorites.map(memory => (

              <MemoryCard

                key={memory.id}

                memory={memory}

              />

            ))

          )

        }

      </div>

    </div>

  );

};

export default FavoritesPage;