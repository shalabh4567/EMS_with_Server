const Admin = require("../models/admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    console.log(name, email, password)

    if (!(name && email && password)) {
      res.status(404).json({ error: "All fields are required" });
    }

    const isPresent = await Admin.findOne({ email });

    if (isPresent) {
      res.status(400).json({ error: "User with this mail already exists" });
    }

    const admin = await Admin.create({
      fullname: name,
      email,
      password,
    });

    res.status(200).json({
      success: "You are an Admin",
      admin,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const user = await Admin.findOne({ email });

    if (!user) {
      res.status(403).json({ error: "Admin not found" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      res.status(403).json({ error: "Email or password is wrong" });
    }

    user.password = undefined;

    const token = jwt.sign(
      { id: user._id, user, exp: Date.now() + 60 * 60 },
      process.env.JWT_SECRET
    );

    res.status(200).json({ token: token, user, sucess: true });
  } catch (error) {
    console.log(error);
  }
};
