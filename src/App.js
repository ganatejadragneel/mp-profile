import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import LandingPage from './components/LandingPage';
import StudentQuestionnairePageOne from './components/StudentQuestionnairePageOne';
import StudentQuestionnairePageTwo from './components/StudentQuestionnairePageTwo.js';
import StudentProfilePage from './components/StudentProfilePage';
import CoachQuestionnairePageOne from './components/CoachQuestionnairePageOne';
import CoachQuestionnairePageTwo from './components/CoachQuestionnairePageTwo';
import CoachProfilePage from './components/CoachProfilePage';
import EditCoachProfile from './components/EditCoachProfile';
import EditAthleteProfile from './components/EditAthleteProfile';
import BookingPage from './components/BookingPage';
import CoachSessionsPage from './components/CoachSessionsPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/student-questionnaire-1" element={<StudentQuestionnairePageOne />} />
          <Route path="/student-questionnaire-2" element={<StudentQuestionnairePageTwo />} />
          <Route path="/data-summary" element={<StudentProfilePage />} />
          <Route path="/coach-questionnaire-1" element={<CoachQuestionnairePageOne />} />
          <Route path="/coach-questionnaire-2" element={<CoachQuestionnairePageTwo />} />
          <Route path="/coach-profile" element={<CoachProfilePage />} />
          <Route path="/edit-coach-profile" element={<EditCoachProfile />} />
          <Route path="/edit-athlete-profile" element={<EditAthleteProfile />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/coach-sessions" element={<CoachSessionsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;