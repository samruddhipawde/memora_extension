import "./FavoriteList.css";
import { useEffect, useState } from "react";

import MemoryCard from "../memories/MemoryCard";
import { getFavoriteMemories } from "../../services/memoryService";

const FavoriteList = () => {

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

      console.error(err);

    } finally {

      setLoading(false);

    }

  };

  if (loading) {

    return <h2>Loading...</h2>;

  }

  return (

    <div className="favorite-page">

      <h1>❤️ Favorite Memories</h1>

      <p>Your bookmarked knowledge.</p>

      <div className="favorite-grid">

        {

          favorites.length === 0 ? (

            <div className="empty">

              <h2>No Favorites Yet</h2>

              <p>Mark memories as favorite.</p>

            </div>

          ) : (

            favorites.map((memory) => (

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

export default FavoriteList;