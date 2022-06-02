import React from "react";
import { Link } from "react-router-dom";
import styles from "./Dashboard.module.css";
import "./Dashboard.css";

function Main(props) {
  const totalDesignation = [
    "SDE I",
    "SDE II",
    "SDE III",
    "Ass. Analyst I",
    "Ass. Analyst II",
    "Sr. Analyst",
    "Ass. Manager",
    "Sr. Manager",
    "Backend Dev.",
    "Forntend Dev",
    "FullStack Dev",
  ];

  const empPresent = props.employee && props.employee.length - 2;
  const empAbsent = props.employee && props.employee.length - empPresent;

  return (
    <section className={styles.main}>
      <div className={styles.displays}>
        <div className={styles.widgets}>
          <div className={styles.boxes}>
            <div className={styles.leftBox}>
              <div className={styles.boxValue}>Total Employee</div>
              <div className={styles.numbers}>
                {props.employee && props.employee.length}
              </div>
            </div>
            <i className={`bx bxs-group ${styles.cart}`}></i>
          </div>

          <div className={styles.boxes}>
            <div className={styles.leftBox}>
              <div className={styles.boxValue}>Total Designation</div>
              <div className={styles.numbers}>{totalDesignation.length}</div>
            </div>
            <i
              className={`bx bxs-briefcase ${styles.cart} ${styles.second}`}
            ></i>
          </div>

          <div className={styles.boxes}>
            <div className={styles.leftBox}>
              <div className={styles.boxValue}>Total Emp Present</div>
              <div className={styles.numbers}>{empPresent}</div>
            </div>
            <i className={`bx bx-body ${styles.cart} ${styles.third}`}></i>
          </div>

          <div className={styles.boxes}>
            <div className={styles.leftBox}>
              <div className={styles.boxValue}>Total Absent</div>
              <div className={styles.numbers}>{empAbsent}</div>
            </div>
            <i
              className={`bx bxs-error-alt ${styles.cart} ${styles.fourth}`}
            ></i>
          </div>
        </div>
      </div>

      <div className={styles.empbox}>
        <div className={`${styles.empvalue} ${styles.box}`}>
          <div className={styles.title}>Employee Details</div>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Emp Id</th>
                <th scope="col">Emp Name</th>
                <th scope="col">Gender</th>
                <th scope="col">Designation</th>
                <th scope="col">Salary</th>
                <th scope="col">Email</th>
                <th scope="col">DOB</th>
                <th scope="col">Joining date</th>
              </tr>
            </thead>
            <tbody>
              {props.empFound ? (
                <tr>
                  <th scope="row">{props.empFound.empId}</th>
                  <td>{props.empFound.empName}</td>
                  <td>{props.empFound.gender}</td>
                  <td>{props.empFound.designation}</td>
                  <td>{props.empFound.empSalary}</td>
                  <td>{props.empFound.email}</td>
                  <td>{props.empFound.dob}</td>
                  <td>{props.empFound.joiningDate}</td>
                </tr>
              ) : (
                props.employee &&
                props.employee.map((emp, index) => {
                  if (index > 4) {
                    return;
                  }
                  return (
                    <tr key={index}>
                      <th scope="row">{emp.empId}</th>
                      <td>{emp.empName}</td>
                      <td>{emp.gender}</td>
                      <td>{emp.designation}</td>
                      <td>{emp.empSalary}</td>
                      <td>{emp.email}</td>
                      <td>{emp.dob}</td>
                      <td>{emp.joiningDate}</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
          <div className={styles.button}>
            <Link to="/empdata">See All</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
export default Main;
