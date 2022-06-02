import React, { useContext, useState } from "react";
import { AdminContext } from "../../context/AdminContext";
import styles from "./Dashboard.module.css";
import logo from "../../DashboardImages/ProfileImg.jpg";
import ToastMessage from "../../components/toastMessage/ToastMessage";
import { sleep } from "../sleepPropmise";

// import "./Dashboard.css";

function Nav(props) {
  const { state, dispatch } = useContext(AdminContext);

  const [searchEmp, setSearchEmp] = useState("");
  const [showToast, setShowToast] = useState(false);

  const cBtn = () => {
    let sidebar = document.querySelector(".hello");
    let sidebarBtn = document.querySelector(".sidebarBtn");
    if (sidebar.classList.contains("active")) {
      sidebar.classList.remove("active");
      sidebarBtn.classList.replace("bx-menu-alt-right", "bx-menu");
    } else {
      sidebar.classList.add("active");
      sidebarBtn.classList.replace("bx-menu", "bx-menu-alt-right");
    }
  };

  const searchEmployee = () => {
    const empFound = props.employee.find(
      (emp) => emp.empId === parseInt(searchEmp)
    );

    if (searchEmp.length == 0) {
      props.setEmpFound("");
      return;
    }

    if (empFound) {
      props.setEmpFound(empFound);
    } else {
      setShowToast(true);
      props.setEmpFound("");
    }
  };

  return (
    <section className={`${styles.main} ${styles.maN}`}>
      <ToastMessage
        showToast={showToast}
        setShowToast={setShowToast}
        message={"No Employee found"}
      />
      <nav>
        <div className={styles.leftnav}>
          <i className={`bx bx-menu sidebarBtn`} onClick={cBtn}></i>
          <span className={styles.dashboard}>Dashboard</span>
        </div>
        <div className={styles.searchbar}>
          <input
            type={styles.text}
            placeholder={"Search..."}
            value={searchEmp}
            onBlur={searchEmployee}
            onChange={(e) => setSearchEmp(e.target.value)}
          />
          <i className={"bx bx-search"} onClick={searchEmployee}></i>
        </div>
        <div className={styles.rightnav}>
          <img src={logo} />
          <span className={styles.admin_name}>{state.name}</span>
          <i className={"bx bx-chevron-down"}></i>
        </div>
      </nav>
    </section>
  );
}
export default Nav;
