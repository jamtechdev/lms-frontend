import axiosInstance from "./axiosInstance";

const userService = {
    login,
    loginStudent,
};
async function login(data) {
    return await axiosInstance.post(`/api/v1/auth/login`, data);
}
async function loginStudent(data) {
    return await axiosInstance.post(`/api/v1/auth/student-login`, data);
}
export default userService;