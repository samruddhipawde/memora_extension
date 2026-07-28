import "./StatsSection.css";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import {
  BookOpen,
  Heart,
  Globe,
  CalendarDays,
} from "lucide-react";

import StatCard from "./StatCard";
import { getDashboardStats } from "../../services/memoryService";

const StatsSection = () => {

  const navigate = useNavigate();

  const [stats, setStats] = useState({
    total_memories: 0,
    favorite_memories: 0,
    total_domains: 0,
    today_memories: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    loadStats();

    const reload = () => loadStats();

    window.addEventListener("memoryUpdated", reload);

    return () => {
      window.removeEventListener("memoryUpdated", reload);
    };

  }, []);

  const loadStats = async () => {

    try {

      setLoading(true);

      const data = await getDashboardStats();

      setStats({
        total_memories: data?.total_memories || 0,
        favorite_memories: data?.favorite_memories || 0,
        total_domains: data?.total_domains || 0,
        today_memories: data?.today_memories || 0,
      });

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);

    }

  };

  const cards = [

    {
      title: "Total Memories",
      value: stats.total_memories,
      icon: <BookOpen size={24} />,
      color: "#8B5CF6",
      onClick: () => navigate("/memories"),
    },

    {
      title: "Favorites",
      value: stats.favorite_memories,
      icon: <Heart size={24} />,
      color: "#EF4444",
      onClick: () => navigate("/favorites"),
    },

    {
      title: "Domains",
      value: stats.total_domains,
      icon: <Globe size={24} />,
      color: "#3B82F6",
      onClick: null,
    },

    {
      title: "Today's Memories",
      value: stats.today_memories,
      icon: <CalendarDays size={24} />,
      color: "#10B981",
      onClick: () => navigate("/memories?today=true"),
    },

  ];

  return (

    <motion.div
      className="stats-grid"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: .4 }}
    >

      {

        cards.map((card) => (

          <StatCard
            key={card.title}
            title={card.title}
            value={loading ? "..." : card.value}
            icon={card.icon}
            color={card.color}
            onClick={card.onClick}
          />

        ))

      }

    </motion.div>

  );

};

export default StatsSection;