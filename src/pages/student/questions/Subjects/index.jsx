import React, { useEffect, useState } from "react";
import maths from "../../../../assets/images/maths.png";
import { useDispatch, useSelector } from "react-redux";
import {
    getLevel,
    getQuestion,
    getStudentType,
    getSubject,
    setQuestion,
    setSubject,
} from "../../../../_store/_reducers/auth";
import userService from "../../../../_services/user.service";
import parse from "html-react-parser";
import { useNavigate } from "react-router-dom";

const Subject = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [selectedSubject, setSelectedSubject] = useState(null);
    const [selectedQuestionType, setSelectedQuestionType] = useState(null);
    const [loading, setLoading] = useState(false);
    const [subjects, setSubjects] = useState([]);
    const level = useSelector(getLevel);
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


    useEffect(() => {
        const fetchSubjects = async () => {
            setLoading(true);
            try {
                const response = await userService.getSubject(level);
                setSubjects(response.data);
            } catch (err) {
                console.log(err?.response?.data?.message || "An error occurred");
            } finally {
                setLoading(false);
            }
        };

        if (level) {
            fetchSubjects();
        }
    }, [level]);

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
                                        setSelectedSubject(null);
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
                                    <span className="text-main-600 lfw-normal text-15">
                                        Questions
                                    </span>
                                ) : (
                                    <span className="text-gray-500 fw-normal text-15">
                                        Topics
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
                                <span className="text-gray-500 fw-normal text-15">
                                    Questions
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>

                {!selectedSubject && (
                    <div className="row gy-4 shadowBox">
                        {loading ? (
                            <div className="col-12 text-center">
                                <p>Loading subjects...</p>
                            </div>
                        ) : Array.isArray(subjects) && subjects.length > 0 ? (
                            subjects.map((subject) => (
                                <div className="col-sm-3" key={subject.id}>
                                    <div
                                        className="card"
                                        onClick={() => {
                                            setSelectedSubject(subject.id);
                                            dispatch(setSubject(subject.id));
                                            navigate("/student/topics");
                                        }}
                                        style={{ cursor: "pointer" }}
                                    >
                                        <div className="card-body">
                                            <div className="flex-between gap-8 mb-10">
                                                <div className="mt-10">
                                                    <span className="flex-shrink-0 w-48 h-48 flex-center rounded-circle bg-main-600 text-white text-2xl">
                                                        <i className="ph ph-graduation-cap"></i>
                                                    </span>
                                                    <h4 className="mb-2 mt-20">{subject.subject_name}</h4>
                                                </div>
                                                <img
                                                    src={maths}
                                                    className="subject_img"
                                                    alt={subject.subject_name}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-12 text-center">
                                <p>No subjects available.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </>
    )
}
export default Subject;