import axios from "axios";
import Cookies from "js-cookie";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization:
      "Bearer " +
      "eyJhbGciOiJIUzI1NiJ9.eyJpZCI6ImNiMjE4ZGMxLTVjZmUtNDQyNC1iZWU4LTU4MTg3NmViMDUyZSJ9.8NMLPEGNfEwN4AZEfHKoXY7OTEvtr4GBMU31OuWfC8c",
  },
});
export const SignUpApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization:
      "Bearer " +
      "eyJhbGciOiJIUzI1NiJ9.eyJpZCI6ImNiMjE4ZGMxLTVjZmUtNDQyNC1iZWU4LTU4MTg3NmViMDUyZSJ9.8NMLPEGNfEwN4AZEfHKoXY7OTEvtr4GBMU31OuWfC8c",
  },
});

// api.interceptors.request.use(
//   (config) => {
//     const token = Cookies.get("sbay_auth_token");

//     if (token) {
//       config.headers["Authorization"] = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

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
