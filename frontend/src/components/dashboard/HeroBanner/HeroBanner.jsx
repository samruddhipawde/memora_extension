import "./HeroBanner.css";
import logo from "../../../assets/logo/memora-logo.png";
import { useAuth } from "../../../context/AuthContext";

const HeroBanner = () => {

  const { user } = useAuth();

  const hour = new Date().getHours();

  let greeting = "Hello";

  if(hour < 12) greeting = "Good Morning";
  else if(hour < 18) greeting = "Good Afternoon";
  else greeting = "Good Evening";

  return(

    <div className="hero-banner">

      <div className="hero-left">

        <h1>

          {greeting}

          {user?.full_name ? `, ${user.full_name}` : ""} 👋

        </h1>

        <p>
Here's what's happening with your memory journey.
</p>

      </div>

      <img

        src={logo}

        alt="Memora"

        className="hero-logo"

      />

    </div>

  );

};

export default HeroBanner;