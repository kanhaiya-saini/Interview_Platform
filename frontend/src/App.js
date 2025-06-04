import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./components/auth/LoginPage";
import RegisterPage from "./components/auth/RegisterPage";
import HeroPage from "./components/HeroPage";
import Profile from "./components/Profile";
import QuestionGenerator from "./components/QuestionGenerator";
import TestHistory from "./components/TestHistory";
import Speechan from "./components/Speechtt";
import VideoAn from "./components/Videomock";
import ResumeBuilder from "./components/ResumeBuilder";
import Texttotext from './components/Texttotext';
import Schedule from "./components/Schedule";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HeroPage />} />
        <Route path="/speech" element={<Speechan />} />
        <Route path="/videoanalysi" element={<VideoAn />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/test" element={<QuestionGenerator/>} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/scorecards" element={<TestHistory/>} />
        <Route path="/resume" element={<ResumeBuilder/>}/>
        <Route path="/textanalysis" element={<Texttotext/>} />
        <Route path='/schedule' element={<Schedule/>} />
      </Routes>
    </BrowserRouter>
    
    
  );
}

export default App;
