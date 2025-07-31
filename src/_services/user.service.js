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
    getViewPrize,
    redeemRequest,
    getAi,
    getLogs,

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
async function getViewPrize(id) {
    return await axiosInstance.get(`/api/v1/gems/view-prize?child_id=${id}`);
}
async function redeemRequest(data) {
    return await axiosInstance.post(`/api/v1/gems/gems-redeem-request`, data);
}
async function getAi(data) {
    return await axiosInstance.post(`/api/v1/comparison/question`, data);
}
async function getLogs(id) {
    return await axiosInstance.get(`/api/v1/gems/redemption-logs?child_id=${id}`);
}
export default userService;