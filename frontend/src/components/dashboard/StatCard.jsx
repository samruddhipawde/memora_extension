import "./StatCard.css";
import { motion } from "framer-motion";

const StatCard = ({ title, value, icon, color }) => {

  return (

    <motion.div

      className="stat-card"

      whileHover={{
        y: -6,
        scale: 1.02,
      }}

      transition={{
        duration: .25,
      }}

    >

      <div
        className="stat-icon"
        style={{
          background: color,
        }}
      >

        {icon}

      </div>

      <div className="stat-content">

        <h2>

          {value}

        </h2>

        <p>

          {title}

        </p>

      </div>

    </motion.div>

  );

};

export default StatCard;