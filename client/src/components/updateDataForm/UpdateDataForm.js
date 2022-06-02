import React, { useEffect, useState } from "react";
import ToastMessage from "../toastMessage/ToastMessage";
import { sleep } from "../../utils/sleepPropmise";

const AddEmp = (props) => {
  const closeForm = () => {
    props.setUpdateForm(false);
  };

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

  const [empName, setEmpName] = useState("");
  const [empId, setEmpId] = useState("");
  const [empEmail, setEmpEmail] = useState("");
  const [empSalary, setEmpSalary] = useState("");
  const [empDesignation, setEmpDesignation] = useState("");
  const [empGender, setEmpGender] = useState("Male");
  const [empDOB, setEmpDOB] = useState("");
  const [empJOI, setEmpJOI] = useState("");

  const [showToast, setShowToast] = useState(false);

  const [updateEmpData, setUpdateEmpData] = useState("");

  useEffect(() => {
    console.log(props.updateId);
    fetch("http://localhost:3001/employees/" + props.updateId)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUpdateEmpData(data);
      });
  }, []);

  const updateForm = (e) => {
    e.preventDefault();

    var val1 = new Date(empDOB ? empDOB : updateEmpData.dob);
    var val2 = new Date(empJOI ? empJOI : updateEmpData.joiningDate);
    var diff = val2.getTime() - val1.getTime();
    if (Math.floor(diff / 31536000000) <= 18) {
      alert("Employee is not 18 years or older!");
      console.log("greater than 18");
      return false;
    }

    var currDate = Date.now();
    console.log(currDate);

    if (val2 > currDate) {
      alert("joining Date should not be greater than the curr Date");
      return false;
    }

    fetch("http://localhost:3001/employees/" + props.updateId, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        empId: updateEmpData.empId,
        empName: empName ? empName : updateEmpData.empName,
        gender: empGender ? empGender : updateEmpData.gender,
        email: empEmail ? empEmail : updateEmpData.email,
        empSalary: empSalary ? empSalary : updateEmpData.empSalary,
        designation: empDesignation
          ? empDesignation
          : updateEmpData.designation,
        dob: empDOB ? empDOB : updateEmpData.dob,
        joiningDate: empJOI ? empJOI : updateEmpData.joiningDate,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        // props.setUpdateForm(false);
        setShowToast(true);
        sleep(1500).then(() => {
          props.upDateData(data);
          props.setUpdateForm(false);
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="add-employee">
        <div className="emp-form-heading">
          <h3>
            Update Details{" "}
            <span className="cross-add-emp" onClick={closeForm}>
              &times;
            </span>
          </h3>
        </div>

        {updateEmpData ? (
          <form onSubmit={updateForm}>
            <div className="empName">
              <input
                type="text"
                placeholder="Employee name"
                defaultValue={updateEmpData.empName}
                required
                onChange={(e) => setEmpName(e.target.value)}
              />
            </div>
            <div className="empId">
              <input
                type="text"
                placeholder="Employee Id"
                defaultValue={updateEmpData.empId}
                required
                onChange={(e) => setEmpId(e.target.value)}
                style={{ pointerEvents: "none" }}
              />
            </div>
            <div className="empEmail">
              <input
                type="text"
                placeholder="Email Id"
                defaultValue={updateEmpData.email}
                required
                onChange={(e) => setEmpEmail(e.target.value)}
              />
            </div>
            <div className="gender-designation">
              <select
                id="gender"
                defaultValue={updateEmpData.gender}
                onChange={(e) => setEmpGender(e.target.value)}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Others">Others</option>
              </select>

              <select
                name="Designation"
                id="designation"
                defaultValue={updateEmpData.designation}
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
                type="text"
                placeholder="Salary"
                defaultValue={updateEmpData.empSalary}
                required
                onChange={(e) => setEmpSalary(e.target.value)}
              />
              <input
                type="date"
                onFocus={(e) => (e.currentTarget.type = "date")}
                onBlur={(e) => (e.currentTarget.type = "text")}
                defaultValue={updateEmpData.dob}
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
                defaultValue={updateEmpData.joiningDate}
                onChange={(e) => setEmpJOI(e.target.value)}
              />
            </div>

            <div className="add-emp-button">
              <button>Update</button>
            </div>
          </form>
        ) : (
          <h3>Loading</h3>
        )}
      </div>
      <div className="overlay" onClick={closeForm}></div>
      <ToastMessage
        showToast={showToast}
        setShowToast={setShowToast}
        message="details Updated Successfully"
      />
    </>
  );
};

export default AddEmp;
