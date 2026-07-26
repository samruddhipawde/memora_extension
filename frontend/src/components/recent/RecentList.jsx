import "./RecentList.css";
import { useEffect, useState } from "react";

import MemoryCard from "../memories/MemoryCard";
import { getRecentMemories } from "../../services/memoryService";

const RecentList = () => {

    const [memories,setMemories]=useState([]);

    const [loading,setLoading]=useState(true);

    useEffect(()=>{

        loadRecent();

    },[]);

    const loadRecent=async()=>{

        try{

            const data=await getRecentMemories();

            setMemories(data);

        }

        catch(err){

            console.log(err);

        }

        finally{

            setLoading(false);

        }

    };

    if(loading){

        return <h2>Loading...</h2>;

    }

    return(

        <div className="recent-page">

            <h1>🕒 Recent Memories</h1>

            <p>
                Your latest saved webpages.
            </p>

            <div className="recent-grid">

                {

                    memories.length===0 ?

                    (

                        <div className="empty">

                            <h2>No Recent Memories</h2>

                            <p>
                                Save webpages using your extension.
                            </p>

                        </div>

                    )

                    :

                    (

                        memories.map(memory=>(

                            <MemoryCard

                                key={memory.id}

                                memory={memory}

                            />

                        ))

                    )

                }

            </div>

        </div>

    );

};

export default RecentList;