import "./SettingsPage.css";

import { useEffect, useState } from "react";
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

import {
  getSettings,
  updateSettings,
  deleteAccount,
} from "../../services/userService";

import ManageMemoriesModal from "./ManageMemoriesModal";
import PrivacyModal from "./PrivacyModal";

const SettingsPage = () => {

  const navigate = useNavigate();

  const { logout } = useAuth();

  const [openManage, setOpenManage] = useState(false);
  const [openPrivacy, setOpenPrivacy] = useState(false);

  const [settings, setSettings] = useState({
    dark_mode: true,
    notifications: true,
    auto_save: true,
  });

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const data = await getSettings();
      setSettings(data);
    } catch (err) {
      console.log(err);
    }
  };

  const changeSetting = async (key) => {

    const updated = {
      ...settings,
      [key]: !settings[key],
    };

    setSettings(updated);

    try {
      await updateSettings(updated);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteAccount = async () => {

    const confirmDelete = window.prompt(
      "Type DELETE to permanently delete your account."
    );

    if (confirmDelete !== "DELETE") return;

    try {

      await deleteAccount();

      logout();

      navigate("/login");

    } catch (err) {

      console.log(err);

      alert("Unable to delete account.");

    }

  };

  const handleLogout = () => {

    logout();

    navigate("/login");

  };

  return (

    <>

      <div className="settings-page">

        <h1>Settings</h1>

        <p>Manage your Memora experience.</p>

        <div className="settings-list">

          {/* Dark Theme */}

          <div className="setting-card">

            <div>

              <Moon size={22} />

              <span>Dark Theme</span>

            </div>

            <input
              type="checkbox"
              checked={settings.dark_mode}
              onChange={() => changeSetting("dark_mode")}
            />

          </div>

          {/* Notifications */}

          <div className="setting-card">

            <div>

              <Bell size={22} />

              <span>Notifications</span>

            </div>

            <input
              type="checkbox"
              checked={settings.notifications}
              onChange={() => changeSetting("notifications")}
            />

          </div>

          {/* Auto Save */}

          <div className="setting-card">

            <div>

              <Database size={22} />

              <span>Auto Save Memories</span>

            </div>

            <input
              type="checkbox"
              checked={settings.auto_save}
              onChange={() => changeSetting("auto_save")}
            />

          </div>

          {/* Privacy */}

          <div
            className="setting-card"
            onClick={() => setOpenPrivacy(true)}
          >

            <div>

              <Shield size={22} />

              <span>Privacy & Security</span>

            </div>

            <ChevronRight size={20} />

          </div>

          {/* Manage Memories */}

          <div
            className="setting-card"
            onClick={() => setOpenManage(true)}
          >

            <div>

              <Database size={22} />

              <span>Manage Memories</span>

            </div>

            <ChevronRight size={20} />

          </div>

          {/* Delete Account */}

          <div
            className="setting-card danger"
            onClick={handleDeleteAccount}
          >

            <div>

              <Trash2 size={22} />

              <span>Delete Account</span>

            </div>

            <ChevronRight size={20} />

          </div>

          {/* Logout */}

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

      <ManageMemoriesModal
        open={openManage}
        onClose={() => setOpenManage(false)}
      />

      <PrivacyModal
        open={openPrivacy}
        onClose={() => setOpenPrivacy(false)}
      />

    </>

  );

};

export default SettingsPage;