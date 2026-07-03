import axios from "axios";

const API = axios.create({
  baseURL: "https://mern-blog-platform-6rmd.onrender.com/api",
});

export default API;
