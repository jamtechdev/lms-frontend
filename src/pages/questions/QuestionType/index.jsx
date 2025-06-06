import React, { useEffect, useState } from "react";
import maths from "../../../assets/images/maths.png";
import { useDispatch, useSelector } from "react-redux";
import {
  getLevel,
  getQuestion,
  getStudentType,
  getSubject,
  setFetchedQuestionArray,
  setQuestion,
  setSubject,
} from "../../../_store/_reducers/auth";
import userService from "../../../_services/user.service";
import { useNavigate } from "react-router-dom";
const QuestionType = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedQuestionType, setSelectedQuestionType] = useState(null);
  const education = useSelector(getStudentType);
  const level = useSelector(getLevel);
  const subject = useSelector(getSubject);
  const question = useSelector(getQuestion);
 
  const questionTypes = [
    { key: "mcq", label: "MCQ" },
    { key: "fill_blank", label: "Fill in the blanks" },
    { key: "true_false", label: "True/False" },
    { key: "linking", label: "Linking" },
    { key: "rearranging", label: "Rearranging" },
    { key: "comprehension", label: "Comprehension" },
  ];

  const handleQuestion = async (selectedType) => {
    try {
      const data = {
        education_type: education,
        level_id: level,
        subject_id: subject,
        type: selectedType || question,
      };
      const response = await userService.getAllQuestion(data);
      dispatch(setFetchedQuestionArray(response.data.questions_array));
    } catch (err) {
      console.log(err?.response?.data?.message || "Failed, please try again");
    }
  };


  useEffect(() => {
    dispatch(setFetchedQuestionArray([]));
  }, [])
  return (
    <>
      <div className="dashboard-body">
        <div className="breadcrumb-with-buttons mb-24 flex-between flex-wrap gap-8">
          <div className="breadcrumb mb-24">
            <ul className="flex-align gap-4">
              <li>
                <a
                  href="#"
                  onClick={() => {
                    setSelectedQuestionType(null);
                  }}
                  className="text-gray-200 fw-normal text-15 hover-text-main-600"
                >
                  Back to Subjects
                </a>
              </li>
              <li>
                <span className="text-gray-500 fw-normal d-flex">
                  <i className="ph ph-caret-right"></i>
                </span>
              </li>
              <li>
                {selectedQuestionType ? (
                  <a
                    href="#"
                    onClick={() => {
                      setSelectedQuestionType(null);
                    }}
                    className="text-gray-200 fw-normal text-15 hover-text-main-600"
                  >
                    {questionTypes.find((t) => t.key === selectedQuestionType)
                      ?.label || "Question Type"}
                  </a>
                ) : (
                  <span className="text-gray-500 fw-normal text-15">
                    Question Type
                  </span>
                )}
              </li>
              <li>
                <span className="text-gray-500 fw-normal d-flex">
                  <i className="ph ph-caret-right"></i>
                </span>
              </li>
              <li>
                {selectedQuestionType ? (
                  <span className="text-main-600 fw-normal text-15">
                    Questions
                  </span>
                ) : (
                  <span className="text-gray-500 fw-normal text-15">
                    Questions
                  </span>
                )}
              </li>
            </ul>
          </div>
        </div>

        {subject && !selectedQuestionType && (
          <div className="row gy-4 questionTypes">
            <div className="col-sm-12">
              <div className="card mt-24">
                <div className="card-body">
                  <div className="mb-20 flex-between flex-wrap gap-8">
                    <h4 className="mb-0">Questions</h4>
                  </div>
                  <div className="Questions">
                    {questionTypes.map((type) => (
                      <div
                        className="p-xl-4 py-16 px-12 flex-between gap-8 rounded-8 border border-gray-100 hover-border-gray-200 transition-1 mb-16 questionList"
                        key={type.key}
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          setSelectedQuestionType(type.key);
                          dispatch(setQuestion(type.key));
                          handleQuestion(type.key);
                          navigate("/student/allQuestions");
                        }}
                      >
                        <div className="flex-align flex-wrap gap-8">
                          <div>
                            <h4 className="mb-0">{type.label}</h4>
                            <span className="text-13 text-gray-400">
                              Select Questions
                            </span>
                          </div>
                        </div>
                        <i className="ph ph-caret-right"></i>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default QuestionType;
