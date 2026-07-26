import "./HeroBanner.css";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

import logo from "../../../assets/logo/memora-logo.png";

import { useAuth } from "../../../context/AuthContext";
const HeroBanner = () => {

  const { user } = useAuth();

  const hour = new Date().getHours();

  let greeting = "Hello";

  if (hour < 12) greeting = "Good Morning";
  else if (hour < 17) greeting = "Good Afternoon";
  else greeting = "Good Evening";

  return (

    <motion.div

      className="hero-banner"

      initial={{ opacity: 0, y: 20 }}

      animate={{ opacity: 1, y: 0 }}

      transition={{ duration: .5 }}

    >

      <div className="hero-left">

        <img
          src={logo}
          alt="Memora"
          className="hero-logo"
        />

        <div>

          <span className="hero-badge">

            <Sparkles size={15}/>

            Memora AI

          </span>

          <h1>

            {greeting},

            <span>

              {user?.full_name || "User"}

            </span>

            👋

          </h1>

          <p>

            Here's what's happening with your memories today.

          </p>

        </div>

      </div>

    </motion.div>

  );

};

export default HeroBanner;