import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import maths from '../../assets/images/maths.png';
import { useSelector } from 'react-redux';
import { getLevel, getStudentType } from '../../_store/_reducers/auth';
import userService from '../../_services/user.service';

const Questions = () => {
    const [selectedSubject, setSelectedSubject] = useState(null);
    const [selectedQuestionType, setSelectedQuestionType] = useState(null);
    const [loading, setLoading] = useState(false);
    const [subjects, setSubjects] = useState([]);
    const education = useSelector(getStudentType);
    const level = useSelector(getLevel);

    const questionTypes = [
        { key: 'mcq', label: 'MCQ' },
        { key: 'fill_blank', label: 'Fill in the blanks' },
        { key: 'true_false', label: 'True/False' },
        { key: 'linking', label: 'Linking' },
        { key: 'multi_part', label: 'Multi-Part' },
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
                                        <a href="#" onClick={() => setSelectedSubject(null)} className="text-gray-200 fw-normal text-15 hover-text-main-600">
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
                                            <div className="card" onClick={() => setSelectedSubject(subject.subject_name)} style={{ cursor: 'pointer' }}>
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
                                                {/* <a href="#" className="text-13 fw-medium text-main-600 hover-text-decoration-underline">See All</a> */}
                                            </div>
                                            <div className="Questions">
                                                {questionTypes.map((type) => (
                                                    <div className="p-xl-4 py-16 px-12 flex-between gap-8 rounded-8 border border-gray-100 hover-border-gray-200 transition-1 mb-16 questionList" key={type.key}>
                                                        <div
                                                            className="flex-align flex-wrap gap-8"
                                                            onClick={() => setSelectedQuestionType(type.key)}
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
                                <h2>{selectedSubject}</h2>

                                {selectedQuestionType === 'mcq' && (
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

                                {selectedQuestionType === 'fill_blank' && (
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

                                {selectedQuestionType === 'true_false' && (
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

                                {selectedQuestionType === 'linking' && (
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
