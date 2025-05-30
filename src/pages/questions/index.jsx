import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import maths from '../../assets/images/maths.png';
import { useDispatch, useSelector } from 'react-redux';
import { getLevel, getQuestion, getStudentType, getSubject, setQuestion, setSubject } from '../../_store/_reducers/auth';
import userService from '../../_services/user.service';

const Questions = () => {
    const dispatch = useDispatch();
    const [selectedSubject, setSelectedSubject] = useState(null);
    const [selectedQuestionType, setSelectedQuestionType] = useState(null);
    const [loading, setLoading] = useState(false);
    const [subjects, setSubjects] = useState([]);
    const education = useSelector(getStudentType);
    const level = useSelector(getLevel);
    const subject = useSelector(getSubject);
    const question = useSelector(getQuestion);
    const [fetchedQuestions, setFetchedQuestions] = useState([]);
    const [userAnswers, setUserAnswers] = useState({});
    const [submitted, setSubmitted] = useState(false);


    const questionTypes = [
        { key: 'mcq', label: 'MCQ' },
        { key: 'fill_blank', label: 'Fill in the blanks' },
        { key: 'true_false', label: 'True/False' },
        { key: 'linking', label: 'Linking' },
        { key: 'rearranging', label: 'Rearranging' },
        { key: 'comprehension', label: 'Comprehension' },
    ];

    useEffect(() => {
        const fetchSubjects = async () => {
            setLoading(true);
            try {
                const response = await userService.getSubject(level);
                setSubjects(response.data.data);
            } catch (err) {
                console.log(err?.response?.data?.message || 'An error occurred');
            } finally {
                setLoading(false);
            }
        };

        if (level) {
            fetchSubjects();
        }
    }, [level]);

    const handleQuestion = async (selectedType) => {
        try {
            const data = {
                education_type: education,
                level_id: level,
                subject_id: subject,
                type: selectedType || question
            };
            const response = await userService.getAllQuestion(data);
            setFetchedQuestions(response.data.data.questions_array);
            console.log(response.data.data.questions_array)
        } catch (err) {
            console.log(err?.response?.data?.message || 'Failed, please try again');
        }
    };
    const handleSelectAnswer = (questionId, blankOrLeftIdx, selectedValue) => {
        setUserAnswers((prev) => ({
            ...prev,
            [questionId]: blankOrLeftIdx !== null && blankOrLeftIdx !== undefined
                ? { ...(prev[questionId] || {}), [blankOrLeftIdx]: selectedValue }
                : selectedValue
        }));
    };


    const handleSubmit = () => {
        setSubmitted(true);
    };

    return (
        <>
            <div className="flex">
                <Sidebar />
                <div className="dashboard-main-wrapper">
                    <Navbar />
                    <div className="dashboard-body">
                        <div className="breadcrumb-with-buttons mb-24 flex-between flex-wrap gap-8">
                            <div className="breadcrumb mb-24">
                                <ul className="flex-align gap-4">
                                    <li>
                                        <a href="#"
                                            onClick={() => {
                                                setSelectedSubject(null);
                                                setSelectedQuestionType(null);
                                                setFetchedQuestions([]);
                                                setSubmitted(false);
                                                setUserAnswers({});
                                            }}
                                            className="text-gray-200 fw-normal text-15 hover-text-main-600">
                                            Back to Subjects
                                        </a>

                                    </li>
                                    <li><span className="text-gray-500 fw-normal d-flex"><i className="ph ph-caret-right"></i></span></li>
                                    <li><span className="text-main-600 fw-normal text-15">Questions</span></li>
                                </ul>
                            </div>
                        </div>
                        {!selectedSubject && (
                            <div className="row gy-4 shadowBox">
                                {loading ? (
                                    <div className="col-12 text-center">
                                        <p>Loading subjects...</p>
                                    </div>
                                ) : subjects.length > 0 ? (
                                    subjects.map((subject) => (
                                        <div className="col-sm-3" key={subject.id}>
                                            <div className="card" onClick={() => {
                                                setSelectedSubject(subject.id);
                                                dispatch(setSubject(subject.id));
                                            }}
                                                style={{ cursor: 'pointer' }}>
                                                <div className="card-body">
                                                    <div className="flex-between gap-8 mb-10">
                                                        <div className="mt-10">
                                                            <span className="flex-shrink-0 w-48 h-48 flex-center rounded-circle bg-main-600 text-white text-2xl">
                                                            </span>
                                                            <h4 className="mb-2 mt-20">{subject.subject_name}</h4>
                                                        </div>
                                                        <img src={maths} className="subject_img" alt={subject.subject_name} />
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

                        {selectedSubject && !selectedQuestionType && (
                            <div className="row gy-4 questionTypes">
                                <div className="col-sm-12">
                                    <div className="card mt-24">
                                        <div className="card-body">
                                            <div className="mb-20 flex-between flex-wrap gap-8">
                                                <h4 className="mb-0">Questions</h4>
                                            </div>
                                            <div className="Questions">
                                                {questionTypes.map((type) => (
                                                    <div className="p-xl-4 py-16 px-12 flex-between gap-8 rounded-8 border border-gray-100 hover-border-gray-200 transition-1 mb-16 questionList" key={type.key}>
                                                        <div
                                                            className="flex-align flex-wrap gap-8"
                                                            onClick={() => {
                                                                setSelectedQuestionType(type.key);
                                                                dispatch(setQuestion(type.key));
                                                                handleQuestion(type.key);
                                                            }}
                                                            style={{ cursor: 'pointer' }}
                                                        >
                                                            <div>
                                                                <h4 className="mb-0">{type.label}</h4>
                                                                <span className="text-13 text-gray-400">Select Questions</span>
                                                            </div>
                                                        </div>
                                                        <a href="assignment.html" className="text-gray-900 hover-text-main-600">
                                                            <i className="ph ph-caret-right"></i>
                                                        </a>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {selectedQuestionType === 'mcq' && (
                            <>
                                <h1>MCQ</h1>
                                {fetchedQuestions.length === 0 ? (
                                    <p>No MCQ questions found.</p>
                                ) : (
                                    fetchedQuestions.map((item, index) => {
                                        const q = item.question;
                                        return (
                                            <div key={item.id} style={{ marginBottom: '20px' }}>
                                                <p><strong>{index + 1}. {q.content}</strong></p>

                                                {q.type === 'mcq' && q.options && (
                                                    q.options.map((opt, idx) => (
                                                        <div key={idx}>
                                                            <label>
                                                                <input
                                                                    type="radio"
                                                                    name={`question_${item.id}`}
                                                                    value={opt.value}
                                                                    checked={userAnswers[item.id] === opt.value}
                                                                    onChange={() => handleSelectAnswer(item.id, null, opt.value)}
                                                                    disabled={submitted}
                                                                />
                                                                {opt.value}
                                                            </label>
                                                        </div>
                                                    ))
                                                )}
                                                {submitted && (
                                                    <>
                                                        <p><strong>Correct Answer:</strong> {q.answer?.answer}</p>
                                                        <p style={{ color: userAnswers[item.id] === q.answer?.answer ? 'green' : 'red' }}>
                                                            Your Answer: {userAnswers[item.id] || 'No answer selected'}
                                                            {userAnswers[item.id] === q.answer?.answer ? ' ✔️' : ' ❌'}
                                                        </p>
                                                    </>
                                                )}
                                            </div>
                                        );
                                    })
                                )}
                                {!submitted && fetchedQuestions.length > 0 && (
                                    <button className="btn btn-primary mt-3" onClick={handleSubmit}>
                                        Submit Answers
                                    </button>
                                )}
                            </>
                        )}


                        {selectedQuestionType === 'fill_blank' && (
                            <>
                                {fetchedQuestions.length === 0 ? (
                                    <p>No fill-in-the-blank questions found.</p>
                                ) : (
                                    fetchedQuestions.map((item, index) => {
                                        const q = item.question;
                                        let filledContent = q.content;

                                        if (submitted) {
                                            q.blanks.forEach(blank => {
                                                const userAnswer = userAnswers[item.id]?.[blank.blank_number];
                                                const displayAnswer = userAnswer
                                                    ? ` ${userAnswer}${userAnswer === blank.answer ? ' ✔️' : ' ❌'}`
                                                    : `[No answer ❌]`;
                                                filledContent = filledContent.replace('______________', displayAnswer);
                                            });
                                        }

                                        return (
                                            <div key={item.id} style={{ marginBottom: '20px' }}>
                                                <p><strong>{index + 1}. {submitted ? filledContent : q.content}</strong></p>

                                                {!submitted && q.type === 'fill_blank' && q.blanks && (
                                                    q.blanks.map((blank) => (
                                                        <div key={blank.blank_number} style={{ marginTop: '10px' }}>
                                                            <p><strong>Blank {blank.blank_number}:</strong></p>
                                                            {blank.options.map((opt, idx) => (
                                                                <div key={idx}>
                                                                    <label>
                                                                        <input
                                                                            type="radio"
                                                                            name={`question_${item.id}_blank_${blank.blank_number}`}
                                                                            value={opt}
                                                                            checked={userAnswers[item.id]?.[blank.blank_number] === opt}
                                                                            onChange={() =>
                                                                                handleSelectAnswer(item.id, blank.blank_number, opt)
                                                                            }
                                                                            disabled={submitted}
                                                                        />
                                                                        {opt}
                                                                    </label>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    ))
                                                )}

                                                {submitted && q.blanks.map(blank => (
                                                    <div key={blank.blank_number}>
                                                        <p>
                                                            Correct Answer for Blank {blank.blank_number}: <strong>{blank.answer}</strong>
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                        );
                                    })
                                )}
                                {!submitted && fetchedQuestions.length > 0 && (
                                    <button className="btn btn-primary mt-3" onClick={handleSubmit}>
                                        Submit Answers
                                    </button>
                                )}
                            </>
                        )}


                        {selectedQuestionType === 'true_false' && (
                            <>
                                {fetchedQuestions.length === 0 ? (
                                    <p>No true/false questions found.</p>
                                ) : (
                                    fetchedQuestions.map((item, index) => {
                                        const q = item.question;
                                        return (
                                            <div key={item.id} style={{ marginBottom: '20px' }}>
                                                <p><strong>{index + 1}. {q.content}</strong></p>

                                                {!submitted && (
                                                    q.options.map((opt, idx) => (
                                                        <div key={idx}>
                                                            <label>
                                                                <input
                                                                    type="radio"
                                                                    name={`question_${item.id}`}
                                                                    value={opt.value}
                                                                    checked={userAnswers[item.id] === opt.value}
                                                                    onChange={() => handleSelectAnswer(item.id, null, opt.value)}
                                                                    disabled={submitted}
                                                                />
                                                                {opt.value}
                                                            </label>
                                                        </div>
                                                    ))
                                                )}

                                                {submitted && (
                                                    <>
                                                        <p><strong>Correct Answer:</strong> {q.answer.choice}</p>
                                                        <p style={{
                                                            color: userAnswers[item.id] === q.answer.choice ? 'green' : 'red'
                                                        }}>
                                                            Your Answer: {userAnswers[item.id] || 'No answer selected'}
                                                            {userAnswers[item.id] === q.answer.choice ? ' ✔️' : ' ❌'}
                                                        </p>
                                                    </>
                                                )}
                                            </div>
                                        );
                                    })
                                )}
                                {!submitted && fetchedQuestions.length > 0 && (
                                    <button className="btn btn-primary mt-3" onClick={handleSubmit}>
                                        Submit Answers
                                    </button>
                                )}
                            </>
                        )}

                        {selectedQuestionType === 'linking' && (
                            <>
                                {fetchedQuestions.length === 0 ? (
                                    <p>No linking questions found.</p>
                                ) : (
                                    fetchedQuestions.map((item, index) => {
                                        const q = item.question;

                                        return (
                                            <div key={item.id} style={{ marginBottom: '20px' }}>
                                                <p><strong>{index + 1}. {q.content}</strong></p>

                                                {q.type === 'linking' && q.answer && (
                                                    q.answer.map((pair, leftIdx) => (
                                                        <div key={leftIdx} style={{ marginBottom: '20px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
                                                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                                <strong>Left:</strong>
                                                                {pair.left.match_type === 'text' ? (
                                                                    <span>{pair.left.word}</span>
                                                                ) : (
                                                                    <img src={pair.left.image_uri} alt="left" style={{ width: '50px', height: '50px' }} />
                                                                )}
                                                            </div>
                                                            {!submitted && (
                                                                q.answer.map((option, rightIdx) => (
                                                                    <div key={rightIdx} style={{ marginLeft: '20px' }}>
                                                                        <label>
                                                                            <input
                                                                                type="radio"
                                                                                name={`question_${item.id}_left_${leftIdx}`}
                                                                                value={rightIdx}
                                                                                checked={parseInt(userAnswers[item.id]?.[leftIdx]) === rightIdx}
                                                                                onChange={() => handleSelectAnswer(item.id, leftIdx, rightIdx)}
                                                                                disabled={submitted}
                                                                            />
                                                                            {option.right.match_type === 'text'
                                                                                ? option.right.word
                                                                                : <img src={option.right.image_uri} alt="right" style={{ width: '50px', height: '50px' }} />}
                                                                        </label>
                                                                    </div>
                                                                ))
                                                            )}

                                                            {submitted && (
                                                                <>
                                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '10px' }}>
                                                                        <strong>Correct Match:</strong>
                                                                        {pair.right.match_type === 'text' ? (
                                                                            <span>{pair.right.word}</span>
                                                                        ) : (
                                                                            <img src={pair.right.image_uri} alt="right" style={{ width: '50px', height: '50px' }} />
                                                                        )}
                                                                    </div>

                                                                    <div style={{
                                                                        display: 'flex',
                                                                        alignItems: 'center',
                                                                        gap: '10px',
                                                                        marginTop: '5px',
                                                                        color: parseInt(userAnswers[item.id]?.[leftIdx]) === leftIdx ? 'green' : 'red'
                                                                    }}>
                                                                        <strong>Your Match:</strong>
                                                                        {userAnswers[item.id]?.[leftIdx] !== undefined
                                                                            ? (
                                                                                q.answer[userAnswers[item.id][leftIdx]].right.match_type === 'text'
                                                                                    ? <span>{q.answer[userAnswers[item.id][leftIdx]].right.word}</span>
                                                                                    : <img src={q.answer[userAnswers[item.id][leftIdx]].right.image_uri} alt="your match" style={{ width: '50px', height: '50px' }} />
                                                                            )
                                                                            : 'No match'
                                                                        }
                                                                        {parseInt(userAnswers[item.id]?.[leftIdx]) === leftIdx ? ' ✔️' : ' ❌'}
                                                                    </div>
                                                                </>
                                                            )}
                                                        </div>
                                                    ))
                                                )}
                                            </div>
                                        );
                                    })
                                )}
                                {!submitted && fetchedQuestions.length > 0 && (
                                    <button className="btn btn-primary mt-3" onClick={handleSubmit}>
                                        Submit Matches
                                    </button>
                                )}
                            </>
                        )}

                    </div>
                    <Footer />
                </div>
            </div>
        </>
    );
};

export default Questions;
