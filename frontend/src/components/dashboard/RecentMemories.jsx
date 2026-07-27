import "./RecentMemories.css";

import { useEffect, useState } from "react";
import { Clock3, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

import { getRecentMemories } from "../../services/memoryService";

const RecentMemories = () => {

  const [memories, setMemories] = useState([]);

  useEffect(() => {
    loadRecent();
  }, []);

  const loadRecent = async () => {

    try {

      const data = await getRecentMemories();

      setMemories(Array.isArray(data) ? data : []);

    } catch (err) {

      console.log(err);

    }

  };

  return (

    <motion.div

      className="recent-section"

      initial={{ opacity:0,y:20 }}

      animate={{ opacity:1,y:0 }}

    >

      <div className="section-header">

        <h2>

          Recent Memories

        </h2>

        <span>

          {memories.length} Items

        </span>

      </div>

      {

        memories.length===0 ?

        <div className="empty-state">

          No recent memories found.

        </div>

        :

        <div className="recent-list">

          {

            memories.slice(0,5).map(memory=>(

              <div

                className="recent-item"

                key={memory.id}

              >

                <img

                  src={
                    memory.favicon ||

                    `https://www.google.com/s2/favicons?domain=${memory.domain}`
                  }

                  alt=""

                />

                <div className="recent-content">

                  <h4>

                    {memory.title}

                  </h4>

                  <p>

                    {memory.domain}

                  </p>

                </div>

                <div className="recent-right">

                  <span>

                    <Clock3 size={14}/>

                    {memory.reading_time || 0} min

                  </span>

                  {

                    memory.url &&

                    <a

                      href={memory.url}

                      target="_blank"

                      rel="noreferrer"

                    >

                      <ExternalLink size={17}/>

                    </a>

                  }

                </div>

              </div>

            ))

          }

        </div>

      }

    </motion.div>

  );

};

export default RecentMemories;