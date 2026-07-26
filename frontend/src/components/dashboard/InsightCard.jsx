import "./InsightCard.css";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

import { getAIInsight } from "../../services/memoryService";

const InsightCard = () => {

  const [insight, setInsight] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadInsight();
  }, []);

  const loadInsight = async () => {

    try {

      const data = await getAIInsight();

      setInsight(
        data?.insight ||
        data?.message ||
        "No AI insight available."
      );

    } catch {

      setInsight("No AI insight available.");

    } finally {

      setLoading(false);

    }

  };

  return (

    <motion.div

      className="insight-card"

      whileHover={{
        y:-5
      }}

    >

      <div className="insight-header">

        <div className="insight-icon">

          <Sparkles size={22}/>

        </div>

        <div>

          <h3>

            AI Insight

          </h3>

          <span>

            Personalized Summary

          </span>

        </div>

      </div>

      <div className="insight-body">

        {

          loading

          ?

          <p>

            Generating insights...

          </p>

          :

          <p>

            {insight}

          </p>

        }

      </div>

    </motion.div>

  );

};

export default InsightCard;