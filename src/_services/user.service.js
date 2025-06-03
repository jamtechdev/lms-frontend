import axiosInstance from "./axiosInstance";

const userService = {
    login,
    loginStudent,
    getSubject,
    getAllQuestion,
    logout,
    answer,
};
async function login(data) {
    return await axiosInstance.post(`/api/v1/auth/login`, data);
}
async function loginStudent(data) {
    return await axiosInstance.post(`/api/v1/auth/student-login`, data);
}
async function getSubject(data) {
    return await axiosInstance.get(`/api/v1/questions/subjects?level_id=${data}`)
}
async function getAllQuestion(data) {
    return await axiosInstance.post(`/api/v1/questions/getTypeBasedQuestions`, data);
}
async function logout(data) {
    return await axiosInstance.post(`/api/v1/logout`, data);
}
async function answer(data) {
    return await axiosInstance.post(`/api/v1/questions/user-answer`, data);
}
export default userService;