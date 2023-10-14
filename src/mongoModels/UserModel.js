import mongoose from "mongoose";

let User;
try {
  // Attempt to fetch the existing model if it exists
  User = mongoose.model("User");
} catch (error) {
  // If the model doesn't exist, define it
  const UserSchema = new mongoose.Schema({
    data: Object,
    Faces: Array, 
  });

  User = mongoose.model("User", UserSchema);
}

export default User;