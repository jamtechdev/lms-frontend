import axiosInstance from "./axiosInstance";

const parentService = {
    getStudentLevel,
    createStudent,
    getAllStudents,
    getStudentById,
    updateStudentByParent,
    deleteStudentByParent,
    updateLockCode,
    signUp,
    getChild,
};

async function getStudentLevel() {
    return await axiosInstance.get(`/api/v1/parent/get-student-level`);
}
async function createStudent(data) {
    return await axiosInstance.post(`/api/v1/parent/student`,
        data,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        }
    );
}
async function getAllStudents(page) {
    return await axiosInstance.get(`/api/v1/parent/student?page=${page}`);
}
async function getStudentById(id) {
    return await axiosInstance.get(`/api/v1/parent/student/${id}`);
}
async function updateStudentByParent(id, data) {
    return await axiosInstance.post(`api/v1/parent/student/${id}`,
        data,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        }
    )
}
async function deleteStudentByParent(id) {
    return await axiosInstance.delete(`api/v1/parent/student/${id}`);
}
async function updateLockCode(id, data) {
    return await axiosInstance.post(`/api/v1/parent/student/${id}/lock-code`,
        data,
    )
}
async function signUp(data) {
    return await axiosInstance.post(`/api/v1/auth/register`, data);
}
async function getChild() {
    return await axiosInstance.get(`/api/v1/parent/my-students`);
}
export default parentService;