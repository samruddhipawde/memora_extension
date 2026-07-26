import { useEffect, useState } from "react";
import "./Collections.css";
import { getCollections } from "../../services/collectionService";

const Collections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCollections();
  }, []);

  const loadCollections = async () => {
    try {
      const data = await getCollections();
      setCollections(data);
    } catch (error) {
      console.error("Collections:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="collections-card">
      <div className="card-header">
        <h3>Collections</h3>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : collections.length === 0 ? (
        <p>No collections found.</p>
      ) : (
        collections.map((collection) => (
          <div className="collection-item" key={collection.id}>
            <h4>{collection.name}</h4>
          </div>
        ))
      )}
    </div>
  );
};

export default Collections;