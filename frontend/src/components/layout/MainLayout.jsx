import "./MainLayout.css";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const MainLayout = ({ children }) => {

  return (

    <div className="layout">

      <Sidebar />

      <div className="layout-content">

        <Navbar />

        <main className="page-content">

          {children}

        </main>

      </div>

    </div>

  );

};

export default MainLayout;