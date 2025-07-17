import axiosInstance from "./axiosInstance";

const userService = {
    login,
    loginStudent,
    getSubject,
    getAllQuestion,
    logout,
    answer,
    getStudentAssignment,
    assignmentAttempt,
    getresult, 
    feedback,
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
async function getAllQuestion(page, data) {
    return await axiosInstance.post(`/api/v1/questions/getTypeBasedQuestions?page=${page}`, data);
}
async function logout(data) {
    return await axiosInstance.post(`/api/v1/logout`, data);
}
async function answer(data) {
    return await axiosInstance.post(`/api/v1/questions/user-answer`, data);
}
async function getStudentAssignment(data) {
    return await axiosInstance.post(`/api/v1/assignments/student-assignment`, data);
}
async function assignmentAttempt(data) {
    return await axiosInstance.post(`/api/v1/assignments/attempt`, data);
}
async function getresult(data) {
    return await axiosInstance.post(`/api/v1/assignments/getPastResults`, data);
}
async function feedback(data) {
    return await axiosInstance.post(`api/v1/feedback`, data);
}
export default userService;