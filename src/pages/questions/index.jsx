import React from 'react';
import graph from '../../assets/images/graph1.png';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import course from '../../assets/images/course.png';

const Questions = () => {
    return <>
        <div className="preloader">
            <div className="loader"></div>
        </div>
        <div className="side-overlay"></div>
        <div className='flex '>
            <Sidebar />
            <div className="dashboard-main-wrapper">
                <Navbar />
                <div className="dashboard-body">
                    <div className="row gy-4 shadowBox">
                        <div className="col-xxl-12">
                            <div className="row gy-4">
                                <div className="col-sm-3">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="flex-between gap-8 mb-24">
                                                <span className="flex-shrink-0 w-48 h-48 flex-center rounded-circle bg-main-600 text-white text-2xl"><i className="ph ph-graduation-cap"></i></span>
                                                <img src={graph} className="rounded-circle" />
                                            </div>
                                            <h4 className="mb-2">Level 1</h4>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-3">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="flex-between gap-8 mb-24">
                                                <span className="flex-shrink-0 w-48 h-48 flex-center rounded-circle bg-main-two-600 text-white text-2xl"><i className="ph ph-graduation-cap"></i></span>
                                                <img src={graph} className="rounded-circle" />
                                            </div>
                                            <h4 className="mb-2">Level 2</h4>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-3">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="flex-between gap-8 mb-24">
                                                <span className="flex-shrink-0 w-48 h-48 flex-center rounded-circle bg-main-600 text-white text-2xl"><i className="ph ph-graduation-cap"></i></span>
                                                <img src={graph} className="rounded-circle" />
                                            </div>
                                            <h4 className="mb-2">Level 3</h4>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-3">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="flex-between gap-8 mb-24">
                                                <span className="flex-shrink-0 w-48 h-48 flex-center rounded-circle bg-main-two-600 text-white text-2xl"><i className="ph ph-graduation-cap"></i></span>
                                                <img src={graph} className="rounded-circle" />
                                            </div>
                                            <h4 className="mb-2">Level 4</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="dashboard-body">
                    <div className="row gy-4 shadowBox">
                        <div className="col-xxl-12">
                            <div className="row gy-4">
                                <div className="col-sm-3">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="flex-between gap-8 mb-24">
                                                <span className="flex-shrink-0 w-48 h-48 flex-center rounded-circle bg-main-600 text-white text-2xl"><i className="ph ph-graduation-cap"></i></span>
                                                <img src={graph} className="rounded-circle" />
                                            </div>
                                            <h4 className="mb-2">Level 5</h4>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-3">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="flex-between gap-8 mb-24">
                                                <span className="flex-shrink-0 w-48 h-48 flex-center rounded-circle bg-main-two-600 text-white text-2xl"><i className="ph ph-graduation-cap"></i></span>
                                                <img src={graph} className="rounded-circle" />
                                            </div>
                                            <h4 className="mb-2">Level 6</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xxl-12">
                    <h4 class="mb-20">Subjects</h4>
                    <div className="row gy-4">
                        <div className="col-sm-3">
                            <div className="card">
                                <div className="card-body">
                                    <div className="flex-between gap-8 mb-24">
                                        <span className="flex-shrink-0 w-48 h-48 flex-center rounded-circle bg-main-600 text-white text-2xl"><i className="ph ph-graduation-cap"></i></span>
                                        <img src={course} className="w-72" width="" />
                                    </div>
                                    <h4 className="mb-2">Maths</h4>
                                    <span className="text-gray-300">Completed Courses</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="card">
                                <div className="card-body">
                                    <div className="flex-between gap-8 mb-24">
                                        <span className="flex-shrink-0 w-48 h-48 flex-center rounded-circle bg-main-two-600 text-white text-2xl"><i className="ph ph-graduation-cap"></i></span>
                                        <img src={course} className="w-72" width="" />
                                    </div>
                                    <h4 className="mb-2">English</h4>
                                    <span className="text-gray-300">Completed Courses</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="card">
                                <div className="card-body">
                                    <div className="flex-between gap-8 mb-24">
                                        <span className="flex-shrink-0 w-48 h-48 flex-center rounded-circle bg-main-600 text-white text-2xl"><i className="ph ph-graduation-cap"></i></span>
                                        <img src={course} className="w-72" width="" />
                                    </div>
                                    <h4 className="mb-2">Chinese</h4>
                                    <span className="text-gray-300">Completed Courses</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="card">
                                <div className="card-body">
                                    <div className="flex-between gap-8 mb-24">
                                        <span className="flex-shrink-0 w-48 h-48 flex-center rounded-circle bg-main-two-600 text-white text-2xl"><i className="ph ph-graduation-cap"></i></span>
                                        <img src={course} className="w-72" width="" />
                                    </div>
                                    <h4 className="mb-2">Science</h4>
                                    <span className="text-gray-300">Completed Courses</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row gy-4">
                    <div className="col-sm-6">
                        <div className="card mt-24">
                            <div className="card-body">
                                <div className="mb-20 flex-between flex-wrap gap-8">
                                    <h4 className="mb-0">Questions</h4>
                                    <a href="assignment.html" class="text-13 fw-medium text-main-600 hover-text-decoration-underline">See All</a>
                                </div>
                                <div className="p-xl-4 py-16 px-12 flex-between gap-8 rounded-8 border border-gray-100 hover-border-gray-200 transition-1 mb-16">
                                    <div className="flex-align flex-wrap gap-8">
                                        <span className="text-main-600 bg-main-50 w-44 h-44 rounded-circle flex-center text-2xl flex-shrink-0"><i class="ph-fill ph-graduation-cap"></i></span>
                                        <div>
                                            <h6 className="mb-0">MCQ</h6>
                                            <span className="text-13 text-gray-400">Due in 9 days</span>
                                        </div>
                                    </div>
                                    <a href="assignment.html" className="text-gray-900 hover-text-main-600"><i className="ph ph-caret-right"></i></a>
                                </div>
                                <div className="p-xl-4 py-16 px-12 flex-between gap-8 rounded-8 border border-gray-100 hover-border-gray-200 transition-1 mb-16">
                                    <div className="flex-align flex-wrap gap-8">
                                        <span className="text-main-600 bg-main-50 w-44 h-44 rounded-circle flex-center text-2xl flex-shrink-0"><i class="ph ph-code"></i></span>
                                        <div>
                                            <h6 className="mb-0">Fill in the blanks</h6>
                                            <span className="text-13 text-gray-400">Due in 2 days</span>
                                        </div>
                                    </div>
                                    <a href="assignment.html" className="text-gray-900 hover-text-main-600"><i className="ph ph-caret-right"></i></a>
                                </div>
                                <div className="p-xl-4 py-16 px-12 flex-between gap-8 rounded-8 border border-gray-100 hover-border-gray-200 transition-1">
                                    <div className="flex-align flex-wrap gap-8">
                                        <span className="text-main-600 bg-main-50 w-44 h-44 rounded-circle flex-center text-2xl flex-shrink-0"><i className="ph ph-bezier-curve"></i></span>
                                        <div>
                                            <h6 className="mb-0">Short Questions</h6>
                                            <span className="text-13 text-gray-400">Due in 5 days</span>
                                        </div>
                                    </div>
                                    <a href="assignment.html" className="text-gray-900 hover-text-main-600"><i className="ph ph-caret-right"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-sm-12'>
                        <div className="row gy-4">
                            <div className='col-sm-6'>
                                <div className="quiz-container">
                                    <h2 className="text-start mb-5 text-primary fw-bold">General Knowledge Quiz</h2>
                                    <br></br>
                                    <div className="question-card">
                                        <p className="question-text">1. What is the capital of France?</p>
                                        <div className="form-check option-item">
                                            <input className="form-check-input" type="radio" name="question1" id="q1_optionA" value="A" />
                                            <label className="form-check-label" for="q1_optionA">
                                                Berlin
                                            </label>
                                        </div>
                                        <div className="form-check option-item">
                                            <input className="form-check-input" type="radio" name="question1" id="q1_optionB" value="B" />
                                            <label className="form-check-label" for="q1_optionB">
                                                Madrid
                                            </label>
                                        </div>
                                        <div className="form-check option-item">
                                            <input className="form-check-input" type="radio" name="question1" id="q1_optionC" value="C" />
                                            <label className="form-check-label" for="q1_optionC">
                                                Paris
                                            </label>
                                        </div>
                                        <div className="form-check option-item">
                                            <input className="form-check-input" type="radio" name="question1" id="q1_optionD" value="D" />
                                            <label className="form-check-label" for="q1_optionD">
                                                Rome
                                            </label>
                                        </div>
                                    </div>
                                    <div className="question-card">
                                        <p className="question-text">2. Which planet is known as the "Red Planet"?</p>
                                        <div className="form-check option-item">
                                            <input className="form-check-input" type="radio" name="question2" id="q2_optionA" value="A" />
                                            <label className="form-check-label" for="q2_optionA">
                                                Earth
                                            </label>
                                        </div>
                                        <div className="form-check option-item">
                                            <input className="form-check-input" type="radio" name="question2" id="q2_optionB" value="B" />
                                            <label className="form-check-label" for="q2_optionB">
                                                Mars
                                            </label>
                                        </div>
                                        <div className="form-check option-item">
                                            <input className="form-check-input" type="radio" name="question2" id="q2_optionC" value="C" />
                                            <label className="form-check-label" for="q2_optionC">
                                                Jupiter
                                            </label>
                                        </div>
                                        <div className="form-check option-item">
                                            <input className="form-check-input" type="radio" name="question2" id="q2_optionD" value="D" />
                                            <label className="form-check-label" for="q2_optionD">
                                                Venus
                                            </label>
                                        </div>
                                    </div>
                                    <div className="question-card">
                                        <p className="question-text">3. What is the largest ocean on Earth?</p>
                                        <div className="form-check option-item">
                                            <input className="form-check-input" type="radio" name="question3" id="q3_optionA" value="A" />
                                            <label className="form-check-label" for="q3_optionA">
                                                Atlantic Ocean
                                            </label>
                                        </div>
                                        <div className="form-check option-item">
                                            <input className="form-check-input" type="radio" name="question3" id="q3_optionB" value="B" />
                                            <label className="form-check-label" for="q3_optionB">
                                                Indian Ocean
                                            </label>
                                        </div>
                                        <div className="form-check option-item">
                                            <input className="form-check-input" type="radio" name="question3" id="q3_optionC" value="C" />
                                            <label className="form-check-label" for="q3_optionC">
                                                Arctic Ocean
                                            </label>
                                        </div>
                                        <div className="form-check option-item">
                                            <input className="form-check-input" type="radio" name="question3" id="q3_optionD" value="D" />
                                            <label className="form-check-label" for="q3_optionD">
                                                Pacific Ocean
                                            </label>
                                        </div>
                                    </div>
                                    <div className="text-center mt-4">
                                        <button className="btn btn-primary">Submit Answers</button>
                                    </div>
                                </div>
                            </div>
                            <div className='col-sm-6'>
                                <div className="quiz-container">
                                    <h2 className="text-start mb-5 text-primary fw-bold">Complete the Sentences</h2>
                                    <br></br>
                                    <div className="question-card">
                                        <p className="question-text">1. The capital of Japan is ________.</p>
                                        <div className="blank-item">
                                            <label for="q1_blank1" className="form-label">Answer:</label>
                                            <input type="text" className="form-control" id="q1_blank1" placeholder="Type your answer here" />
                                        </div>
                                    </div>
                                    <div className="question-card">
                                        <p className="question-text">2. Water boils at ________ degrees Celsius.</p>
                                        <div className="blank-item">
                                            <label for="q2_blank1" className="form-label">Answer:</label>
                                            <input type="text" className="form-control" id="q2_blank1" placeholder="Type your answer here" />
                                        </div>
                                    </div>
                                    <div className="question-card">
                                        <p className="question-text">3. The largest mammal on Earth is the ________ whale.</p>
                                        <div className="blank-item">
                                            <label for="q3_blank1" class="form-label">Answer:</label>
                                            <input type="text" class="form-control" id="q3_blank1" placeholder="Type your answer here" />
                                        </div>
                                    </div>
                                    <div className="text-center mt-4">
                                        <button className="btn btn-primary">Submit Answers</button>
                                    </div>
                                </div>
                            </div>
                            <div className='col-sm-6'>
                                <div className="qa-container">
                                    <h2 className="text-start  mb-5 text-primary fw-bold">Short Answer Questions</h2>
                                    <br></br>
                                    <div className="question-card">
                                        <p className="question-text">1. Explain the concept of photosynthesis in your own words.</p>
                                        <div className="answer-item">
                                            <label for="q1_answer" className="form-label">Your Answer:</label>
                                            <textarea className="form-control" id="q1_answer" rows="4" placeholder="Write your answer here..."></textarea>
                                        </div>
                                    </div>
                                    <div className="question-card">
                                        <p claclassNamess="question-text">2. What are the main differences between a democracy and a republic?</p>
                                        <div className="answer-item">
                                            <label for="q2_answer" className="form-label">Your Answer:</label>
                                            <textarea className="form-control" id="q2_answer" rows="4" placeholder="Write your answer here..."></textarea>
                                        </div>
                                    </div>
                                    <div className="question-card">
                                        <p className="question-text">3. Describe the primary function of the human heart.</p>
                                        <div className="answer-item">
                                            <label for="q3_answer" className="form-label">Your Answer:</label>
                                            <textarea className="form-control" id="q3_answer" rows="4" placeholder="Write your answer here..."></textarea>
                                        </div>
                                    </div>
                                    <div className="text-center mt-4">
                                        <button className="btn btn-primary">Submit Answers</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <br></br>
                        <br></br>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    </>;
};
export default Questions;