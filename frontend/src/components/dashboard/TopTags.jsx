import "./TopTags.css";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Hash } from "lucide-react";

import { getTopTags } from "../../services/memoryService";

const TopTags = () => {

  const [tags, setTags] = useState([]);

  useEffect(() => {
    loadTags();
  }, []);

  const loadTags = async () => {

    try {

      const data = await getTopTags();

      setTags(Array.isArray(data) ? data : []);

    } catch (err) {

      console.log(err);

    }

  };

  return (

    <motion.div

      className="top-tags"

      whileHover={{ y:-5 }}

    >

      <div className="top-card-header">

        <div className="tag-icon">

          <Hash size={20}/>

        </div>

        <div>

          <h3>

            Top Tags

          </h3>

          <span>

            Frequently used tags

          </span>

        </div>

      </div>

      {

        tags.length===0 ?

        <div className="empty">

          No tags available

        </div>

        :

        <div className="tag-list">

          {

            tags.map((tag,index)=>(

              <div

                className="tag-chip"

                key={index}

              >

                <span>

                  #{tag.tag}

                </span>

                <strong>

                  {tag.count}

                </strong>

              </div>

            ))

          }

        </div>

      }

    </motion.div>

  );

};

export default TopTags;