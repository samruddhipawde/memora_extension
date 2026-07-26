import "./Dashboard.css";
import DashboardBody from "./DashboardBody";
import HeroBanner from "./HeroBanner/HeroBanner";
import { motion } from "framer-motion";
const DashboardHome = () => {
  return (

<motion.div

initial={{
opacity:0,
y:20,
}}

animate={{
opacity:1,
y:0,
}}

transition={{
duration:.5
}}

>

<HeroBanner />

<StatsSection/>

<DashboardBody/>

</motion.div>

);
};

export default DashboardHome;