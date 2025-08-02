import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getSubject,
  setFetchedQuestionArray,
} from "../../../../_store/_reducers/auth";
import { useNavigate } from "react-router-dom";

const QuestionType = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedQuestionType, setSelectedQuestionType] = useState(null);
  const subject = useSelector(getSubject);

  const questionTypes = [
    { key: "mcq", label: "MCQ" },
    { key: "true_false", label: "True/False" },
    { key: "linking", label: "Linking" },
    { key: "rearranging", label: "Rearranging" },
    { key: "open_cloze_with_options", label: "Open Close With Options" },
    {
      key: "open_cloze_with_dropdown_options",
      label: "Open Close With Dropdown",
    },
    { key: "comprehension", label: "Comprehension" },
    { key: "editing", label: "Editing" },
    { key: "fill_in_the_blank", label: "Fill in the blank" },
  ];

  const handleQuestion = async (selectedType) => {
    navigate(`/student/all-questions?type=${selectedType?.key}`);
  };

  useEffect(() => {
    dispatch(setFetchedQuestionArray([]));
  }, []);
  return (
    <>
      <div className="dashboard-body">
        {subject && !selectedQuestionType && (
          <div className="row gy-4 questionTypes">
            <div className="col-sm-12 mt-0">
              <div className="card mt-0">
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
