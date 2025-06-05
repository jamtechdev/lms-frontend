import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import parentService from "../../../_services/parent.service";
import swal from 'sweetalert';

const StudentList = () => {
    const [students, setStudents] = useState();
    const [loading, setLoading] = useState(true);
    const [lockCodeUpdating, setLockCodeUpdating] = useState(false);
    const navigate = useNavigate();
    const fetchStudents = async () => {
        setLoading(true);
        await parentService.getAllStudents().then((data) => {
            setStudents(data?.data);
        }).catch((error) => {
            console.log("Error", error);
        }).finally(() => {
            setLoading(false);
        });
    }
    useEffect(() => {
        fetchStudents();
    }, []);
    const handleToggle = async (student) => {
        setLockCodeUpdating(true);
        const randomCode = Math.floor(100000 + Math.random() * 900000).toString();
        const payload = {
            lock_code: randomCode,
            lock_code_enabled: student?.lock_code_enabled ? 0 : 1
        }
        await parentService.updateLockCode(student?.id, payload).then(async (data) => {
            console.log(data);
            await fetchStudents();
        }).catch((error) => {
            console.error("Error", error);
        }).finally(() => {
            setLockCodeUpdating(false);
        })
    };
    const handleEdit = (id) => {
        navigate(`/parent/students/${id}`)
    };
    const handleDelete = async (id) => {
        await swal({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            buttons: ["Cancel", "OK"],
            icon: "warning",
        }).then((willDelete) => {
            if (willDelete) {
                handleDeleteConfirm(id);
            }
        }).catch((error) => {
            console.error("Error", error);
        })
    };
    const handleDeleteConfirm = async (id) => {
        await parentService.deleteStudentByParent(id).then(async (data) => {
            console.log(data);
            await swal("Deleted", "Student has been successfully!", "success");
            await fetchStudents();
        }).catch((error) => {
            console.error("Error", error);
        })
    }
    if (loading && !lockCodeUpdating) return <div>Loading........</div>
    return (
        <>
            <div className="table-container">
                <h3>Student List</h3>
                <Link to={'/parent/students/create'}>Create</Link>
                <table className="student-table">
                    <thead>
                        <tr>
                            <th>Avatar</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Student Type</th>
                            <th>Student Level</th>
                            <th>Address</th>
                            <th>Lock Code</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students && students?.students?.map((student) => (
                            <tr key={student?.id}>
                                <td>
                                    <img
                                        src={student?.avatar}
                                        alt="avatar"
                                        className="avatar-img"
                                    />
                                </td>
                                <td>{student?.first_name} {student?.last_name}</td>
                                <td>{student?.email}</td>
                                <td>{student?.phone}</td>
                                <td>{student?.student_type}</td>
                                <td>{student?.student_level}</td>
                                <td>{student?.address}</td>
                                <td>{student?.lock_code}</td>
                                <td>
                                    <label className="switch">
                                        <input
                                            type="checkbox"
                                            checked={student?.lock_code_enabled}
                                            onChange={() => handleToggle(student)}
                                            disabled={lockCodeUpdating}
                                        />
                                        <span className="slider round"></span>
                                    </label>
                                    <button
                                        className="icon-button"
                                        onClick={() => handleEdit(student.id)}
                                        title="Edit"
                                    >
                                        <i className="ph ph-pencil-simple"></i>
                                    </button>
                                    <button
                                        className="icon-button text-danger ms-2"
                                        onClick={() => handleDelete(student.id)}
                                        title="Delete"
                                    >
                                        <i className="ph ph-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}
export default StudentList;