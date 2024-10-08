import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import LandingPage from './components/LandingPage';
import AthleteSignupPage from './components/AthleteSignupPage'; // Add this import
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
import AthleteLoginPage from './components/AthleteLoginPage';
import CoachLoginPage from './components/CoachLoginPage';
import CoachSignupPage from './components/CoachSignupPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/athlete-login" element={<AthleteLoginPage />} />
          <Route path="/athlete-signup" element={<AthleteSignupPage />} /> {/* Add this new route */}
          <Route path="/coach-login" element={<CoachLoginPage />} />
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
          <Route path="/coach-signup" element={<CoachSignupPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;