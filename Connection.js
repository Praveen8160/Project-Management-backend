const mongoose = require("mongoose");
const DatabaseConnection = async (url) => {
  try {
    await mongoose
      .connect(url)
      .then(() => console.log("connection Successfully"))
      .catch((err) => console.log(`Error to connect Database ${err}`));
  } catch (error) {
    console.log("Coneection Error", error);
  }
};

module.exports = DatabaseConnection;
