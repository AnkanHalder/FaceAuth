import axios from "axios";

export class ApiCaller {
  static async registerUser(data, faces) {
    try {
      const res = await axios.post("/api/registerUser", {data:data, faces: faces});
      console.log(res.data);
      return res.data; // Return the response data on success
    } catch (error) {
      console.error("An error occurred:", error);
      return { error: "An error occurred while registering the user." }; // Return an error message on failure
    }
  }
  static async getAllUsers() {
    try {
      const res = await axios.get("/api/getUsers"); // Make a GET request to the getUsers API route
      console.log(res.data);
      return res.data; // Return the response data on success
    } catch (error) {
      console.error("An error occurred:", error);
      return { error: "An error occurred while fetching all users." }; // Return an error message on failure
    }
  }
  static async loginUser(email, password) {
    try {
      const res = await axios.post("/api/login", { email, password });
      console.log(res.data);
      return res.data; // Return the response data on success
    } catch (error) {
      console.error("An error occurred:", error);
      return { error: "An error occurred while logging in." }; // Return an error message on failure
    }
  }
}
