import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGithub,
  faLinkedin,
  faTwitter,
  faInstagram
} from '@fortawesome/free-brands-svg-icons';

function Footer() {
  return (
    <footer className="footer">
  <div className="footer-content">
    <span>© 2025 SpeechToText by Ashutosh Yadav . All rights reserved.</span>
    <div className="social-icons">
      <a href="https://github.com/iashutoshyadav"><FontAwesomeIcon icon={faGithub} /></a>
      <a href="http://linkedin.com/in/ashutosh-yadav-401208290"><FontAwesomeIcon icon={faLinkedin} /></a>
      <a href="https://x.com/ashutos88404502"><FontAwesomeIcon icon={faTwitter} /></a>
      <a href="https://www.instagram.com/the_vahu?igsh=N2w4NWc1dmFiMWVw&utm_source=qr"><FontAwesomeIcon icon={faInstagram} /></a>
    </div>
  </div>
</footer>

    
  );
}

export default Footer;
