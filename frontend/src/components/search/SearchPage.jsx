import "./SearchPage.css";

import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Search as SearchIcon } from "lucide-react";

import { searchMemories } from "../../services/memoryService";

const SearchPage = () => {

  const location = useLocation();

  const params = new URLSearchParams(location.search);

  const initialQuery = params.get("q") || "";

  const [query, setQuery] = useState(initialQuery);

  const [results, setResults] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {

    if(initialQuery){

      handleSearch(initialQuery);

    }

  },[]);

  const handleSearch = async(text)=>{

    setQuery(text);

    if(!text.trim()){

      setResults([]);

      return;

    }

    try{

      setLoading(true);

      const data = await searchMemories(text);

      setResults(data);

    }

    catch(err){

      console.log(err);

    }

    finally{

      setLoading(false);

    }

  };

  return(

<div className="search-page">

<h1>

Semantic Search

</h1>

<div className="search-box">

<SearchIcon size={20}/>

<input

value={query}

placeholder="Search anything..."

onChange={(e)=>handleSearch(e.target.value)}

/>

</div>

{

loading &&

<p className="loading">

Searching...

</p>

}

<div className="search-results">

{

results.length===0 && !loading ?

<p className="loading">

No memories found.

</p>

:

results.map((item,index)=>(

<div
className="search-result-card"
key={index}
>

<h3>

{item.title}

</h3>

<p>

{item.content}

</p>

<div className="distance">

Similarity Score :

{(1-item.distance).toFixed(2)}

</div>

</div>

))

}

</div>

</div>

);

};

export default SearchPage;