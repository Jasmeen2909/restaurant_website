import React from "react";
import "./Footer.css";
import { Link } from 'react-router-dom';
import phone from "../assets/phone.png";
import mail from "../assets/mail.png";
import whatsapp from "../assets/whatsapp.png";
import facebook from "../assets/facebook.png";
import twitter from "../assets/twitter.png";
import youtube from "../assets/youtube.png";
import copyright from "../assets/copyright.png"

const Footer = () => {
  return (
    <div className="parent_class">
      <div className="footer_main">
        <div className="footer_left">
          <h1>EasyDine.</h1>
          <p>
            123 Flavor Street, Spice Garden, Gourmet City, Bangalore, Karnataka
            560001, India
          </p>
          <p>
            <img className="icon" src={phone} />
            +91 98765 43210
          </p>
          <p>
            <img className="icon" src={mail} />
            easydinecare@gmail.com
          </p>
        </div>
        <div className="footer_right">
          <div className="footer_links">
            <Link to="/" className="links">Home</Link>
            <Link to="/order" className="links">Order</Link>
            <Link to="/about" className="links">About</Link>
            <Link to="/contact" className="links">Contact</Link>
          </div>
          <div className="social_links">
            <a href="https://in.search.yahoo.com/search?fr=mcafee&type=E210IN714G0&p=whatsapp">
              <img src={whatsapp} />
            </a>
            <a href="#">
              <img src={facebook} />
            </a>
            <a href="#">
              <img src={twitter} />
            </a>
            <a href="#">
              <img src={youtube} />
            </a>
          </div>
        </div>
      </div>
      <div className="line"></div>
      <p className="footer_copy"><img className='icon' src={copyright}/>Copyright EasyDine. All rights reserved</p>
    </div>
  );
};

export default Footer;
