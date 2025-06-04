import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import parentService from "../../../_services/parent.service";

const StudentList = () => {
    const [students, setStudents] = useState();
    useEffect(() => {
        const fetchStudents = async () => {
            await parentService.getAllStudents().then((data) => {
                console.log(data?.data, ">>>>>>>");
                setStudents(data?.data);
            }).catch((error) => {
                console.log("Error", error);
            });
        }
        fetchStudents();
    }, []);
    return (
        <>
            <h3>Students</h3>
            <Link to={'/parent/students/create'}>Create</Link>
        </>
    )
}
export default StudentList;