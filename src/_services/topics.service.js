import axiosInstance from "./axiosInstance";

const topicsService = {
    topicsBySubject,
};
async function topicsBySubject(subjectId) {
    return await axiosInstance.get(`/api/v1/questions/topics?subject_id=${subjectId}`);
}
export default topicsService;