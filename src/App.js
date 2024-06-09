import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import LandingPage from './components/LandingPage';
import StudentQuestionnairePageOne from './components/StudentQuestionnairePageOne';
import StudentQuestionnairePageTwo from './components/StudentQuestionnairePageTwo.js';
import DataSummaryPage from './components/DataSummaryPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/student-questionnaire-1" element={<StudentQuestionnairePageOne />} />
          <Route path="/student-questionnaire-2" element={<StudentQuestionnairePageTwo />} />
          <Route path="/data-summary" element={<DataSummaryPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;