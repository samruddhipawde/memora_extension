import "./SearchPage.css";

import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Search as SearchIcon } from "lucide-react";

import { searchMemories } from "../../services/memoryService";

const SearchPage = () => {
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const initialQuery = params.get("q") || "";

  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialQuery) {
      handleSearch(initialQuery);
    }
  }, []);

  const handleSearch = async (text) => {
    setQuery(text);

    if (!text.trim()) {
      setResults([]);
      return;
    }

    try {
      setLoading(true);

      const data = await searchMemories(text);

      if (Array.isArray(data)) {
        setResults(data);
      } else {
        setResults([]);
      }
    } catch (err) {
      console.log(err);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-page">

      <h1>Semantic Search</h1>

      <div className="search-box">
        <SearchIcon size={20} />

        <input
          value={query}
          placeholder="Search memories..."
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      {loading && (
        <p className="loading">
          Searching...
        </p>
      )}

      {!loading && results.length === 0 && (
        <p className="loading">
          No memories found.
        </p>
      )}

      <div className="search-results">

        {results.map((item) => {

          const similarity =
            item.distance !== undefined
              ? Math.max(0, (1 - item.distance) * 100).toFixed(1)
              : "N/A";

          return (

            <div
              key={item.memory_id}
              className="search-result-card"
            >

              <h2>{item.title || "Untitled Memory"}</h2>

              <p>
                {item.summary ||
                  item.content ||
                  "No summary available."}
              </p>

              {item.tags && (
                <p>
                  <strong>Tags:</strong> {item.tags}
                </p>
              )}

              {item.url && (
                <p>
                  <strong>URL:</strong>{" "}
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {item.url}
                  </a>
                </p>
              )}

              <div className="distance">
                Similarity : {similarity}%
              </div>

            </div>

          );
        })}

      </div>

    </div>
  );
};

export default SearchPage;