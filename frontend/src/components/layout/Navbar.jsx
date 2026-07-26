import "./Navbar.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Menu,
  Search,
  Bell,
  Moon,
  Plus,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";

import SaveMemoryModal from "../dashboard/SaveMemoryModal";

const Navbar = () => {

  const { user } = useAuth();
const navigate = useNavigate();

const [search,setSearch]=useState("");
  const [openSave, setOpenSave] = useState(false);

  return (

    <>

      <header className="navbar">

        <div className="navbar-left">

          <button className="nav-icon">
            <Menu size={20}/>
          </button>

          <div className="search-box">

            <Search size={18}/>

            <input
  type="text"
  placeholder="Search memories..."
  value={search}
  onChange={(e)=>setSearch(e.target.value)}
  onKeyDown={(e)=>{

    if(e.key==="Enter"){

      navigate(`/search?q=${search}`);

    }

  }}
/>

          </div>

        </div>

        <div className="navbar-right">

          <button
            className="save-btn"
            onClick={() => setOpenSave(true)}
          >

            <Plus size={18}/>

            Save Memory

          </button>

          <button className="nav-icon">
            <Bell size={20}/>
          </button>

          <button className="nav-icon">
            <Moon size={20}/>
          </button>

          <div className="profile-box">

            <div className="avatar">
              {user?.full_name?.charAt(0) || "S"}
            </div>

            <div>

              <h4>
                {user?.full_name || "Samruddhi"}
              </h4>

              <span>
                {user?.email}
              </span>

            </div>

          </div>

        </div>

      </header>

      <SaveMemoryModal
        open={openSave}
        onClose={() => setOpenSave(false)}
        onSaved={() => window.location.reload()}
      />

    </>

  );

};

export default Navbar;