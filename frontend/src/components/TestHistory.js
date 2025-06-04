import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "./Navbar";

const TestHistory = () => {
  const { user } = useSelector((state) => state.auth);
  const [history, setHistory] = useState([]);
  const [filteredHistory, setFilteredHistory] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);

  useEffect(() => {
    const fetchHistory = async () => {
      if (!user?._id) return;

      try {
        const res = await fetch(`http://localhost:8001/api/v1/user/history/${user._id}`, {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();
        if (data.success) {
          setHistory(data.testHistory);
          filterHistoryByDate(data.testHistory, selectedDate);
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error("Error fetching history:", error);
      }
    };

    fetchHistory();
  }, [user?._id]);

  const filterHistoryByDate = (historyData, date) => {
    const filteredData = historyData.filter(test => 
      new Date(test.date).toISOString().split("T")[0] === date
    );
    setFilteredHistory(filteredData);
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    filterHistoryByDate(history, e.target.value);
  };

  return (

    <div>
  <Navbar/>
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Test History</h2>

      {/* Date Picker */}
      <div className="mb-6 flex justify-center items-center gap-4">
        <label className="font-semibold">Select Date:</label>
        <input 
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          className="border rounded-md p-2"
        />
      </div>

      {/* History Display */}
      {filteredHistory.length === 0 ? (
        <p className="text-center text-gray-600">No test history available for this date.</p>
      ) : (
        <ul>
          {filteredHistory.map((test, index) => (
            <li key={index} className="mb-5 p-5 border rounded-lg shadow-md bg-white">
              <p className="text-lg font-semibold">📅 Date: {new Date(test.date).toLocaleDateString()}</p>
              <p className="font-medium text-blue-600">🏆 Score: {test.score} / 50</p>
              <p className="mt-3 font-semibold">📖 Questions Attempted:</p>
              <ul className="pl-4 mt-2 space-y-3">
                {test.questionsAttempted.map((question, qIndex) => (
                  <li key={qIndex} className="p-3 border rounded-md bg-gray-100">
                    <p><strong>❓ Question:</strong> {question?.questionId?.question || "N/A"}</p>
                    <p className="text-green-600"><strong>✅ Correct Answer:</strong> {question.correctAnswer}</p>
                    <p className="text-red-600"><strong>✍️ Your Answer:</strong> {question.userAnswer}</p>
                    <p className="text-gray-700"><strong>🎯 Score:</strong> {question.score}</p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
    </div>
  );
};

export default TestHistory;
