import "./TopTags.css";

import { useEffect, useState } from "react";

import { Hash } from "lucide-react";

import { getTopTags } from "../../services/memoryService";

const TopTags = () => {

  const [tags,setTags]=useState([]);

  useEffect(()=>{

    loadTags();

  },[]);

  const loadTags = async()=>{

    try{

      const data = await getTopTags();

      setTags(Array.isArray(data) ? data : []);

    }

    catch(err){

      console.log(err);

      setTags([]);

    }

  };

  return(

    <div className="top-tags">

      <div className="top-card-header">

        <div className="top-icon">

          <Hash size={20}/>

        </div>

        <div>

          <h3>

            Top Tags

          </h3>

          <span>

            Frequently Used

          </span>

        </div>

      </div>

      <div className="tags-container">

        {

          tags.length===0 ?

          <div className="empty">

            No tags available.

          </div>

          :

          tags

          .slice(0,8)

          .map((item,index)=>(

            <div

              className="tag-card"

              key={item.tag || index}

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