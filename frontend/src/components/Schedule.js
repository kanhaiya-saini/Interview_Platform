import React, { useState } from 'react';
import Navbar from './Navbar';

const experts = [
  { id: 1, name: "Expert 1", specialization: "Frontend Developer" },
  { id: 2, name: "Expert 2", specialization: "Backend Developer" },
  { id: 3, name: "Expert 3", specialization: "Full Stack Developer" },
  { id: 4, name: "Expert 4", specialization: "UI/UX Designer" },
  { id: 5, name: "Expert 5", specialization: "Data Scientist" },
];

// Helper to generate 12-hour format time options
const generate12HourTimes = () => {
  const times = [];
  const format = (hour, minute, period) => {
    const h = hour < 10 ? `0${hour}` : hour;
    const m = minute < 10 ? `0${minute}` : minute;
    return `${h}:${m} ${period}`;
  };

  for (let hour = 1; hour <= 12; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      times.push(format(hour, minute, "AM"));
      times.push(format(hour, minute, "PM"));
    }
  }

  return times;
};

const Schedule = () => {
  const [popupVisible, setPopupVisible] = useState(false);
  const [selectedExpert, setSelectedExpert] = useState(null);

  const [formData, setFormData] = useState({
    1: { candidateName: "", interviewDate: "", interviewTime: "" },
    2: { candidateName: "", interviewDate: "", interviewTime: "" },
    3: { candidateName: "", interviewDate: "", interviewTime: "" },
    4: { candidateName: "", interviewDate: "", interviewTime: "" },
    5: { candidateName: "", interviewDate: "", interviewTime: "" },
  });

  const handleInputChange = (expertId, field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [expertId]: {
        ...prevData[expertId],
        [field]: value,
      },
    }));
  };

  const handleScheduleInterview = (e, expert) => {
    e.preventDefault();

    const { candidateName, interviewDate, interviewTime } = formData[expert.id];

    if (!candidateName || !interviewDate || !interviewTime) {
      alert("Please fill all the fields.");
      return;
    }

    setSelectedExpert(expert);
    setPopupVisible(true);
  };

  const handleClosePopup = () => {
    setPopupVisible(false);

    if (selectedExpert) {
      setFormData((prevData) => ({
        ...prevData,
        [selectedExpert.id]: {
          candidateName: "",
          interviewDate: "",
          interviewTime: "",
        },
      }));
    }

    setSelectedExpert(null);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-screen-xl mx-auto">
          <header className="text-center mb-8">
            <h1 className="text-4xl font-semibold text-purple-600">Schedule Interviews</h1>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {experts.map((expert) => (
              <div key={expert.id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all">
                <h2 className="text-2xl font-bold text-purple-600">{expert.name}</h2>
                <p className="text-lg text-gray-500">{expert.specialization}</p>
                <form className="mt-4" onSubmit={(e) => handleScheduleInterview(e, expert)}>
                  <div className="mb-4">
                    <label htmlFor={`candidateName${expert.id}`} className="block text-sm font-medium text-gray-700">
                      Candidate Name
                    </label>
                    <input
                      type="text"
                      id={`candidateName${expert.id}`}
                      className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      value={formData[expert.id].candidateName}
                      onChange={(e) => handleInputChange(expert.id, "candidateName", e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor={`interviewDate${expert.id}`} className="block text-sm font-medium text-gray-700">
                      Interview Date
                    </label>
                    <input
                      type="date"
                      id={`interviewDate${expert.id}`}
                      className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      value={formData[expert.id].interviewDate}
                      onChange={(e) => handleInputChange(expert.id, "interviewDate", e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor={`interviewTime${expert.id}`} className="block text-sm font-medium text-gray-700">
                      Interview Time
                    </label>
                    <select
                      id={`interviewTime${expert.id}`}
                      className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      value={formData[expert.id].interviewTime}
                      onChange={(e) => handleInputChange(expert.id, "interviewTime", e.target.value)}
                    >
                      <option value="">Select Time</option>
                      {generate12HourTimes().map((time) => (
                        <option key={time} value={time}>{time}</option>
                      ))}
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    Schedule Interview
                  </button>
                </form>
              </div>
            ))}
          </div>

          {/* Popup */}
          {popupVisible && selectedExpert && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
              <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
                <h2 className="text-xl font-semibold text-purple-600">Interview Scheduled</h2>
                <p className="text-gray-700 mt-2">
                  <strong>Expert:</strong> {selectedExpert.name} <br />
                  <strong>Specialization:</strong> {selectedExpert.specialization} <br />
                  <strong>Candidate:</strong> {formData[selectedExpert.id].candidateName} <br />
                  <strong>Date:</strong> {formData[selectedExpert.id].interviewDate} <br />
                  <strong>Time:</strong> {formData[selectedExpert.id].interviewTime}
                </p>
                <p className="text-gray-700 mt-4">
                  You have successfully registered for the interview. Please wait for {selectedExpert.name} to confirm.
                </p>
                <button
                  className="mt-4 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700"
                  onClick={handleClosePopup}
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Schedule;
