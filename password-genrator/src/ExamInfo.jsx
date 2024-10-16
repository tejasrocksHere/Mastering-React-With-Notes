import React, { useEffect, useState } from "react";
import "./ExamInfo.css";
import { useLocation, useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";

export default function ExamInfo() {
  const location = useLocation(); // Call useLocation to get the location object
  const { teacher_id } = location.state || {};
  const [exams, setExams] = useState([]); // State to hold exam data
  const [loading, setLoading] = useState(true); // State to track loading status
  const [error, setError] = useState(null); // State to hold error messages
  const navigate = useNavigate(); // Correctly use useNavigate

  useEffect(() => {
    async function fetchExamInfo() {
      if (!teacher_id) return; // Exit if teacher_id is not present

      try {
        const response = await axios.get(
          `http://localhost:3000/examInfo/${teacher_id}`
        );
        setExams(response.data); // Update state with fetched exams
      } catch (err) {
        console.error(err);
        setError("Failed to fetch exam information."); // Set error message
      } finally {
        setLoading(false); // Set loading to false after the fetch is complete
      }
    }

    fetchExamInfo(); // Call the fetch function
  }, [teacher_id]);

  if (loading) return <div>Loading...</div>; // Display loading indicator
  if (error) return <div>{error}</div>; // Display error message

  function handleClick(exam_id) {
    navigate("/report", {
      state: { exam_id: exam_id }, // Use exam_id directly
    });
  }

  return (
    <div className="exam-info-container">
      <h2>Exam Information</h2>
      {exams.length === 0 ? (
        <p>No exams found for this teacher.</p>
      ) : (
        <table className="exam-info-table">
          <thead>
            <tr>
              <th>Exam ID</th>
              <th>Teacher ID</th>
              <th>Exam Name</th>
              <th>Questions</th>
              <th>Action</th> {/* Add a header for the action column */}
            </tr>
          </thead>
          <tbody>
            {exams.map((exam) => (
              <tr key={exam.exam_id}>
                <td>{exam.exam_id}</td>
                <td>{exam.teacher_id}</td>
                <td>{exam.exam_name}</td>
                <td>{exam.questions.length} questions</td>
                <td>
                  <button
                    className="vr"
                    onClick={() => handleClick(exam.exam_id)}
                  >
                    View Report
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
