const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://tanishmahajan0909:VIPQhHVwJELbcLDu@cluster.lea4krr.mongodb.net/canteendb"
);

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  signUpAs: {
    type: String,
    required: true,
  },
});

const canteenSchema = new mongoose.Schema({
  canteenName: String,
  items: Array,
});

const Canteen = new mongoose.model("Canteen", canteenSchema);

const User = new mongoose.model("User", userSchema);

module.exports = {
  User,
  Canteen,
};
