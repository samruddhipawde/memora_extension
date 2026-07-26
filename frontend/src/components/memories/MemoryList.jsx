import "./MemoryList.css";

import { useEffect, useMemo, useState } from "react";

import { Search } from "lucide-react";

import MemoryCard from "./MemoryCard";

import {
  getAllMemories,
} from "../../services/memoryService";

const MemoryList = () => {

  const [memories, setMemories] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);

  const PER_PAGE = 6;

  useEffect(() => {

    loadMemories();

  }, []);

  const loadMemories = async () => {

    try {

      const data = await getAllMemories();

      setMemories(data);

    }

    catch(err){

      console.log(err);

    }

    setLoading(false);

  };

  const filtered = useMemo(()=>{

    return memories.filter(memory=>

      memory.title?.toLowerCase().includes(search.toLowerCase())

      ||

      memory.domain?.toLowerCase().includes(search.toLowerCase())

      ||

      memory.ai_summary?.toLowerCase().includes(search.toLowerCase())

    );

  },[memories,search]);

  const totalPages=Math.ceil(filtered.length/PER_PAGE);

  const current=filtered.slice(

    (page-1)*PER_PAGE,

    page*PER_PAGE

  );

  if(loading){

    return <h2 style={{color:"white"}}>Loading...</h2>

  }

  return(

<div className="memory-page">

<div className="memory-header">

<div>

<h1>

All Memories

</h1>

<p>

Manage everything you've saved.

</p>

</div>

<div className="memory-search">

<Search size={18}/>

<input

placeholder="Search..."

value={search}

onChange={(e)=>{

setSearch(e.target.value);

setPage(1);

}}

/>

</div>

</div>

<div className="memory-grid">

{

current.length===0 ?

<div className="memory-empty">

No Memories Found

</div>

:

current.map(memory=>(

<MemoryCard

key={memory.id}

memory={memory}

/>

))

}

</div>

<div className="pagination">

<button

disabled={page===1}

onClick={()=>setPage(page-1)}

>

Previous

</button>

<span>

Page {page} of {totalPages || 1}

</span>

<button

disabled={page===totalPages || totalPages===0}

onClick={()=>setPage(page+1)}

>

Next

</button>

</div>

</div>

);

};

export default MemoryList;