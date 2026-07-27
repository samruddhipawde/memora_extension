import "./MostVisited.css";

import { useEffect, useState } from "react";
import { ExternalLink, Globe } from "lucide-react";
import { motion } from "framer-motion";

import { getMostVisited } from "../../services/memoryService";

const MostVisited = () => {

  const [pages, setPages] = useState([]);

  useEffect(() => {
    loadPages();
  }, []);

  const loadPages = async () => {

    try {

      const data = await getMostVisited();

      setPages(Array.isArray(data) ? data : []);

    } catch (err) {

      console.log(err);

    }

  };

  return (

    <motion.div

      className="most-visited"

      whileHover={{ y:-5 }}

    >

      <div className="top-card-header">

        <div className="visit-icon">

          <Globe size={20}/>

        </div>

        <div>

          <h3>

            Most Visited

          </h3>

          <span>

            Frequently opened pages

          </span>

        </div>

      </div>

      {

        pages.length===0 ?

        <div className="empty">

          No visited pages yet.

        </div>

        :

        pages.slice(0,5).map(page=>(

          <div

            key={page.id}

            className="visited-card"

          >

            <img

              src={
                page.favicon ||

                `https://www.google.com/s2/favicons?domain=${page.url}`
              }

              alt=""

            />

            <div className="visited-info">

              <h4>

                {page.title}

              </h4>

              <p>

                {page.visit_count} Visits

              </p>

            </div>

            <a

              href={page.url}

              target="_blank"

              rel="noreferrer"

            >

              <ExternalLink size={18}/>

            </a>

          </div>

        ))

      }

    </motion.div>

  );

};

export default MostVisited;