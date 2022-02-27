import React from 'react'
import './Navbar_style.css'
import about from './About.js'


const Navbar = () => {
    return (
       <section id="header">
         <li className="logo">Voice Analyser</li>
        <div>
           <ul id="navbar">
             <li>Home</li>
             <li>About Us</li>
            
             <li>Contact Us</li>
           </ul>
         </div>
        </section>
    )
}
export default Navbar;