import "./TopDomains.css";

import { useEffect, useState } from "react";
import { Globe } from "lucide-react";
import { motion } from "framer-motion";

import { getTopDomains } from "../../services/memoryService";

const TopDomains = () => {

  const [domains, setDomains] = useState([]);

  useEffect(() => {

    loadDomains();

  }, []);

  const loadDomains = async () => {

    try {

      const data = await getTopDomains();

      setDomains(Array.isArray(data) ? data : []);

    } catch (err) {

      console.log(err);

      setDomains([]);

    }

  };

  return (

    <motion.div

      className="top-domains"

      initial={{ opacity:0, y:20 }}

      animate={{ opacity:1, y:0 }}

      transition={{ duration:.3 }}

    >

      <div className="top-card-header">

        <div className="top-icon">

          <Globe size={20}/>

        </div>

        <div>

          <h3>Top Domains</h3>

          <span>Most Visited Websites</span>

        </div>

      </div>

      <div className="domain-list">

        {

          domains.length === 0 ?

          <div className="empty">

            No domains found.

          </div>

          :

          domains

          .slice(0,5)

          .map((item,index)=>(

            <div

              className="domain-item"

              key={item.domain || index}

            >

              <div className="domain-info">

                <h4>

                  {item.domain}

                </h4>

              </div>

              <span>

                {item.count}

              </span>

            </div>

          ))

        }

      </div>

    </motion.div>

  );

};

export default TopDomains;