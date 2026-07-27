import "./MainLayout.css";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const MainLayout = ({ children }) => {

  return (

    <div className="main-layout">

      <Sidebar />

      <div className="main-content">

        <Navbar />

        <div className="main-page">

          {children}

        </div>

      </div>

    </div>

  );

};

export default MainLayout;