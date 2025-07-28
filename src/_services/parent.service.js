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
    reset,
    verifyOtp,
    updatePassword,
    resendVerify,
    getassignment,
    deleteAssignments,
    createAssignment,
    getAllSubject,
    getAllChild,
    getQuestions,
    updateAssignments,
    updateById,
    getSubscribe,
    createSubscribe,
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
async function reset(data) {
    return axiosInstance.post(`api/v1/auth/reset-password`, data, {
    });
}

async function verifyOtp(data) {
    return axiosInstance.post(`api/v1/auth/verify-email-otp`, data, {
    });
}

async function updatePassword(data) {
    return axiosInstance.post(`api/v1/auth/update-password`, data, {
    });
}
async function resendVerify(data) {
    return axiosInstance.post(`api/v1/auth/resend-verification-email`, data, {
    });
}
async function getassignment() {
    return await axiosInstance.post(`/api/v1/assignments/get`);
}
async function deleteAssignments(data) {
    return await axiosInstance.post(`api/v1/assignments/delete`, data);
}
async function createAssignment(data) {
    return await axiosInstance.post(`/api/v1/assignments/create`,
        data,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        }
    );
}
async function getAllSubject(id) {
    return await axiosInstance.get(`/api/v1/questions/subjects?level_id=${id}`)
}
async function getAllChild() {
    return await axiosInstance.get(`/api/v1/parent/my-students`);
}
async function getQuestions(id) {
    return await axiosInstance.get(`/api/v1/questions/all?subject_id=${id}`);
}
async function updateById(data) {
    return await axiosInstance.post(`api/v1/assignments/assignmentById`, data);
}
async function updateAssignments(data) {
    return await axiosInstance.post(`api/v1/assignments/update`, data);
}
async function getSubscribe() {
    return await axiosInstance.get(`/api/v1/subscription/subscription-plans`);
}
async function createSubscribe(data) {
    return await axiosInstance.post(`/api/v1/subscription/create`, data);
}
export default parentService;