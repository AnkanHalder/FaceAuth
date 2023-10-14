import mongoose from "mongoose";

const connectMongoDB = async () => {
    try {
      await mongoose
        .connect(
          process.env.mongoURL)
        .then(() => {
          console.log("DB connected");
        })
        .catch((error) => {
          console.error("Error connecting to MongoDB:", error);
        });
    } catch (error) {
      console.log(error);
    }
  };
  
export default connectMongoDB;