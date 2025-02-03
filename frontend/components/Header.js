import React from "react";
import styles from "../styles/components/Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <a href="#home">Home</a>
          </li>
          <li className={styles.navItem}>
            <a href="#about">About</a>
          </li>

          <li className={styles.appName}>HelpHub</li>

          <li className={styles.navItem}>
            <a href="#services">Services</a>
          </li>
          <li className={styles.navItem}>
            <a href="#contact">Contact</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
