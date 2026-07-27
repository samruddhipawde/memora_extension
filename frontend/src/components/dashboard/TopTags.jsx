import {useEffect,useState} from "react";

import {
getTopTags
}
from "../../services/memoryService";

import "./TopTags.css";



const TopTags=()=>{


const [tags,setTags]=useState([]);




useEffect(()=>{


getTopTags()

.then(data=>{

setTags(data);

});


},[]);




return(

<div className="top-tags">


<h2>
Top Tags
</h2>



<div className="tags-container">


{
tags.map((item)=>(


<div 
className="tag-card"
key={item.tag}
>


<span>
#{item.tag}
</span>


<b>
{item.count}
</b>


</div>


))

}


</div>


</div>

);


};


export default TopTags;