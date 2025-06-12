import { useSelector } from "react-redux";
import { getSelected } from "../../_store/_reducers/question";

const Result = () => {
    const attemptsQuestionsStore = useSelector(getSelected);

    // Initialize result
    const result = {
        total: attemptsQuestionsStore?.length || 0,
        correct: 0,
        incorrect: 0,
        score: 0,
    };

    // Process result
    attemptsQuestionsStore?.forEach(item => {
        if (item.answer === item.user_answer) {
            result.correct += 1;
        } else {
            result.incorrect += 1;
        }
    });

    result.score = result.correct * 1; // 1 point per correct

    return (
        <div>
            <h2>Exam Result</h2>
            <ul>
                <li><strong>Total Questions:</strong> {result.total}</li>
                <li><strong>Correct Answers:</strong> {result.correct}</li>
                <li><strong>Incorrect Answers:</strong> {result.incorrect}</li>
                <li><strong>Score:</strong> {result.score}</li>
            </ul>

            <h3>Answer Breakdown</h3>
            <table border="1" cellPadding="8" style={{ borderCollapse: "collapse", width: "100%" }}>
                <thead>
                    <tr>
                        <th>Question ID</th>
                        <th>Correct Answer</th>
                        <th>User Answer</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {attemptsQuestionsStore?.map((item, index) => {
                        const isCorrect = item.answer === item.user_answer;
                        return (
                            <tr key={index} style={{ backgroundColor: isCorrect ? "#d4edda" : "#f8d7da" }}>
                                <td>{index + 1} - {item.question_id}</td>
                                <td>{item.answer}</td>
                                <td>{item.user_answer}</td>
                                <td>{isCorrect ? "Correct" : "Incorrect"}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default Result;
