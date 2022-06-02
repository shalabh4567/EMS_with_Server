import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import AddEmp from "../addEmpFrom/AddEmp";
import UpdateDataForm from "../updateDataForm/UpdateDataForm";
import "./EmpData.css";
import DeleteData from "../DeleteDataForm/DeleteData";
import ToastMessage from "../toastMessage/ToastMessage";

const EmpData = () => {
  const [employee, setEmployee] = useState(null);

  const [showAddform, setShowAddForm] = useState(false);

  const [showUpdateForm, setUpdateForm] = useState(false);
  const [updateId, setUpdateId] = useState("");

  const [showDeleteForm, setDeleteForm] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [deleteIndex, setDeleteIndex] = useState(null);

  const [searchEmp, setSearchEmp] = useState("");
  const [empFound, setEmpFound] = useState("");

  const [showToast, setShowToast] = useState(false);

  const checkAllEmp = useRef(null);

  useEffect(() => {
    fetch("http://localhost:3001/employees")
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setEmployee(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const upDateData = (obj) => {
    fetch("http://localhost:3001/employees")
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setEmployee(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const openAddForm = () => {
    setShowAddForm(true);
  };

  const employeeSearch = (e) => {
    if (searchEmp.length > 4) {
      // console.log(searchEmp);
      const isEmpPresent = employee.find(
        (emp) => emp.empId === parseInt(searchEmp)
      );
      if (isEmpPresent) {
        // console.log(isEmpPresent);
        setEmpFound(isEmpPresent);
      } else {
        // console.log("not Found");
        setShowToast(true);
        setSearchEmp("")
      }
    }

    if (searchEmp.length < 4) {
      setSearchEmp("");
      setEmpFound("");
    }
  };

  return (
    <div className="disBackground">
      <ToastMessage
        showToast={showToast}
        setShowToast={setShowToast}
        message={"Employee not found"}
      />
      <div className="heading">
        <Link to="/dashboard">
          <i className="fa-solid fa-arrow-left back-arrow"></i>
        </Link>
        <Link to="/">
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            viewBox="0 0 113 55"
            className="logo-name-Image"
            style={{ enableBackground: "new 0 0 113 55" }}
            xmlSpace="preserve"
          >
            <clipPath id="ey-logo-first-line">
              <rect x="42" y="36" width="71" height="10" />
            </clipPath>
            <clipPath id="ey-logo-second-line">
              <rect x="42" y="46" width="71" height="10" />
            </clipPath>
            <polygon
              className="ey-logo-yellow"
              points="51.2,0 0,19.3 0,19.3 51.2,10 "
              style={{ fill: "yellow" }}
            />
            <polygon
              points="34.3,27 30,35.5 25.6,27 17,27 26.1,42.7 26.1,52.9 33.8,52.9 33.8,42.7 42.8,27 "
              style={{ fill: "white" }}
            />
            <polygon
              points="7.7,42.7 17,42.7 17,37.3 7.7,37.3 7.7,33 18,33 14.6,27 0,27 0,52.9 20.6,52.9 20.6,47 7.7,47 "
              style={{ fill: "white" }}
            />
          </svg>
        </Link>
      </div>
      <div className="display-content p-2">
        <div className="crud-buttons">
          <button className="add-button" onClick={openAddForm}>
            <p>
              <i className="fa-solid fa-plus"></i> Add
            </p>
          </button>

          <button className="delete-button">
            <p>
              <i className="fa-solid fa-minus"></i> Delete
            </p>
          </button>
          <input
            type="text"
            className="serch-emp"
            placeholder="search by Emp Id"
            value={searchEmp}
            onBlur={employeeSearch}
            onChange={(e) => {
              setSearchEmp(e.target.value);
            }}
          />
        </div>
        <div className="table-heading" style={{ overflowX: "auto" }}>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">
                  <input type="checkbox" />
                </th>
                <th scope="col">
                  <h3>Emp Id</h3>
                </th>
                <th scope="col">
                  <h3>Emp Name</h3>
                </th>

                <th scope="col">
                  <h3>Gender</h3>
                </th>
                <th scope="col">
                  <h3>Designation</h3>
                </th>
                <th scope="col">
                  <h3>Salary</h3>
                </th>
                <th scope="col">
                  <h3>Email</h3>
                </th>
                <th scope="col">
                  <h3>DOB</h3>
                </th>
                <th scope="col">
                  <h3>Joining date</h3>
                </th>
              </tr>
            </thead>
            <tbody className="table-body">
              {empFound ? (
                <tr className="tr-background">
                  <td scope="row">
                    <input
                      type="checkbox"
                      aria-label="Checkbox for following text input"
                      className="empCheck"
                      name="empCheck"
                    />
                  </td>
                  <td>{empFound.empId}</td>
                  <td>{empFound.empName}</td>
                  <td>{empFound.gender}</td>
                  <td>{empFound.designation}</td>
                  <td>{empFound.empSalary}</td>
                  <td>{empFound.email}</td>
                  <td>{empFound.dob}</td>
                  <td>{empFound.joiningDate}</td>
                  <td>
                    <i
                      className="fa-solid fa-ellipsis-vertical"
                      style={{ color: "grey", cursor: "pointer" }}
                      data-toggle="modal"
                      data-target={"#e" + empFound.empId}
                    ></i>
                    <i
                      className="fa-solid fa-pen"
                      style={{
                        color: "grey",
                        cursor: "pointer",
                        paddingLeft: "7px",
                      }}
                      onClick={(e) => {
                        setUpdateForm(true);
                        setUpdateId(empFound.id);
                      }}
                    ></i>
                    <i
                      className="fa-solid fa-trash-can"
                      style={{
                        color: "grey",
                        cursor: "pointer",
                        paddingLeft: "7px",
                      }}
                      onClick={(e) => {
                        setDeleteForm(true);
                        setDeleteId(empFound.id);
                        setDeleteIndex(employee.indexOf(empFound));
                      }}
                    ></i>
                  </td>
                  <td>
                    <div
                      className="modal fade"
                      id={"e" + empFound.empId}
                      tabIndex="-1"
                      aria-labelledby="exampleModalLabel"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5
                              className="modal-title"
                              id="exampleModalLabel"
                              style={{ color: "black" }}
                            >
                              {empFound.empName + " Details"}
                            </h5>
                            <button
                              type="button"
                              className="btn-close"
                              data-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>
                          <div
                            className="modal-body"
                            style={{ color: "black" }}
                          >
                            <span>
                              Name : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                              {empFound.empName}
                            </span>
                            <br />
                            <span>
                              Id : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                              {empFound.empId}
                            </span>
                            <br />
                            <span>
                              Gender : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                              {empFound.gender}
                            </span>
                            <br />
                            <span>
                              Designation : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                              {empFound.designation}
                            </span>
                            <br />
                            <span>
                              Salary : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                              {empFound.empSalary}
                            </span>
                            <br />
                            <span>
                              DOB : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                              {empFound.dob}
                            </span>
                            <br />
                            <span>
                              JOI : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                              {empFound.joiningDate}
                            </span>
                            <br />
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              ) : (
                employee &&
                employee.map((emp, index) => {
                  return (
                    <tr
                      key={index}
                      className={index % 2 === 0 ? "tr-background" : ""}
                    >
                      <td scope="row">
                        <input
                          type="checkbox"
                          aria-label="Checkbox for following text input"
                          className="empCheck"
                          name="empCheck"
                        />
                      </td>
                      <td>{emp.empId}</td>
                      <td>{emp.empName}</td>
                      <td>{emp.gender}</td>
                      <td>{emp.designation}</td>
                      <td>{emp.empSalary}</td>
                      <td>{emp.email}</td>
                      <td>{emp.dob}</td>
                      <td>{emp.joiningDate}</td>
                      <td>
                        <i
                          className="fa-solid fa-ellipsis-vertical"
                          style={{ color: "grey", cursor: "pointer" }}
                          data-toggle="modal"
                          data-target={"#e" + emp.empId}
                        ></i>
                        <i
                          className="fa-solid fa-pen"
                          style={{
                            color: "grey",
                            cursor: "pointer",
                            paddingLeft: "7px",
                          }}
                          onClick={(e) => {
                            setUpdateForm(true);
                            setUpdateId(emp.id);
                          }}
                        ></i>
                        <i
                          className="fa-solid fa-trash-can"
                          style={{
                            color: "grey",
                            cursor: "pointer",
                            paddingLeft: "7px",
                          }}
                          onClick={(e) => {
                            setDeleteForm(true);
                            setDeleteId(emp.id);
                            setDeleteIndex(index);
                          }}
                        ></i>
                      </td>
                      <td>
                        <div
                          className="modal fade"
                          id={"e" + emp.empId}
                          tabIndex="-1"
                          aria-labelledby="exampleModalLabel"
                          aria-hidden="true"
                        >
                          <div className="modal-dialog">
                            <div className="modal-content">
                              <div className="modal-header">
                                <h5
                                  className="modal-title"
                                  id="exampleModalLabel"
                                  style={{ color: "black" }}
                                >
                                  {emp.empName + " Details"}
                                </h5>
                                <button
                                  type="button"
                                  className="btn-close"
                                  data-dismiss="modal"
                                  aria-label="Close"
                                ></button>
                              </div>
                              <div
                                className="modal-body"
                                style={{ color: "black" }}
                              >
                                <span>
                                  Name : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                                  {emp.empName}
                                </span>
                                <br />
                                <span>
                                  Id : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                  {emp.empId}
                                </span>
                                <br />
                                <span>
                                  Gender : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                  {emp.gender}
                                </span>
                                <br />
                                <span>
                                  Designation : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                                  {emp.designation}
                                </span>
                                <br />
                                <span>
                                  Salary : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                                  {emp.empSalary}
                                </span>
                                <br />
                                <span>
                                  DOB : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {emp.dob}
                                </span>
                                <br />
                                <span>
                                  JOI : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                                  {emp.joiningDate}
                                </span>
                                <br />
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showAddform ? (
        <AddEmp
          setFormFalse={setShowAddForm}
          setEmployee={setEmployee}
          employee={employee}
        />
      ) : (
        ""
      )}

      {showUpdateForm ? (
        <UpdateDataForm
          setUpdateForm={setUpdateForm}
          updateId={updateId}
          setEmployee={setEmployee}
          employee={employee}
          upDateData={upDateData}
        />
      ) : (
        ""
      )}
      {showDeleteForm ? (
        <DeleteData
          setDeleteForm={setDeleteForm}
          deleteId={deleteId}
          setEmployee={setEmployee}
          employee={employee}
          deleteIndex={deleteIndex}
          setEmpFound={setEmpFound}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default EmpData;
