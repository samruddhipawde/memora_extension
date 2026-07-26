import "./SettingsPage.css";

import {
  Moon,
  Bell,
  Shield,
  Database,
  Trash2,
  LogOut,
  ChevronRight,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const SettingsPage = () => {

  const navigate = useNavigate();

  const { logout } = useAuth();

  const handleLogout = () => {

    logout();

    navigate("/login");

  };

  return (

    <div className="settings-page">

      <h1>Settings</h1>

      <p>Manage your Memora experience.</p>

      <div className="settings-list">

        <div className="setting-card">

          <div>

            <Moon size={22} />

            <span>Dark Theme</span>

          </div>

          <input type="checkbox" defaultChecked />

        </div>

        <div className="setting-card">

          <div>

            <Bell size={22} />

            <span>Notifications</span>

          </div>

          <input type="checkbox" defaultChecked />

        </div>

        <div className="setting-card">

          <div>

            <Shield size={22} />

            <span>Privacy & Security</span>

          </div>

          <ChevronRight size={20} />

        </div>

        <div className="setting-card">

          <div>

            <Database size={22} />

            <span>Manage Memories</span>

          </div>

          <ChevronRight size={20} />

        </div>

        <div className="setting-card danger">

          <div>

            <Trash2 size={22} />

            <span>Delete Account</span>

          </div>

          <ChevronRight size={20} />

        </div>

        <div

          className="setting-card logout"

          onClick={handleLogout}

        >

          <div>

            <LogOut size={22} />

            <span>Logout</span>

          </div>

          <ChevronRight size={20} />

        </div>

      </div>

    </div>

  );

};

export default SettingsPage;