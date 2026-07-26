import "./MemoryCard.css";

import { useState } from "react";
import { motion } from "framer-motion";

import {
  Heart,
  Clock3,
  Globe,
  ExternalLink,
  Eye,
  Trash2,
  Copy,
  Share2,
} from "lucide-react";

import MemoryDrawer from "./MemoryDrawer";

import {
  favoriteMemory,
  deleteMemory,
} from "../../services/memoryService";

const MemoryCard = ({ memory }) => {

  const [favorite, setFavorite] = useState(
    memory.is_favorite || false
  );

  const [open, setOpen] = useState(false);

  const handleFavorite = async (e) => {

    e.stopPropagation();

    try {

      await favoriteMemory(memory.id);

      setFavorite(!favorite);

    } catch (err) {

      console.log(err);

    }

  };

  const handleDelete = async (e) => {

    e.stopPropagation();

    const ok = window.confirm("Delete this memory?");

    if (!ok) return;

    try {

      await deleteMemory(memory.id);

      window.location.reload();

    } catch (err) {

      console.log(err);

    }

  };

  const handleCopy = async (e) => {

    e.stopPropagation();

    await navigator.clipboard.writeText(

      memory.url || memory.content || ""

    );

    alert("Copied Successfully");

  };

  const handleShare = async (e) => {

    e.stopPropagation();

    if (navigator.share) {

      navigator.share({

        title: memory.title,

        text: memory.ai_summary,

        url: memory.url,

      });

    } else {

      await navigator.clipboard.writeText(memory.url);

      alert("Link Copied");

    }

  };

  return (

    <>

      <motion.div

        className="memory-card"

        whileHover={{
          y: -8,
          scale: 1.02,
        }}

      >

        <div className="memory-top">

          <div className="memory-info">

            <img

              className="memory-favicon"

              src={
                memory.favicon ||

                "https://www.google.com/s2/favicons?domain=" +

                memory.domain
              }

              alt=""

            />

            <div>

              <h3>

                {memory.title}

              </h3>

              <span>

                {memory.domain}

              </span>

            </div>

          </div>

          <button

            className="icon-btn"

            onClick={handleFavorite}

          >

            <Heart

              size={18}

              color="#EF4444"

              fill={favorite ? "#EF4444" : "none"}

            />

          </button>

        </div>

        <p className="memory-summary">

          {

            memory.ai_summary ||

            "No AI Summary Available."

          }

        </p>

        <div className="memory-bottom">

          <div className="memory-meta">

            <span>

              <Clock3 size={15} />

              {memory.reading_time || 0} min

            </span>

            <span>

              <Eye size={15} />

              {memory.visit_count || 0}

            </span>

            <span>

              <Globe size={15} />

              {memory.domain}

            </span>

          </div>

          {

            memory.url && (

              <a

                href={memory.url}

                target="_blank"

                rel="noreferrer"

                className="visit-btn"

                onClick={(e)=>e.stopPropagation()}

              >

                <ExternalLink size={18}/>

              </a>

            )

          }

        </div>

        <div className="memory-actions">

          <button

            className="action-btn"

            onClick={() => setOpen(true)}

          >

            <Eye size={18}/>

          </button>

          <button

            className="action-btn"

            onClick={handleCopy}

          >

            <Copy size={18}/>

          </button>

          <button

            className="action-btn"

            onClick={handleShare}

          >

            <Share2 size={18}/>

          </button>

          <button

            className="action-btn delete"

            onClick={handleDelete}

          >

            <Trash2 size={18}/>

          </button>

        </div>

      </motion.div>

      <MemoryDrawer

        open={open}

        memory={memory}

        onClose={() => setOpen(false)}

      />

    </>

  );

};

export default MemoryCard;