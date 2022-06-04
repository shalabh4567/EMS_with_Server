const Emp = require("../models/employee");

exports.addEmployee = async (req, res) => {
  try {
    const {
      empId,
      empName,
      gender,
      empEmail,
      empSalary,
      designation,
      dob,
      joiningDate,
    } = req.body;

    if (
      !(
        empId &&
        empName &&
        gender &&
        empEmail &&
        empSalary &&
        designation &&
        dob &&
        joiningDate
      )
    ) {
      res.status(400).json({ error: "All fields are required" });
    }

    const empExist = await Emp.findOne({ empEmail });

    if (empExist) {
      res.status(400).json({ error: "emp with this mail exist" });
    }

    const emp = await Emp.create({
      empId,
      empName,
      gender,
      empEmail,
      empSalary,
      designation,
      dob,
      joiningDate,
    });

    res.status(200).json({
      emp,
      message: "Employee is registered",
    });
  } catch (error) {
    console.log(error.message);
  }
};

exports.showAllEmp = async (req, res) => {
  const allEmp = await Emp.find();

  res.status(200).json(allEmp);
};
