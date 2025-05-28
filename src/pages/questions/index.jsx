import React, { useEffect, useState } from 'react';
import graph from '../../assets/images/graph1.png';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import course from '../../assets/images/course.png';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import userService from '../../_services/user.service';
import { getLevelType } from '../../_store/_reducers/auth';

const Questions = () => {
    const [selectedLevel, setSelectedLevel] = useState(null);
    const [selectedSubject, setSelectedSubject] = useState(null);
    const [selectedQuestionType, setSelectedQuestionType] = useState(null);
    const [levels, setLevels] = useState([]);
    const education = useSelector(getLevelType);

    const iconMap = {
        1: 'ph ph-number-circle-one',
        2: 'ph ph-number-circle-two',
        3: 'ph ph-number-circle-three',
        4: 'ph ph-number-circle-four',
        5: 'ph ph-number-circle-five',
        6: 'ph ph-number-circle-six',
        7: 'ph ph-number-circle-seven',
        8: 'ph ph-number-circle-eight',
        9: 'ph ph-number-circle-nine',
    };
    const subjects = [
        { name: 'Maths', icon: 'ph ph-math-operations' },
        { name: 'English', icon: 'ph ph-book-open' },
        { name: 'Chinese', icon: 'ph ph-translate' },
        { name: 'Science', icon: 'ph ph-microscope' }
    ];
    const questionTypes = ['MCQ', 'Fill in the blanks', 'True/False', 'Linking'];

    const saveLevel = async () => {
        try {
            const response = await userService.getLevel(education);
            const fetchedLevels = response?.data?.data || [];
            setLevels(fetchedLevels);
        } catch (err) {
            console.log(err?.response?.data?.message || 'An error occurred');
            toast.error(err?.response?.data?.message || 'Failed to load levels');
        }
    };
    useEffect(() => {
        if (education) {
            saveLevel();
        }
    }, [education]);
    return (
        <>
            <div className="flex">
                <Sidebar />
                <div className="dashboard-main-wrapper">
                    <Navbar />
                    <div className="dashboard-body">
                        {!selectedLevel && (
                            <div className="row gy-4 shadowBox">
                                {levels.map((item) => {
                                    const iconClass = iconMap[item.id]
                                    return (
                                        <div className="col-sm-3" key={item.id}>
                                            <div className="card" onClick={() => setSelectedLevel(item.id)} style={{ cursor: 'pointer' }}>
                                                <div className="card-body">
                                                    <div className="flex-between gap-8 mb-24">
                                                        <span className={`flex-shrink-0 w-48 h-48 flex-center rounded-circle ${item.id % 2 === 0 ? 'bg-main-two-600' : 'bg-main-600'} text-white text-2xl`}>
                                                            <i className={iconClass}></i>
                                                        </span>
                                                        <img src={graph} className="rounded-circle" alt={item.name} />
                                                    </div>
                                                    <h4 className="mb-2">{item.name}</h4>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
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
                                    <div>
                                        <h2>True or False</h2>
                                        <p>1. Photosynthesis occurs only at night.</p>
                                        <p>Options: A) True B) False</p>
                                        <p><strong>Answer:</strong> False</p>

                                        <p>2. Humans have four lungs.</p>
                                        <p>Options: A) True B) False</p>
                                        <p><strong>Answer:</strong> False</p>

                                        <p>3. Water boils at 100°C.</p>
                                        <p>Options: A) True B) False</p>
                                        <p><strong>Answer:</strong> True</p>

                                        <p>4. Lightning is hotter than the surface of the sun.</p>
                                        <p>Options: A) True B) False</p>
                                        <p><strong>Answer:</strong> True</p>

                                        <p>5. The human heart has three chambers.</p>
                                        <p>Options: A) True B) False</p>
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
