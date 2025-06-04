import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
import Navbar from './Navbar';

const HeroPage = () => {
  const [userName, setUserName] = useState('Guest');
  const [startInterview, setStartInterview] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('userName');
    if (storedUser) setUserName(storedUser);
  }, []);

  const handleInterviewStart = () => {
    setStartInterview(true);
    navigate('/test'); // Navigate to the mock interview test page
  };

  const handleScheduleExpertInterview = () => {
    navigate('/schedule'); // Navigate to the interview scheduling page
  };

  return (
    <div>
      {/* Navbar Section */}
      <Navbar />

      {/* Hero Section */}
      <div className="hero bg-gradient-to-r from-purple-600 via-purple-300 to-purple-500 text-white text-center py-20">
        <h1 className="text-4xl font-bold mb-4">Welcome to MockView</h1>
        <p className="text-xl mb-4">Your go-to platform for mastering interviews with personalized mock sessions.</p>
        <h3 className="text-2xl">Hello, {userName}!</h3>
        <button
          onClick={handleInterviewStart}
          className="mt-5 bg-gradient-to-r from-purple-500 to-purple-600 text-white py-2 px-6 rounded hover:bg-gradient-to-r hover:from-purple-600 hover:to-purple-700 transition"
        >
          Start Mock Interview
        </button>
      </div>

      {/* About Section */}
      <div className="about py-16 bg-gray-100 text-center">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-semibold mb-6 text-purple-600">About MockView</h2>
          <p className="text-xl mb-6 text-gray-600">
            MockView is your ultimate platform for refining your interview skills through realistic simulations and personalized feedback.
          </p>
        </div>
      </div>

      {/* Features Section */}
      <div className="features bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-6 text-purple-600">Key Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[ 
              { title: 'Personalized Questions', desc: 'Tailored questions for your expertise.' },
              { title: 'Timed Sessions', desc: 'Simulate real interview conditions.' },
              { title: 'Instant Feedback', desc: 'Improve in real-time with feedback.' },
              { title: 'Mock Panel', desc: 'Experience panel interviews with experts.' },
              { title: 'Progress Tracking', desc: 'Monitor your growth over time.' },
              { title: 'Interview Simulation', desc: 'Live or AI-powered interview experiences.' },
            ].map((feature, index) => (
              <div key={index} className="feature-card bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
                <h3 className="text-xl font-bold mb-3 text-purple-600">{feature.title}</h3>
                <p className="text-gray-700">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Schedule Interview Section */}
      <div className="schedule-interview bg-gray-100 py-16 text-center">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-semibold mb-6 text-purple-600">Schedule an Interview with an Expert</h2>
          <p className="text-xl mb-6 text-gray-600">
            Want personalized feedback and expert advice? Schedule a mock interview with one of our seasoned professionals.
          </p>
          <button
            onClick={handleScheduleExpertInterview}
            className="bg-gradient-to-r from-purple-500 to-purple-600 text-white py-2 px-6 rounded hover:bg-gradient-to-r hover:from-purple-600 hover:to-purple-700 transition"
          >
            Schedule Interview
          </button>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="testimonials bg-gray-200 py-16 text-center">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-semibold mb-6 text-purple-600">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[ 
              { name: 'John Doe', text: 'MockView helped me refine my technical skills before my dream job interview!' },
              { name: 'Jane Smith', text: 'The mock panel sessions were extremely helpful for preparing for real-world interviews.' },
              { name: 'Alice Johnson', text: 'I learned a lot and gained confidence in my technical abilities thanks to MockView!' },
            ].map((testimonial, index) => (
              <div key={index} className="testimonial bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition transform hover:scale-105">
                <p className="italic mb-4 text-gray-700">"{testimonial.text}"</p>
                <p className="font-bold text-purple-600">{testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call-to-Action Section */}
      <div className="cta bg-gradient-to-r from-purple-600 via-purple-300 to-purple-500 text-white text-center py-16">
        <h2 className="text-3xl font-semibold mb-4 ">Get Started Today!</h2>
        <button
          onClick={handleInterviewStart}
          className="bg-gradient-to-r from-purple-500 to-purple-600 text-white py-2 px-6 rounded hover:bg-gradient-to-r hover:from-purple-600 hover:to-purple-700 transition"
        >
          Start Your Mock Interview
        </button>
      </div>

      {/* Footer Section */}
      <footer className="bg-gray-800 text-white text-center py-4">
        <p>&copy; 2025 MockView. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default HeroPage;
