import React from "react";
import Navbar from './Navbar'
import './About_style.css';
import image3 from './Image3.jpg'
function About() {
  return (

    <div class="section">
    <div>
        <Navbar/>
        </div>

    <div class="container">
        <div class="content-section">
            <div class="title">
                <h1 id="heading">About Us</h1>
            </div>
            <div class="content">
                <h3 id="heading">We are team <span id="heading" >Fallen knights</span></h3>
                <p>We are prefinal year students from National Institute of Technology Raipur pursuing Btech
                    in Information Technology. This Project is out official submission
                    for CodeUtsava'22 Hackathon.
                </p>

                  <div>
                  <img src={image3} alt="image1" style={{width:"965px", height:"589px"}} />
                   </div>
               





                <div class="button">
                    <a href="">Contact Us</a>
                </div>
                
            </div>
            <div class="social">
                <a href=""><i class="fab fa-facebook-f"></i></a>
                <a href=""><i class="fab fa-twitter"></i></a>
                <a href=""><i class="fab fa-instagram"></i></a>
                <a href=""><i class="fab fa-linkedin"></i></a>
                <a href=""><i class="fab fa-youtube"></i></a>
            </div>
        </div>
     

    </div>
</div>



  );
}

export default About;
