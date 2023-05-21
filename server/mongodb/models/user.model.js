import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  credits: {
    type: Number,
    required: true,
  },
  imgtoken: {
    type: Number,
    required: true,
  },
});

const UserModel = mongoose.model("User", UserSchema, "user-data");

export default UserModel;
