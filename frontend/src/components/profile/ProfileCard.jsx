import "./ProfileCard.css";

import { useEffect,useState } from "react";

import {

User,

Mail,

Shield,

} from "lucide-react";

import { getCurrentUser } from "../../services/userService";

const ProfileCard=()=>{

const [user,setUser]=useState(null);

useEffect(()=>{

load();

},[]);

const load=async()=>{

try{

const data=await getCurrentUser();

setUser(data);

}

catch(err){

console.log(err);

}

};

if(!user){

return <h2>Loading...</h2>;

}

return(

<div className="profile-card">

<div className="avatar">

<User size={60}/>

</div>

<h2>

{user.full_name}

</h2>

<p>

<Mail size={18}/>

{user.email}

</p>

<div className="profile-info">

<div>

<Shield/>

Authenticated User

</div>

</div>

</div>

);

};

export default ProfileCard;