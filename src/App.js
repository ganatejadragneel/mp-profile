import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import LandingPage from './components/LandingPage';
import StudentQuestionnairePageOne from './components/StudentQuestionnairePageOne';
import StudentQuestionnairePageTwo from './components/StudentQuestionnairePageTwo.js';
import DataSummaryPage from './components/DataSummaryPage';
import CoachQuestionnairePageOne from './components/CoachQuestionnairePageOne';
import CoachQuestionnairePageTwo from './components/CoachQuestionnairePageTwo';
import CoachProfilePage from './components/CoachProfilePage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/student-questionnaire-1" element={<StudentQuestionnairePageOne />} />
          <Route path="/student-questionnaire-2" element={<StudentQuestionnairePageTwo />} />
          <Route path="/data-summary" element={<DataSummaryPage />} />
          <Route path="/coach-questionnaire-1" element={<CoachQuestionnairePageOne />} />
          <Route path="/coach-questionnaire-2" element={<CoachQuestionnairePageTwo />} />
          <Route path="/coach-profile" element={<CoachProfilePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;