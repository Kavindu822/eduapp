// "use client";
// import React from "react";
// import styles from "./footer.module.css";
// import {
//   FaFacebookF,
//   FaTwitter,
//   FaInstagram,
//   FaLinkedinIn,
//   FaYoutube,
// } from "react-icons/fa";

// const Footer = () => {
//   return (
//     <footer className={styles.footer}>
//       <div className={styles.topSection}>
//         <h2 className={styles.title}>iGuide</h2>
//         <p className={styles.description}>
//           Empowering the next generation of legal minds through quality academic
//           resources.
//         </p>
//         <div className={styles.socials}>
//           <a
//             href="https://facebook.com"
//             target="_blank"
//             rel="noopener noreferrer"
//             aria-label="Facebook"
//           >
//             <FaFacebookF />
//           </a>
//           <a
//             href="https://twitter.com"
//             target="_blank"
//             rel="noopener noreferrer"
//             aria-label="Twitter"
//           >
//             <FaTwitter />
//           </a>
//           <a
//             href="https://instagram.com"
//             target="_blank"
//             rel="noopener noreferrer"
//             aria-label="Instagram"
//           >
//             <FaInstagram />
//           </a>
//           <a
//             href="https://linkedin.com"
//             target="_blank"
//             rel="noopener noreferrer"
//             aria-label="LinkedIn"
//           >
//             <FaLinkedinIn />
//           </a>
//           <a
//             href="https://youtube.com"
//             target="_blank"
//             rel="noopener noreferrer"
//             aria-label="YouTube"
//           >
//             <FaYoutube />
//           </a>
//         </div>
//       </div>
//       <div className={styles.bottomSection}>
//         <p>&copy; {new Date().getFullYear()} iGuide. All rights reserved.</p>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

"use client";
import React from "react";
import styles from "./footer.module.css";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.topSection}>
          <h2 className={styles.title}>iGuide</h2>
          <p className={styles.description}>
            Empowering the next generation of legal minds through quality
            academic resources.
          </p>
          <div className={styles.socials}>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
            >
              <FaTwitter />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
            >
              <FaYoutube />
            </a>
          </div>
        </div>
        <div className={styles.bottomSection}>
          <p>&copy; {new Date().getFullYear()} iGuide. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
