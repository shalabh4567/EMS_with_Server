import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Dashboard.module.css";
import { AdminContext } from "../../context/AdminContext";
import AddEmp from "../../components/addEmpFrom/AddEmp";
import logo from "../../DashboardImages/EyLogoD.png";
import "./Dashboard.css";

const Sidebar = (props) => {
  const history = useNavigate();

  const { state, dispatch } = useContext(AdminContext);

  const logout = () => {
    localStorage.clear();
    dispatch({ type: "ADMIN", payload: null });
    history("/login");
  };

  return (
    <div className={`${styles.sidebar} hello`}>
      <div className={styles["side-logo"]}>
        <img src={logo} />
        <span className={styles["side-logo-name"]}>Ernst & Young</span>
      </div>
      <ul className={styles.sidenav}>
        <li className={styles.active}>
          <a href="#">
            <i className={"bx bx-grid-alt"}></i>
            <span className={styles[`link-name`]}>Dashboard</span>
          </a>
        </li>
        <li onClick={() => props.showForm(true)}>
          <a href="#">
            <i className={"bx bxs-group"}></i>
            <span className={styles["link-name"]}>Add Employee</span>
          </a>
        </li>
        <li>
          <Link to="/empdata">
            <i className={"bx bx-desktop"}></i>
            <span className={styles["link-name"]}>Display All</span>
          </Link>
        </li>
        <li>
          <a href="#">
            <i className={"bx bx-pie-chart-alt-2"}></i>
            <span className={styles["link-name"]}>Analytics</span>
          </a>
        </li>
        <li>
          <a href="#">
            <i className={"bx bx-user"}></i>
            <span className={styles["link-name"]}>Team</span>
          </a>
        </li>
        <li>
          <a href="#">
            <i className={"bx bx-message"}></i>
            <span className={styles["link-name"]}>Messages</span>
          </a>
        </li>
        <li>
          <a href="#">
            <i className={"bx bx-cog"}></i>
            <span className={styles["link-name"]}>Setting</span>
          </a>
        </li>
        <li onClick={logout}>
          <Link to="/login">
            <i className={"bx bx-log-out"}></i>
            <span className={styles["link-name"]}>Log Out</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
