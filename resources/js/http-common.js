import axios from "axios";
export default axios.create({
  baseURL: "http://laravel-vue.com/api",
  headers: {
    "Content-type": "application/json"
  }
});
