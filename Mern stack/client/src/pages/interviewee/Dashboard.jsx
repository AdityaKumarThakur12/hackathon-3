import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";
import {
  BriefcaseIcon,
  BuildingOfficeIcon,
  PuzzlePieceIcon,
  ClockIcon,
  ChartBarIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";

export default function IntervieweeDashboard() {
  const [positions, setPositions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/interviewee/positions")
      .then((res) => {
        setPositions(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch positions:", err);
        setError("Failed to load available positions");
        setLoading(false);
      });
  }, []);

  const handleTakeChallenge = (challengeId) => {
    navigate(`/interviewee/challenge/${challengeId}`);
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500 flex items-center gap-2">
          <XCircleIcon className="w-6 h-6" />
          {error}
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-white">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/10 rounded-lg flex items-center justify-center">
                <BriefcaseIcon className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Opportunity Board</h1>
                <p className="mt-2 opacity-90">
                  Find your next career challenge
                </p>
              </div>
            </div>
          </div>

          {/* Positions Grid */}
          <div className="grid md:grid-cols-2 gap-6 p-8">
            {positions.map((pos) => (
              <div
                key={pos._id}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800">
                        {pos.title}
                      </h3>
                      <p className="text-indigo-600 flex items-center gap-1 mt-1">
                        <BuildingOfficeIcon className="w-5 h-5" />
                        {pos.company?.name}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                      {pos.company?.name?.[0] || (
                        <BriefcaseIcon className="w-5 h-5 text-indigo-600" />
                      )}
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4">{pos.description}</p>

                  {pos.challenges?.[0] && (
                    <div className="space-y-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <PuzzlePieceIcon className="w-5 h-5 text-purple-600" />
                            <span className="font-medium">Challenge:</span>
                            <span>{pos.challenges[0].title}</span>
                          </div>
                          <span
                            className={`px-2 py-1 rounded-full text-sm ${
                              pos.challenges[0].difficulty === "Easy"
                                ? "bg-green-100 text-green-800"
                                : pos.challenges[0].difficulty === "Medium"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {pos.challenges[0].difficulty}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <ClockIcon className="w-4 h-4" />~
                            {pos.challenges[0].duration || 45} mins
                          </div>
                          <div className="flex items-center gap-1">
                            <ChartBarIcon className="w-4 h-4" />
                            {pos.challenges[0].questions?.length || 0} questions
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() =>
                          handleTakeChallenge(
                            typeof pos.challenges[0] === "object"
                              ? pos.challenges[0]._id
                              : pos.challenges[0]
                          )
                        }
                        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-3 rounded-lg font-semibold transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2"
                      >
                        <ArrowPathIcon className="w-5 h-5" />
                        Start Challenge
                      </button>
                    </div>
                  )}

                  {pos.company?.cultureMetrics && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {pos.company.cultureMetrics
                        .split(",")
                        .map((metric, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-indigo-100 text-indigo-700 text-sm rounded-full"
                          >
                            {metric.trim()}
                          </span>
                        ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {positions.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">🎯</div>
              <p className="text-gray-500">
                No open positions available at the moment
              </p>
              <p className="text-sm text-gray-400 mt-2">Check back later!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
