import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../api/axios";
import {
  PuzzlePieceIcon,
  BriefcaseIcon,
  BuildingOfficeIcon,
  DocumentTextIcon,
  ClockIcon,
  ChartBarIcon,
  QuestionMarkCircleIcon,
  CodeBracketIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";

export default function ChallengeDetails() {
  const { id } = useParams();
  const [challenge, setChallenge] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`/recruiter/challenges/${id}`)
      .then((res) => {
        setChallenge(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching challenge:", err);
        setError("Failed to load challenge details");
        setLoading(false);
      });
  }, [id]);

  const difficultyColors = {
    Easy: "bg-green-100 text-green-800",
    Medium: "bg-yellow-100 text-yellow-800",
    Hard: "bg-red-100 text-red-800",
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
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-white/10 rounded-xl flex items-center justify-center">
                <PuzzlePieceIcon className="w-10 h-10" />
              </div>
              <div>
                <h1 className="text-4xl font-bold">{challenge.title}</h1>
                <p className="mt-2 opacity-90">{challenge.description}</p>
              </div>
            </div>
          </div>

          {/* Challenge Details Grid */}
          <div className="grid md:grid-cols-2 gap-8 p-8">
            {/* Basic Info Card */}
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <ChartBarIcon className="w-5 h-5" />
                Challenge Overview
              </h3>
              <dl className="space-y-4">
                <div className="flex justify-between items-center border-b pb-2">
                  <dt className="text-gray-600 flex items-center gap-2">
                    <PuzzlePieceIcon className="w-5 h-5" />
                    Difficulty
                  </dt>
                  <dd
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      difficultyColors[challenge.difficulty]
                    }`}
                  >
                    {challenge.difficulty}
                  </dd>
                </div>

                {challenge.position && (
                  <>
                    <div className="flex justify-between items-center border-b pb-2">
                      <dt className="text-gray-600 flex items-center gap-2">
                        <BriefcaseIcon className="w-5 h-5" />
                        Position
                      </dt>
                      <dd className="text-gray-800">
                        {challenge.position.title}
                      </dd>
                    </div>
                    <div className="flex justify-between items-center border-b pb-2">
                      <dt className="text-gray-600 flex items-center gap-2">
                        <BuildingOfficeIcon className="w-5 h-5" />
                        Company
                      </dt>
                      <dd className="text-gray-800">
                        {challenge.position.company?.name}
                      </dd>
                    </div>
                  </>
                )}
              </dl>
            </div>

            {/* Questions Card */}
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <QuestionMarkCircleIcon className="w-5 h-5" />
                Assessment Questions
              </h3>
              <div className="space-y-4">
                {challenge.questions?.map((q, i) => (
                  <div
                    key={q._id}
                    className="bg-white p-4 rounded-lg shadow-sm"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-500">
                          Q{i + 1}
                        </span>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            q.type === "mcq"
                              ? "bg-blue-100 text-blue-800"
                              : q.type === "coding"
                              ? "bg-green-100 text-green-800"
                              : "bg-purple-100 text-purple-800"
                          }`}
                        >
                          {q.type.toUpperCase()}
                        </span>
                      </div>
                      <span className="text-sm font-medium text-gray-500">
                        {q.score} points
                      </span>
                    </div>
                    <p className="text-gray-800">{q.questionText}</p>
                    {q.type === "mcq" && (
                      <div className="mt-2 text-sm text-gray-600">
                        Options: {q.options.join(", ")}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid md:grid-cols-3 gap-4 p-8 pt-0">
            <div className="bg-indigo-100 p-6 rounded-xl text-center">
              <div className="text-3xl font-bold text-indigo-600">
                {challenge.questions?.length || 0}
              </div>
              <div className="text-gray-600 mt-1">Total Questions</div>
            </div>
            <div className="bg-purple-100 p-6 rounded-xl text-center">
              <div className="text-3xl font-bold text-purple-600">
                {challenge.questions?.reduce((sum, q) => sum + q.score, 0) || 0}
              </div>
              <div className="text-gray-600 mt-1">Total Points</div>
            </div>
            <div className="bg-pink-100 p-6 rounded-xl text-center">
              <div className="text-3xl font-bold text-pink-600">⌛</div>
              <div className="text-gray-600 mt-1">Time Limit</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
