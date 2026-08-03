import "./ProfileCard.css";

import { useEffect, useState } from "react";
import {
  User,
  Mail,
  Shield,
  Calendar,
  Brain,
  Heart,
  Edit3,
  Save,
  X,
} from "lucide-react";

import {
  getCurrentUser,
  updateProfile,
} from "../../services/userService";

import { getDashboardStats } from "../../services/memoryService";

const ProfileCard = () => {
  const [user, setUser] = useState(null);

  const [stats, setStats] = useState({
    total_memories: 0,
    favorite_memories: 0,
    total_domains: 0,
  });

  const [editing, setEditing] = useState(false);

  const [form, setForm] = useState({
    full_name: "",
    email: "",
  });

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      const userData = await getCurrentUser();

      setUser(userData);

      setForm({
        full_name: userData.full_name,
        email: userData.email,
      });

      const dashboard = await getDashboardStats();

      setStats(dashboard);
    } catch (err) {
      console.log(err);
    }
  };
const saveProfile = async () => {
  try {
    const updatedUser = await updateProfile(form);

    setUser(updatedUser);

    setForm({
      full_name: updatedUser.full_name,
      email: updatedUser.email,
    });

    setEditing(false);

  } catch (err) {
    console.log(err.response?.data || err);
  }
};

  if (!user) {
    return <h2 style={{ color: "white" }}>Loading...</h2>;
  }

  return (
    <div className="profile-card">
      <div className="profile-top">
        <div className="avatar">
          {user.full_name?.charAt(0).toUpperCase()}
        </div>

        <div className="profile-info">
          {editing ? (
            <>
              <input
                className="profile-input"
                value={form.full_name}
                onChange={(e) =>
                  setForm({
                    ...form,
                    full_name: e.target.value,
                  })
                }
              />

              <input
                className="profile-input"
                value={form.email}
                onChange={(e) =>
                  setForm({
                    ...form,
                    email: e.target.value,
                  })
                }
              />
            </>
          ) : (
            <>
              <h2>{user.full_name}</h2>
              <span>Memora User</span>
            </>
          )}
        </div>
      </div>

      <div className="profile-details">
        <div className="profile-row">
          <Mail size={18} />
          <span>{editing ? form.email : user.email}</span>
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

      <div className="profile-actions">
        {!editing ? (
          <button
            className="edit-btn"
            onClick={() => setEditing(true)}
          >
            <Edit3 size={18} />
            Edit Profile
          </button>
        ) : (
          <>
            <button
              className="save-btn"
              onClick={saveProfile}
            >
              <Save size={18} />
              Save
            </button>

            <button
              className="cancel-btn"
              onClick={() => {
                setEditing(false);

                setForm({
                  full_name: user.full_name,
                  email: user.email,
                });
              }}
            >
              <X size={18} />
              Cancel
            </button>
          </>
        )}
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