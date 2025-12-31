import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api",
  // import.meta.env.NODE === "development"
  //   ? "http://localhost:3000/api"
  //   : "/api",
  withCredentials: true,
});
