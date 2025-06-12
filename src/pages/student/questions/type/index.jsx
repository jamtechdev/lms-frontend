import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  getLevel,
  getQuestion,
  getStudentType,
  getSubject,
  setFetchedQuestionArray,
  setQuestion,
  setSubject,
} from "../../../../_store/_reducers/auth";
import userService from "../../../../_services/user.service";
import { Link, useNavigate } from "react-router-dom";
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
    { key: "true_false", label: "True/False" },
    { key: "linking", label: "Linking" },
    { key: "rearranging", label: "Rearranging" },
    { key: "grammar_cloze_with_options", label: "Grammar Cloze (With Options)" },
    { key: "underlinecorrect", label: "Underline Correct" },
    { key: "comprehension", label: "Comprehension" },
    { key: "editing", label: "Editing" },
  ];

  const handleQuestion = async (selectedType) => {
    navigate(`/student/all-questions?type=${selectedType?.key}`);
    // try {
    //   const data = {
    //     education_type: education,
    //     level_id: level,
    //     subject_id: subject,
    //     type: selectedType?.key || question,
    //   };
    //   const response = await userService.getAllQuestion(data);
    //   dispatch(setFetchedQuestionArray(response.data.questions_array));
    // } catch (err) {
    //   console.log(err?.response?.data?.message || "Failed, please try again");
    // }
  };

  useEffect(() => {
    dispatch(setFetchedQuestionArray([]));
  }, []);
  return (
    <>
      <div className="dashboard-body">
        <div className="breadcrumb-with-buttons mb-24 flex-between flex-wrap gap-8">
          <div className="breadcrumb mb-24">
            <ul className="flex-align gap-4">
              <li>
                <Link to="/student/subjects"
                  className="text-gray-200 fw-normal text-15 hover-text-main-600"
                >
                  Back to Subjects
                </Link>
              </li>
              <li>
                <span className="text-gray-500 fw-normal d-flex">
                  <i className="ph ph-caret-right"></i>
                </span>
              </li>
              <li>
                <Link to="/student/topics"
                  className="text-gray-200 fw-normal text-15 hover-text-main-600"
                >
                  Topics
                </Link>
              </li>
              <li>
                <span className="text-gray-500 fw-normal d-flex">
                  <i className="ph ph-caret-right"></i>
                </span>
              </li>
              <li>
                <span className="text-main-600 fw-normal text-15">
                  Question Type
                </span>
              </li>
              <li>
                <span className="text-gray-500 fw-normal d-flex">
                  <i className="ph ph-caret-right"></i>
                </span>
              </li>
              <li>
                <span className="text-gray-500 fw-normal text-15">
                  Questions
                </span>
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
                          handleQuestion(type);
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
