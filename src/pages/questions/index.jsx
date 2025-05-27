import React, { useState } from 'react';
import graph from '../../assets/images/graph1.png';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import course from '../../assets/images/course.png';

const Questions = () => {
    const [selectedLevel, setSelectedLevel] = useState(null);
    const [selectedSubject, setSelectedSubject] = useState(null);
    const [selectedQuestionType, setSelectedQuestionType] = useState(null);

    const levels = [
        { level: 1, icon: 'ph ph-number-circle-one' },
        { level: 2, icon: 'ph ph-number-circle-two' },
        { level: 3, icon: 'ph ph-number-circle-three' },
        { level: 4, icon: 'ph ph-number-circle-four' },
        { level: 5, icon: 'ph ph-number-circle-five' },
        { level: 6, icon: 'ph ph-number-circle-six' }
    ];
    const subjects = [
        { name: 'Maths', icon: 'ph ph-math-operations' },
        { name: 'English', icon: 'ph ph-book-open' },
        { name: 'Chinese', icon: 'ph ph-translate' },
        { name: 'Science', icon: 'ph ph-microscope' }
    ];
    const questionTypes = ['MCQ', 'Fill in the blanks', 'Short Questions'];

    return (
        <>
            <div className="flex">
                <Sidebar />
                <div className="dashboard-main-wrapper">
                    <Navbar />
                    <div className="dashboard-body">
                        {!selectedLevel && (
                            <div className="row gy-4 shadowBox">
                                {levels.map(({ level, icon }) => (
                                    <div className="col-sm-3" key={level}>
                                        <div className="card" onClick={() => setSelectedLevel(level)} style={{ cursor: 'pointer' }}>
                                            <div className="card-body">
                                                <div className="flex-between gap-8 mb-24">
                                                    <span className={`flex-shrink-0 w-48 h-48 flex-center rounded-circle ${level % 2 === 0 ? 'bg-main-two-600' : 'bg-main-600'} text-white text-2xl`}>
                                                        <i className={icon}></i>
                                                    </span>
                                                    <img src={graph} className="rounded-circle" alt={`Level ${level}`} />
                                                </div>
                                                <h4 className="mb-2">Level {level}</h4>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {selectedLevel && !selectedSubject && (
                            <div className="row gy-4 shadowBox">
                                {subjects.map((subject) => (
                                    <div className="col-sm-3" key={subject.name}>
                                        <div className="card" onClick={() => setSelectedSubject(subject.name)} style={{ cursor: 'pointer' }}>
                                            <div className="card-body">
                                                <div className="flex-between gap-8 mb-24">
                                                    <span className="flex-shrink-0 w-48 h-48 flex-center rounded-circle bg-main-600 text-white text-2xl">
                                                        <i className={subject.icon}></i>
                                                    </span>
                                                    <img src={course} className="w-72" />
                                                </div>
                                                <h4 className="mb-2">{subject.name}</h4>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <button className="btn btn-secondary mt-3" onClick={() => setSelectedLevel(null)}>Back to Levels</button>
                            </div>
                        )}
                        {selectedLevel && selectedSubject && !selectedQuestionType && (
                            <div className="row gy-4 shadowBox">
                                {questionTypes.map((type) => (
                                    <div className="col-sm-3" key={type}>
                                        <div className="card" onClick={() => setSelectedQuestionType(type)} style={{ cursor: 'pointer' }}>
                                            <div className="card-body">
                                                <h4 className="mb-2">{type}</h4>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <button className="btn btn-secondary mt-3" onClick={() => setSelectedSubject(null)}>Back to Subjects</button>
                            </div>
                        )}
                        {selectedLevel && selectedSubject && selectedQuestionType && (
                            <div className="shadowBox">
                                <h2>{selectedQuestionType} for {selectedSubject} - Level {selectedLevel}</h2>
                                {selectedQuestionType === 'MCQ' && (
                                    <div>
                                        <p>1. What is the capital of France?</p>
                                    </div>
                                )}
                                {selectedQuestionType === 'Fill in the blanks' && (
                                    <div>
                                        <p>1. The capital of Japan is ________.</p>
                                    </div>
                                )}
                                {selectedQuestionType === 'Short Questions' && (
                                    <div>
                                        <p>1. Explain the concept of photosynthesis.</p>
                                    </div>
                                )}
                                <button className="btn btn-secondary mt-3" onClick={() => setSelectedQuestionType(null)}>Back to Question Types</button>
                            </div>
                        )}
                    </div>
                    <Footer />
                </div>
            </div>
        </>
    );
};

export default Questions;
