import axiosInstance from "./axiosInstance";

const userService = {
    login,
    loginStudent,
    getSubject,
    getAllQuestion,
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
export default userService;