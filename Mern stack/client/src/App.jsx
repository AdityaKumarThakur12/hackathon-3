import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";

import RecruiterLogin from "./pages/recruiter/Login";
import RecruiterDashboard from "./pages/recruiter/Dashboard";
import CompanyForm from "./pages/recruiter/CompanyForm";
import PositionForm from "./pages/recruiter/PositionForm";
import ChallengeForm from "./pages/recruiter/ChallengeForm";
import QuestionForm from "./pages/recruiter/QuestionForm";
import SubmissionsReview from "./pages/recruiter/SubmissionsReview";
import IntervieweeLogin from "./pages/interviewee/Login";
import IntervieweeDashboard from "./pages/interviewee/Dashboard";
import ChallengePage from "./pages/interviewee/ChallengePage";

import PrivateRoute from "./components/PrivateRoute";
import CompanyDetails from "./pages/recruiter/CompanyDetails";
import PositionDetails from "./pages/recruiter/PositionDetails";
import ChallengeDetails from "./pages/recruiter/ChallengeDetails";
import Signup from "./pages/Signup.jsx";
import ResultsPage from "./pages/interviewee/Results.jsx";

function App() {
  return (
    <Router>
      <Routes>
        {/* Home */}
        <Route path="/" element={<HomePage />} />

        {/* Recruiter */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/recruiter/login" element={<RecruiterLogin />} />
        <Route
          path="/recruiter"
          element={
            <PrivateRoute>
              <RecruiterDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/recruiter/company"
          element={
            <PrivateRoute>
              <CompanyForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/recruiter/position"
          element={
            <PrivateRoute>
              <PositionForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/recruiter/challenge"
          element={
            <PrivateRoute>
              <ChallengeForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/recruiter/question"
          element={
            <PrivateRoute>
              <QuestionForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/recruiter/submissions"
          element={
            <PrivateRoute>
              <SubmissionsReview />
            </PrivateRoute>
          }
        />
        <Route
          path="/recruiter/company/:id"
          element={
            <PrivateRoute>
              <CompanyDetails />
            </PrivateRoute>
          }
        />
        <Route
          path="/recruiter/position/:id"
          element={
            <PrivateRoute>
              <PositionDetails />
            </PrivateRoute>
          }
        />
        <Route
          path="/recruiter/challenge/:id"
          element={
            <PrivateRoute>
              <ChallengeDetails />
            </PrivateRoute>
          }
        />

        {/* Interviewee */}
        <Route path="/interviewee/login" element={<IntervieweeLogin />} />
        <Route
          path="/interviewee"
          element={
            <PrivateRoute>
              <IntervieweeDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/interviewee/results"
          element={
            <PrivateRoute>
              <ResultsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/interviewee/challenge/:id"
          element={
            <PrivateRoute>
              <ChallengePage />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
