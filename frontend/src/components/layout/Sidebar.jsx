import "./Sidebar.css";

import { NavLink } from "react-router-dom";
import { useState } from "react";

import {
  LayoutDashboard,
  FolderKanban,
  BrainCircuit,
  MessageSquare,
  User,
  Settings,
  ChevronLeft,
} from "lucide-react";

import logo from "../../assets/logo/memora-logo.png";

const Sidebar = () => {

  const [collapsed, setCollapsed] = useState(false);

  const menu = [

    {
      name: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      path: "/dashboard",
    },

    {
      name: "Collections",
      icon: <FolderKanban size={20} />,
      path: "/collections",
    },

    {
      name: "AI Chat",
      icon: <BrainCircuit size={20} />,
      path: "/chat",
    },

    {
      name: "History",
      icon: <MessageSquare size={20} />,
      path: "/history",
    },

    {
      name: "Profile",
      icon: <User size={20} />,
      path: "/profile",
    },

    {
      name: "Settings",
      icon: <Settings size={20} />,
      path: "/settings",
    },

  ];

  return (

    <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>

      <div className="sidebar-top">

        <div className="logo-section">

          <img
            src={logo}
            alt="Memora"
            className="sidebar-logo"
          />

          {

            !collapsed && (

              <div>

                <h2>Memora</h2>

                <p>Your AI Memory</p>

              </div>

            )

          }

        </div>

        <button
          className="collapse-btn"
          onClick={() => setCollapsed(!collapsed)}
        >

          <ChevronLeft
            size={18}
            style={{
              transform: collapsed
                ? "rotate(180deg)"
                : "rotate(0deg)",
              transition: ".3s",
            }}
          />

        </button>

      </div>

      <div className="menu-group">

        {

          menu.map((item) => (

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

              {

                !collapsed && (

                  <span>{item.name}</span>

                )

              }

            </NavLink>

          ))

        }

      </div>

    </aside>

  );

};

export default Sidebar;