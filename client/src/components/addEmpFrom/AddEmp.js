import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ToastMessage from "../toastMessage/ToastMessage";
import { sleep } from "../../utils/sleepPropmise";
import "./AddEmp.css";

const AddEmp = (props) => {
  // props.setFormFalse(false)

  const history = useNavigate();
  const [showToast, setShowToast] = useState(false);

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

  const closeForm = () => {
    props.setFormFalse(false);
  };

  const [empName, setEmpName] = useState("");
  let [empId, setEmpId] = useState("");
  const [empEmail, setEmpEmail] = useState("");
  const [empSalary, setEmpSalary] = useState("");
  const [empDesignation, setEmpDesignation] = useState("SDE I");
  const [empGender, setEmpGender] = useState("Male");
  const [empDOB, setEmpDOB] = useState("");
  const [empJOI, setEmpJOI] = useState("");

  const addEmpData = (e) => {
    e.preventDefault();

    var val1 = new Date(empDOB);
    var val2 = new Date(empJOI);
    var diff = val2.getTime() - val1.getTime();
    if (Math.floor(diff / 31536000000) <= 18) {
      alert("Employee is not 18 years or older!");
      return false;
    }

    var currDate = Date.now();

    if (val2 > currDate) {
      alert("joining Date should not be greater than the curr Date");
      return false;
    }

    var len = props.employee.length;

    if (len > 1) {
      empId = parseInt(props.employee[len - 1].empId) + 1;
    } else {
      localStorage.setItem("latestEmpId", "10000");
      empId = parseInt(localStorage.getItem("latestEmpId")) + len + 1;
      localStorage.setItem("latestEmpId", empId);
    }

    fetch("http://localhost:3001/employees", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        empId: empId,
        empName: empName,
        gender: empGender,
        email: empEmail,
        empSalary: empSalary,
        designation: empDesignation,
        dob: empDOB,
        joiningDate: empJOI,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setShowToast(true);
        sleep(1500).then(() => {
          props.setFormFalse(false);
          props.setEmployee([...props.employee, data]);
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <ToastMessage
        showToast={showToast}
        setShowToast={setShowToast}
        message={"Details added successfully"}
      />
      <div className="add-employee">
        <div className="emp-form-heading">
          <h3>
            Employee Details{" "}
            <span className="cross-add-emp" onClick={closeForm}>
              &times;
            </span>
          </h3>
        </div>
        <form onSubmit={addEmpData}>
          <div className="empName">
            <input
              type="text"
              placeholder="Employee name"
              value={empName}
              required
              onChange={(e) => setEmpName(e.target.value)}
            />
          </div>
          <div className="empEmail">
            <input
              type="text"
              placeholder="Email Id"
              value={empEmail}
              required
              onChange={(e) => setEmpEmail(e.target.value)}
            />
          </div>
          <div className="gender-designation">
            <select
              name="gender"
              id="gender"
              onChange={(e) => {
                setEmpGender(e.target.value);
              }}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Others">Others</option>
            </select>
            <select
              name="Designation"
              id="designation"
              onChange={(e) => {
                setEmpDesignation(e.target.value);
              }}
            >
              {totalDesignation.map((des, index) => (
                <option key={index} value={des}>
                  {des}
                </option>
              ))}
            </select>
          </div>
          <div className="salary-dob">
            <input
              type="number"
              placeholder="Salary"
              value={empSalary}
              required
              onChange={(e) => setEmpSalary(e.target.value)}
            />
            <input
              type="date"
              onFocus={(e) => (e.currentTarget.type = "date")}
              onBlur={(e) => (e.currentTarget.type = "text")}
              value={empDOB}
              required
              onChange={(e) => setEmpDOB(e.target.value)}
            />
          </div>
          <div className="joining-date">
            <input
              type="text"
              onFocus={(e) => (e.currentTarget.type = "date")}
              onBlur={(e) => (e.currentTarget.type = "text")}
              placeholder="joining date(dd/mm/yyyy)"
              value={empJOI}
              onChange={(e) => setEmpJOI(e.target.value)}
            />
          </div>

          <div className="add-emp-button">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
      <div className="overlay" onClick={closeForm}></div>
    </>
  );
};

export default AddEmp;
