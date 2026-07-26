import "./Sidebar.css";
import Logo from "../../assets/logo/memora-logo.png";

import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

import {
  LayoutDashboard,
  Brain,
  FolderKanban,
  Sparkles,
  User,
  Settings,
  Heart,
  Clock,
  MessageCircle,
  Menu,
  Search,
} from "lucide-react";

const Sidebar = () => {

  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(false);

  const menu = [

    {
      title: "MAIN",
      items: [
        {
          icon: <LayoutDashboard size={20} />,
          label: "Dashboard",
          path: "/",
        },
      ],
    },

    {
      title: "MEMORIES",
      items: [
        {
          icon: <Brain size={20} />,
          label: "All Memories",
          path: "/memories",
        },
        {
          icon: <Search size={20} />,
          label: "Search",
          path: "/search",
        },
        {
          icon: <Heart size={20} />,
          label: "Favorites",
          path: "/favorites",
        },
        {
          icon: <Clock size={20} />,
          label: "Recent",
          path: "/recent",
        },
      ],
    },

    {
      title: "AI",
      items: [
        {
          icon: <Sparkles size={20} />,
          label: "AI Chat",
          path: "/chat",
        },
        {
          icon: <FolderKanban size={20} />,
          label: "Collections",
          path: "/collections",
        },
      ],
    },

    {
      title: "ACCOUNT",
      items: [
        {
          icon: <User size={20} />,
          label: "Profile",
          path: "/profile",
        },
        {
          icon: <Settings size={20} />,
          label: "Settings",
          path: "/settings",
        },
      ],
    },

  ];

  return (

    <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>

      <div className="sidebar-top">

        <div className="logo-section">

          <img
            src={Logo}
            alt="Memora"
            className="sidebar-logo"
          />

          {!collapsed && (

            <div>

              <h2>Memora</h2>

              <p>Your Second Brain</p>

            </div>

          )}

        </div>

        <button
          className="collapse-btn"
          onClick={() => setCollapsed(!collapsed)}
        >
          <Menu size={20} />
        </button>

      </div>

      {menu.map((group) => (

        <div
          className="menu-group"
          key={group.title}
        >

          {!collapsed && (
            <p className="menu-title">
              {group.title}
            </p>
          )}

          {group.items.map((item) => (

            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                isActive
                  ? "menu-item active"
                  : "menu-item"
              }
            >

              <div className="menu-icon">

                {item.icon}

              </div>

              {!collapsed && (

                <span>

                  {item.label}

                </span>

              )}

            </NavLink>

          ))}

        </div>

      ))}

      {!collapsed && (

        <div className="chat-card">

          <MessageCircle size={28} />

          <h3>

            AI Assistant

          </h3>

          <p>

            Search, summarize and recall your saved knowledge instantly.

          </p>

          <button
            onClick={() => navigate("/chat")}
          >

            Start Chat

          </button>

        </div>

      )}

    </aside>

  );

};

export default Sidebar;