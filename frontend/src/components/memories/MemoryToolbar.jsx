import "./MemoryToolbar.css";

import {
  Search,
  Filter,
  Plus,
  LayoutGrid,
  List,
} from "lucide-react";

const MemoryToolbar = ({
  search,
  setSearch,
  grid,
  setGrid,
}) => {

  return (

    <div className="memory-toolbar">

      <div className="memory-search">

        <Search size={18}/>

        <input
          placeholder="Search memories..."
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
        />

      </div>

      <div className="toolbar-right">

        <button>

          <Filter size={18}/>

          Filter

        </button>

        <button
          className={grid ? "active" : ""}
          onClick={()=>setGrid(true)}
        >

          <LayoutGrid size={18}/>

        </button>

        <button
          className={!grid ? "active" : ""}
          onClick={()=>setGrid(false)}
        >

          <List size={18}/>

        </button>

        <button className="add-btn">

          <Plus size={18}/>

          Save Memory

        </button>

      </div>

    </div>

  );

};

export default MemoryToolbar;