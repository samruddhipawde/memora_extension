import "./ProfileCard.css";

import { useEffect, useState } from "react";

import {
  User,
  Mail,
  Shield,
  Calendar,
  Brain,
  Heart,
} from "lucide-react";

import { getCurrentUser } from "../../services/userService";
import { getDashboardStats } from "../../services/memoryService";

const ProfileCard = () => {

  const [user, setUser] = useState(null);

  const [stats, setStats] = useState({
    total_memories: 0,
    favorite_memories: 0,
    total_domains: 0,
  });

  useEffect(() => {

    load();

  }, []);

  const load = async () => {

    try {

      const userData = await getCurrentUser();

      setUser(userData);

      const dashboard = await getDashboardStats();

      setStats(dashboard);

    } catch (err) {

      console.log(err);

    }

  };

  if (!user) {

    return <h2 style={{ color: "white" }}>Loading...</h2>;

  }

  return (

    <div className="profile-card">

      <div className="profile-top">

        <div className="avatar">

          {user.full_name?.charAt(0)}

        </div>

        <div>

          <h2>{user.full_name}</h2>

          <span>Memora User</span>

        </div>

      </div>

      <div className="profile-details">

        <div className="profile-row">

          <Mail size={18} />

          <span>{user.email}</span>

        </div>

        <div className="profile-row">

          <Shield size={18} />

          <span>Authenticated Account</span>

        </div>

        <div className="profile-row">

          <Calendar size={18} />

          <span>

            Joined {new Date(user.created_at).toLocaleDateString()}

          </span>

        </div>

      </div>

      <div className="profile-stats">

        <div>

          <Brain size={22} />

          <h3>{stats.total_memories}</h3>

          <p>Memories</p>

        </div>

        <div>

          <Heart size={22} />

          <h3>{stats.favorite_memories}</h3>

          <p>Favorites</p>

        </div>

        <div>

          <User size={22} />

          <h3>{stats.total_domains}</h3>

          <p>Domains</p>

        </div>

      </div>

    </div>

  );

};

export default ProfileCard;