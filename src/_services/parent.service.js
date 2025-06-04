import axiosInstance from "./axiosInstance";

const parentService = {
    getStudentLevel,
    createStudent,
    getAllStudents,
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
async function getAllStudents(){
    return await axiosInstance.get(`/api/v1/parent/student`);
}
export default parentService;