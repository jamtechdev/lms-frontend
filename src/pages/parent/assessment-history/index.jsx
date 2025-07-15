import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import parentService from "../../../_services/parent.service";
import swal from "sweetalert";
import loader from "../../../assets/images/loader.gif";

const AssessmentHistory = () => {
  const [loading, setLoading] = useState(true);
  const [assignments, setAssignments] = useState([]);
  const navigate = useNavigate();

  const fetchAssignment = async () => {
    setLoading(true);
    await parentService
      .getassignment()
      .then((data) => {
        setAssignments(data?.data);
      })
      .catch((error) => {
        console.log("Error", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    fetchAssignment();
  }, []);

  const handleDelete = async (assignment_id) => {
    try {
      const willDelete = await swal({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        buttons: ["Cancel", "OK"],
        icon: "warning",
      });

      if (willDelete) {
        await handleDeleteConfirm({ assignment_id });
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  const handleDeleteConfirm = async (payload) => {
    try {
      const data = await parentService.deleteAssignments(payload);
      console.log(data);
      await swal(
        "Deleted",
        "Assignment has been deleted successfully!",
        "success"
      );
      await fetchAssignment();
    } catch (error) {
      console.error("Error", error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/parent/assessment/update/${id}`);
  };

  if (loading)
    return (
      <div className="text-center mt-5">
        <img src={loader} width={100} />
      </div>
    );
  return (
    <>
      <div>
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
        </div>

        <div className="d-flex align-items-center justify-content-between mb-2">
          <h3>Student List</h3>
          <Link to={"/parent/createassignment"} className="dashboard-button">
            Create Assignment
          </Link>
        </div>
        <div className="table-responsive">
          <table className="student-table table table-bordered">
            <thead>
              <tr>
                <th className="text-white-300">Title</th>
                <th className="text-white-300">Description</th>
                <th className="text-white-300">Subject</th>
                <th className="text-white-300">Level</th>
                <th className="text-white-300">Due Date</th>
                <th className="text-white-300">Questions</th>
                <th className="text-white-300">Created</th>
                <th className="text-white-300">Action</th>
              </tr>
            </thead>
            <tbody>
              {assignments.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center">
                    No assignments found.
                  </td>
                </tr>
              ) : (
                assignments.map((assignment) => (
                  <tr key={assignment.id}>
                    <td>{assignment.title}</td>
                    <td>{assignment.description}</td>
                    <td>{assignment.subject?.subject_name || "N/A"}</td>
                    <td>{assignment.subject?.level_name || "N/A"}</td>
                    <td>{assignment.due_date}</td>
                    <td>{assignment.questions?.length || 0}</td>
                    <td>{assignment.created_time}</td>
                    <td style={{ textAlign: "center" }}>
                      <button
                        className="icon-button"
                        onClick={() => handleEdit(assignment.id)}
                        title="Edit"
                      >
                        <i className="ph ph-pencil-simple"></i>
                      </button>
                      <button
                        className="icon-button text-danger ms-2"
                        title="Delete"
                        onClick={() => handleDelete(assignment.id)}
                      >
                        <i className="ph ph-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
export default AssessmentHistory;
