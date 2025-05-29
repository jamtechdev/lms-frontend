import axiosInstance from "./axiosInstance";

const userService = {
    login,
    loginStudent,
    getLevel,
};
async function login(data) {
    return await axiosInstance.post(`/api/v1/auth/login`, data);
}
async function loginStudent(data) {
    return await axiosInstance.post(`/api/v1/auth/student-login`, data);
}
async function getLevel(data) {
    return await axiosInstance.get(`/api/v1/questions/levels?education_type=${data}`);
}
export default userService;