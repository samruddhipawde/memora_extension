import "./Dashboard.css";
import { motion } from "framer-motion";
import DashboardBody from "./DashboardBody";

const DashboardHome = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <DashboardBody />
    </motion.div>
  );
};

export default DashboardHome;