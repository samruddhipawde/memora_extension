import "./HeroBanner.css";

import logo from "../../../assets/logo/memora-logo.png";

const HeroBanner=()=>{

const hour=new Date().getHours();

let greeting="Hello";

if(hour<12){

greeting="Good Morning";

}

else if(hour<18){

greeting="Good Afternoon";

}

else{

greeting="Good Evening";

}

return(

<div className="hero-banner">

<div>

<h1>

{greeting} 👋

</h1>

<p>

Welcome back to Memora.

Organize memories, search instantly, and let AI remember everything for you.

</p>

</div>

<img

src={logo}

alt="Memora"

/>

</div>

);

};

export default HeroBanner;