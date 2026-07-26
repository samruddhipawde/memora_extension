import "./StatsSection.css";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import {
  BookOpen,
  Heart,
  Globe,
  CalendarDays,
} from "lucide-react";

import StatCard from "./StatCard";
import { getDashboardStats } from "../../services/memoryService";

const StatsSection = () => {

  const [stats, setStats] = useState(null);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {

      const data = await getDashboardStats();

      setStats(data);

    } catch (err) {

      console.log(err);

    }
  };

  if (!stats) return null;

  return (

    <motion.div

      className="stats-grid"

      initial={{ opacity:0,y:20 }}

      animate={{ opacity:1,y:0 }}

    >

      <StatCard
        title="Total Memories"
        value={stats.total_memories}
        icon={<BookOpen size={24}/>}
        color="#8B5CF6"
      />

      <StatCard
        title="Favorites"
        value={stats.favorite_memories}
        icon={<Heart size={24}/>}
        color="#EF4444"
      />

      <StatCard
        title="Domains"
        value={stats.total_domains}
        icon={<Globe size={24}/>}
        color="#3B82F6"
      />

      <StatCard
        title="Today's Memories"
        value={stats.today_memories}
        icon={<CalendarDays size={24}/>}
        color="#10B981"
      />

    </motion.div>

  );

};

export default StatsSection;