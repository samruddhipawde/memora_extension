import "./DashboardBody.css";

import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";

import HeroBanner from "./HeroBanner/HeroBanner";
import QuickActions from "./QuickActions/QuickActions";
import StatsSection from "./StatsSection";
import RecentMemories from "./RecentMemories";
import InsightCard from "./InsightCard";
import TopDomains from "./TopDomains";
import TopTags from "./TopTags";
import ChatWidget from "./ChatWidget";
import MostVisited from "./MostVisited";
import CollectionsPreview from "./CollectionsPreview";

const DashboardBody = () => {

  const { user } = useAuth();

  return (

    <motion.div
      className="dashboard-body"
      initial={{ opacity:0,y:20 }}
      animate={{ opacity:1,y:0 }}
      transition={{ duration:.4 }}
    >

      <HeroBanner user={user} />

      <QuickActions />

      <StatsSection />

      <div className="dashboard-grid">

        <div className="left-column">

          <RecentMemories />

          <CollectionsPreview />

          <MostVisited />

        </div>

        <div className="right-column">

          <InsightCard />

          <TopDomains />

          <TopTags />

        </div>

      </div>

      <ChatWidget />

    </motion.div>

  );

};

export default DashboardBody;