import React from "react";
import "./Homepage.css";
import styles from "./Homepage.module.css";

const CardsEMS = () => {
  return (
    <div className={styles.main}>
      <div className={styles['card-container']}>
        <div className={styles.card}>
          <div className={styles.cardhead}>Ernst & Young</div>
          <div className={styles.cardvalue}>
            Ernst & Young Global Limited, is a multinational network with
            headquarters in London, England. EY operates as a network of member
            firms which are structured as separate legal entities in a
            partnership, which has 312,250 employees in over 700 offices in more
            than 150 countries around the world.
          </div>
        </div>

        <div className={`${styles.card} ${styles.left}`}>
          <div className={styles.cardhead}>Employee Management System</div>
          <div className={styles.cardvalue}>
            An employee management system provides managers with insights into
            their workforce, and helps them to better plan and manage work hours
            to easily control labor costs and increase productivity.
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.cardhead}>Capstone Project</div>
          <div className={styles.cardvalue}>
            Creating a web application where user can add employee information
            using CRUD(Create, Read, Update, Delete) operations.
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardsEMS;
