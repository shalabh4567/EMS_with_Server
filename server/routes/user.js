const express = require("express");
const router = express.Router();
const { signup, login } = require("../controllers/userController");
const {
  addEmployee,
  showAllEmp,
} = require("../controllers/employeeController");

router.route("/signup").post(signup);
router.route("/login").post(login);

// For adding an Employee

router.route("/addEmp").post(addEmployee);
router.route("/showAllEmp").get(showAllEmp);

module.exports = router;
