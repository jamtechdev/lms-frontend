import axios from "axios";
import { store } from "../_store";
import { logout } from "../_store/_reducers/auth";

const API_URL = process.env.REACT_APP_API_URL;

const axiosInstance = axios.create({
    baseURL: API_URL,
});

let isAlertOpen = false;

axiosInstance.interceptors.request.use(
    (config) => {
        const state = store.getState();
        const token = state.auth.token;
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// axiosInstance.interceptors.response.use(
//   (response) => response.data,
//   (error) => {
//     if (error.response && error.response.status === 401) {
//       if (!isAlertOpen) {
//         isAlertOpen = true;

//         const message =
//           "Your session has expired due to login on another device. Please log in again.";
//         window.alert("Session Expired\n" + message);

//         store.dispatch(logout());

//         setTimeout(() => {
//           isAlertOpen = false;
//         }, 1000);
//       }
//     }
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;
