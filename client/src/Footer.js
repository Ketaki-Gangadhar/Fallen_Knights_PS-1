import React from 'react'
import './Footer_style.css'

const Footer = () => {
    return (
      



<footer class="footer">

    <div class="col">
        <h4>Contact</h4>
        <p><strong>Address : </strong>NIT Raipur, GE Road, Raipur 492010</p> 
        <p><strong>Phone : </strong>+91 5647387487, +91 4657382722</p>
        <p><strong>Hours : </strong>10.00 - 18.00,  Mon - Sat</p>
        <div class="follow">
            <h4>Follow us : </h4>
            <div class="icon">
            <a href=""><i class="fab fa-facebook-f"></i></a>
                <a href=""><i class="fab fa-twitter"></i></a>
                <a href=""><i class="fab fa-instagram"></i></a>
                <a href=""><i class="fab fa-linkedin"></i></a>
                <a href=""><i class="fab fa-youtube"></i></a>
           </div>
        </div>
    </div>

    <div class="col">
        <h4>About</h4>
        <a href="#">About us</a>
        <a href="#">Privacy Policy</a>
        <a href="#">Terms and Conditions</a>
        <a href="#">Contact us</a>
    </div>

    <div class="col">
        <h4>My Account</h4>
        <a href="#">Home</a>
        <a href="#">Help</a>
    </div>

</footer>

    )
}
export default Footer;