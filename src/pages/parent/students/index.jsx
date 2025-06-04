import { Link } from "react-router-dom";

const StudentList = () => {

    return (
        <>
            <h3>Students</h3>
        <Link to={'/parent/students/create'}>Create</Link>
        </>
    )
}
export default StudentList;