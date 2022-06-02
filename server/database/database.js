const mongoose = require("mongoose");

exports.connect = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then((res) => console.log("Database Connected Successfully"))
    .catch((err) => {
      console.log(err);
    });
};
