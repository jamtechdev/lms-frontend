import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import parentService from "../../../_services/parent.service";
import swal from "sweetalert";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic-light-dark.css";
import loader from "../../../assets/images/loader.gif";
const StudentList = () => {
  const [students, setStudents] = useState();
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [lockCodeUpdating, setLockCodeUpdating] = useState(false);
  const navigate = useNavigate();
  const fetchStudents = async () => {
    setLoading(true);
    await parentService
      .getAllStudents(page)
      .then((data) => {
        setStudents(data?.data);
      })
      .catch((error) => {
        console.log("Error", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    fetchStudents();
  }, [page]);
  const handlePage = (value) => {
    setPage(value);
  };
  const handleToggle = async (student) => {
    setLockCodeUpdating(true);
    const randomCode = Math.floor(100000 + Math.random() * 900000).toString();
    const payload = {
      lock_code: randomCode,
      lock_code_enabled: student?.lock_code_enabled ? 0 : 1,
    };
    await parentService
      .updateLockCode(student?.id, payload)
      .then(async (data) => {
        console.log(data);
        await fetchStudents();
      })
      .catch((error) => {
        console.error("Error", error);
      })
      .finally(() => {
        setLockCodeUpdating(false);
      });
  };
  const handleEdit = (id) => {
    navigate(`/parent/students/${id}`);
  };
  const handleDelete = async (id) => {
    await swal({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      buttons: ["Cancel", "OK"],
      icon: "warning",
    })
      .then((willDelete) => {
        if (willDelete) {
          handleDeleteConfirm(id);
        }
      })
      .catch((error) => {
        console.error("Error", error);
      });
  };
  const handleDeleteConfirm = async (id) => {
    await parentService
      .deleteStudentByParent(id)
      .then(async (data) => {
        console.log(data);
        await swal("Deleted", "Student has been successfully!", "success");
        await fetchStudents();
      })
      .catch((error) => {
        console.error("Error", error);
      });
  };
  if (loading && !lockCodeUpdating) return <div className="text-center mt-5"><img src={loader} width={100}/></div>;
  return (
    <>
      <div className="dashboard-body">
        <div className="breadcrumb-with-buttons mb-24 flex-between flex-wrap gap-8">
          <div className="breadcrumb mb-24">
            <ul className="flex-align gap-4 mb-0">
              <li>
                <Link
                  to="/"
                  className="text-gray-200 fw-normal text-15 hover-text-main-600"
                >
                  Home
                </Link>
              </li>
              <li>
                <span className="text-gray-500 fw-normal d-flex">
                  <i className="ph ph-caret-right"></i>
                </span>
              </li>
              <li>
                <span className="text-main-600 fw-normal text-15">
                  Childrens
                </span>
              </li>
            </ul>
          </div>

          {/* <div className="flex-align gap-8 flex-wrap">
                        <div className="position-relative text-gray-500 flex-align gap-4 text-13">
                            <span className="text-inherit">Sort by: </span>
                            <div className="flex-align text-gray-500 text-13 border border-gray-100 rounded-4 ps-20 focus-border-main-600 bg-white">
                                <span className="text-lg"><i className="ph ph-funnel-simple"></i></span>
                                <select className="form-control ps-8 pe-20 py-16 border-0 text-inherit rounded-4 text-center">
                                    <option value="1" selected>Popular</option>
                                    <option value="1">Latest</option>
                                    <option value="1">Trending</option>
                                    <option value="1">Matches</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex-align text-gray-500 text-13 border border-gray-100 rounded-4 ps-20 focus-border-main-600 bg-white">
                            <span className="text-lg"><i className="ph ph-layout"></i></span>
                            <select className="form-control ps-8 pe-20 py-16 border-0 text-inherit rounded-4 text-center" id="exportOptions">
                                <option value="" selected disabled>Export</option>
                                <option value="csv">CSV</option>
                                <option value="json">JSON</option>
                            </select>
                        </div>
                    </div> */}
        </div>

        <div className="d-flex align-items-center justify-content-between mb-3">
          <h3>Student List</h3>
          <Link
            to={"/parent/students/create"}
            className="btn btn-primary text-sm btn-sm px-24 py-12 gap-8"
          >
            Create
          </Link>
        </div>
        <div class="table-container">
          <table className="student-table table table-bordered table-hover">
          <thead>
            <tr>
              <th className="text-white-300">Avatar</th>
              <th className="text-white-300">Name</th>
              <th className="text-white-300">Email</th>
              <th className="text-white-300">Phone</th>
              <th className="text-white-300">Student Type</th>
              <th className="text-white-300">Student Level</th>
              <th className="text-white-300">Address</th>
              <th className="text-white-300">Lock Code</th>
              <th className="text-white-300">Action</th>
            </tr>
          </thead>
          <tbody>
            {students &&
              students?.students?.map((student) => (
                <tr key={student?.id}>
                  <td>
                    <img
                      src={student?.avatar}
                      alt="avatar"
                      className="avatar-img"
                    />
                  </td>
                  <td>
                    {student?.first_name} {student?.last_name}
                  </td>
                  <td>{student?.email}</td>
                  <td>{student?.phone}</td>
                  <td>{student?.student_type}</td>
                  <td>{student?.student_level}</td>
                  <td>{student?.address}</td>
                  <td>{student?.lock_code}</td>
                  <td style={{ textAlign: "center" }}>
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
        {/* Pagination Controls */}
        <ResponsivePagination
          current={students?.pagination?.current_page}
          total={students?.pagination?.total_pages}
          onPageChange={handlePage}
        />

      </div>

      
      
    </>
  );
};
export default StudentList;
