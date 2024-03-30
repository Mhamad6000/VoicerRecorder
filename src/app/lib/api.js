import axios from "axios";
import Cookies from "js-cookie";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("auth_token");

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    console.log("cccc", config)
    if (config.url === "/file") {
      config.headers["Content-Type"] = "multipart/form-data";
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// api.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     if (error?.response?.status === 422) {
//       const err = error.response.data.errors;

//       const errors = {};
//       for (const key in err) {
//         errors[key] = err[key][0];
//       }

//       error.response.data.errors = errors;
//     } else if (error?.response?.status === 400) {
//       return error.response.data;
//     }
//     return Promise.reject(error);
//   }
// );

// export default api;
