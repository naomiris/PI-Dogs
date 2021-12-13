import React from "react";
import { Link } from 'react-router-dom';


export default function LandingPage(){
    return(
        <div>
            <h1> Doggy App </h1>
            <Link to = '/home' > 
            <button>Welcome</button>
            </Link>
        </div>
    )
}
