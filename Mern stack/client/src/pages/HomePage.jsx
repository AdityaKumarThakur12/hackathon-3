import { Link } from "react-router-dom";
import {
  ChartBarIcon,
  ShieldCheckIcon,
  PuzzlePieceIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6">
            Revolutionizing Hiring
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Where skills speak louder than resumes, and potential trumps
            pedigree.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
            <Link
              to="/interviewee/login"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg"
            >
              Showcase Your Skills
            </Link>
            <Link
              to="/recruiter/login"
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg"
            >
              Find Real Talent
            </Link>
          </div>
        </div>

        {/* Value Proposition Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <PuzzlePieceIcon className="h-12 w-12 text-indigo-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">
              Skill-Based Challenges
            </h3>
            <p className="text-gray-600">
              Demonstrate abilities through real-world tasks
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <ShieldCheckIcon className="h-12 w-12 text-purple-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Bias-Free Matching</h3>
            <p className="text-gray-600">AI-powered anonymous evaluations</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <ChartBarIcon className="h-12 w-12 text-indigo-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Transparent Metrics</h3>
            <p className="text-gray-600">
              Real salary data and culture insights
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <UserGroupIcon className="h-12 w-12 text-purple-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Smart Feedback Loop</h3>
            <p className="text-gray-600">
              Continuous improvement through outcomes
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-indigo-600 rounded-2xl p-8 shadow-xl">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Hiring?
          </h2>
          <p className="text-indigo-100 mb-6">
            Join the movement against resume-based recruitment
          </p>
          <Link
            to="/signup"
            className="inline-block bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Get Started Free
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
