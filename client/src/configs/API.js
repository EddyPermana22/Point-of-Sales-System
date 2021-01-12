import Axios from "axios";

const API = Axios.create({
  baseURL: "http://localhost:3030",
});

export default API;
