import axiosInstance from "./axiosInstance";

const userService = {
    login,
};

async function login(data) {
    return await axiosInstance.post(`/api/v1/auth/login`, data);
}
export default userService;