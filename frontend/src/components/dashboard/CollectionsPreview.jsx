import "./CollectionsPreview.css";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { FolderKanban, ArrowRight } from "lucide-react";

import { getCollections } from "../../services/collectionService";

const CollectionsPreview = () => {

  const navigate = useNavigate();

  const [collections,setCollections]=useState([]);

  useEffect(()=>{

    loadCollections();

    const reload=()=>loadCollections();

    window.addEventListener("memoryUpdated",reload);

    return ()=>{

      window.removeEventListener("memoryUpdated",reload);

    };

  },[]);

  const loadCollections=async()=>{

    try{

      const data=await getCollections();

      setCollections(Array.isArray(data)?data:[]);

    }

    catch(err){

      console.log(err);

    }

  };

  return(

<div className="collections-preview">

<div className="preview-header">

<div>

<h2>

<FolderKanban size={24}/>

Collections

</h2>

<p>

Organize your memories

</p>

</div>

<button

onClick={()=>navigate("/collections")}

>

View All

<ArrowRight size={18}/>

</button>

</div>

<div className="preview-list">

{

collections.length===0?

<p className="empty">

No Collections Yet

</p>

:

collections.slice(0,4).map(item=>(

<div

key={item.id}

className="preview-card"

onClick={()=>navigate(`/collections/${item.id}`)}

>

<h3>

{item.name}

</h3>

<span>

{item.memory_count||0} Memories

</span>

</div>

))

}

</div>

</div>

);

};

export default CollectionsPreview;