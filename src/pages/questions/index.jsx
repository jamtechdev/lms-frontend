import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import maths from '../../assets/images/maths.png';
import { useSelector } from 'react-redux';
import { getStudentType } from '../../_store/_reducers/auth';

const Questions = () => {
    const [selectedSubject, setSelectedSubject] = useState(null);
    const [selectedQuestionType, setSelectedQuestionType] = useState(null);
 const education = useSelector(getStudentType);
    const subjects = [
        { name: 'Maths', icon: 'ph ph-math-operations' },
        { name: 'English', icon: 'ph ph-book-open' },
        { name: 'Chinese', icon: 'ph ph-translate' },
        { name: 'Science', icon: 'ph ph-microscope' }
    ];
    const questionTypes = ['MCQ', 'Fill in the blanks', 'True/False', 'Linking'];

    return (
        <>
            <div className="flex">
                <Sidebar />
                <div className="dashboard-main-wrapper">
                    <Navbar />
                    
                    <div className="dashboard-body">

                        <div class="breadcrumb-with-buttons mb-24 flex-between flex-wrap gap-8">

                            <div class="breadcrumb mb-24">
                                <ul class="flex-align gap-4">
                                    <li><a href="#" onClick={() => setSelectedSubject(null)} class="text-gray-200 fw-normal text-15 hover-text-main-600">Back to Subjects</a></li>
                                    <li> <span class="text-gray-500 fw-normal d-flex"><i class="ph ph-caret-right"></i></span> </li>
                                    <li><span class="text-main-600 fw-normal text-15">Questions</span></li>
                                </ul>
                            </div>

                        </div>


                        {!selectedSubject && (
                            <div className="row gy-4 shadowBox">
                                {subjects.map((subject) => (
                                    <div className="col-sm-3" key={subject.name}>
                                        <div className="card" onClick={() => setSelectedSubject(subject.name)} style={{ cursor: 'pointer' }}>
                                            <div className="card-body">
                                                <div className="flex-between gap-8 mb-10">
                                                    <div className="mt-10">
                                                        <span className="flex-shrink-0 w-48 h-48 flex-center rounded-circle bg-main-600 text-white text-2xl">
                                                        <i className={subject.icon}></i>
                                                        </span>
                                                        <h4 className="mb-2 mt-20">{subject.name}</h4>
                                                    </div>
                                                    <img src={maths} className="subject_img" />
                                                </div>
                                                
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {selectedSubject && !selectedQuestionType && (
                        <div className="row gy-4 questionTypes">
                            <div className="col-sm-12">
                                <div className="card mt-24">
                                    <div className="card-body">
                                        <div className="mb-20 flex-between flex-wrap gap-8">
                                            <h4 className="mb-0">Questions</h4>
                                            <a href="#" class="text-13 fw-medium text-main-600 hover-text-decoration-underline">See All</a>
                                        </div>
                                        <div className="Questions">
                                            {questionTypes.map((type) => (
                                            <div className="p-xl-4 py-16 px-12 flex-between gap-8 rounded-8 border border-gray-100 hover-border-gray-200 transition-1 mb-16 questionList" key={type}>
                                                <div className="flex-align flex-wrap gap-8" onClick={() => setSelectedQuestionType(type)} style={{ cursor: 'pointer' }}>
                                           
                                                    <div>
                                                        <h4 className="mb-0">{type}</h4>
                                                        <span className="text-13 text-gray-400">Select Questions</span>
                                                    </div>
                                                </div>
                                                <a href="assignment.html" className="text-gray-900 hover-text-main-600"><i className="ph ph-caret-right"></i></a>
                                            </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        )}

                        {/* {selectedSubject && !selectedQuestionType && (
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
                        )} */}

                        {selectedSubject && selectedQuestionType && (
                            <div className="shadowBox">
                                <h2>{selectedQuestionType} for {selectedSubject}</h2>

                                {selectedQuestionType === 'MCQ' && (
                                    <div>
                                        <h2>Multiple Choice Questions</h2>
                                        <p>1. What is the capital of France?</p>
                                        <ol type="A">
                                            <li>Berlin</li>
                                            <li>Madrid</li>
                                            <li>Paris</li>
                                            <li>Rome</li>
                                        </ol>
                                        <p><strong>Answer:</strong> Paris</p>

                                        <p>2. Which gas do plants absorb from the atmosphere?</p>
                                        <ol type="A">
                                            <li>Oxygen</li>
                                            <li>Carbon dioxide</li>
                                            <li>Hydrogen</li>
                                            <li>Nitrogen</li>
                                        </ol>
                                        <p><strong>Answer:</strong> Carbon dioxide</p>

                                        <p>3. Which planet is known as the Red Planet?</p>
                                        <ol type="A">
                                            <li>Earth</li>
                                            <li>Venus</li>
                                            <li>Mars</li>
                                            <li>Jupiter</li>
                                        </ol>
                                        <p><strong>Answer:</strong> Mars</p>

                                        <p>4. Who wrote "Romeo and Juliet"?</p>
                                        <ol type="A">
                                            <li>Charles Dickens</li>
                                            <li>William Shakespeare</li>
                                            <li>Leo Tolstoy</li>
                                            <li>Mark Twain</li>
                                        </ol>
                                        <p><strong>Answer:</strong> William Shakespeare</p>

                                        <p>5. What is the largest ocean on Earth?</p>
                                        <ol type="A">
                                            <li>Atlantic</li>
                                            <li>Indian</li>
                                            <li>Arctic</li>
                                            <li>Pacific</li>
                                        </ol>
                                        <p><strong>Answer:</strong> Pacific</p>
                                    </div>
                                )}

                                {selectedQuestionType === 'Fill in the blanks' && (
                                    <div>
                                        <h2>Fill in the Blanks</h2>
                                        <p>1. The capital of Japan is ________.</p>
                                        <p>Options: A) Tokyo B) Osaka</p>
                                        <p><strong>Answer:</strong> Tokyo</p>

                                        <p>2. The chemical formula of water is ________.</p>
                                        <p>Options: A) H₂O B) CO₂</p>
                                        <p><strong>Answer:</strong> H₂O</p>

                                        <p>3. ________ is the largest mammal on Earth.</p>
                                        <p>Options: A) Blue Whale B) Elephant</p>
                                        <p><strong>Answer:</strong> Blue Whale</p>

                                        <p>4. The sun rises in the ________.</p>
                                        <p>Options: A) West B) East</p>
                                        <p><strong>Answer:</strong> East</p>

                                        <p>5. The process of solid changing directly into gas is called ________.</p>
                                        <p>Options: A) Sublimation B) Condensation</p>
                                        <p><strong>Answer:</strong> Sublimation</p>
                                    </div>
                                )}

                                {selectedQuestionType === 'True/False' && (
                                    <div className="trueFalse">

                                        <h4>1. Photosynthesis occurs only at night.</h4>
                                        <h5><span>Options:</span> &nbsp; A) True &nbsp; B) False</h5>
                                        <p><strong>Answer:</strong> False</p>
                                        <br></br>
                                        <h4>2. Humans have four lungs.</h4>
                                        <h5><span>Options:</span> &nbsp; A) True &nbsp; B) False</h5>
                                        <p><strong>Answer:</strong> False</p>
                                        <br></br>
                                        <h4>3. Water boils at 100°C.</h4>
                                        <h5><span>Options:</span> &nbsp; A) True &nbsp; B) False</h5>
                                        <p><strong>Answer:</strong> True</p>
                                        <br></br>
                                        <h4>4. Lightning is hotter than the surface of the sun.</h4>
                                        <h5><span>Options:</span> &nbsp; A) True &nbsp; B) False</h5>
                                        <p><strong>Answer:</strong> True</p>
                                        <br></br>
                                        <h4>5. The human heart has three chambers.</h4>
                                        <h5><span>Options:</span> &nbsp; A) True &nbsp; B) False</h5>
                                        <p><strong>Answer:</strong> False</p>
                                    </div>
                                )}

                                {selectedQuestionType === 'Linking' && (
                                    <div>
                                        <h2>Match the Column</h2>
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>Column A</th>
                                                    <th>Column B</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr><td>1. Photosynthesis</td><td>A. Conversion of sunlight into food</td></tr>
                                                <tr><td>2. Gravity</td><td>B. Pulling force towards Earth</td></tr>
                                                <tr><td>3. Evaporation</td><td>C. Liquid changing to gas</td></tr>
                                                <tr><td>4. Erosion</td><td>D. Wearing away of land</td></tr>
                                                <tr><td>5. Atom</td><td>E. Smallest unit of matter</td></tr>
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                                <br></br>
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
