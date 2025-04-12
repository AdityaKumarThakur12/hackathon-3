import { useEffect, useState } from "react";
import axios from "../../api/axios";
import {
  DocumentChartBarIcon,
  BriefcaseIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";

export default function ResultsPage() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get("/interviewee/results");
        setResults(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching results:", err);
        setError("Failed to load results");
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  const statusStyles = {
    selected: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
    pending: "bg-yellow-100 text-yellow-800",
    reviewed: "bg-blue-100 text-blue-800",
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
              <DocumentChartBarIcon className="w-12 h-12" />
              <div>
                <h1 className="text-3xl font-bold">Your Assessment Results</h1>
                <p className="mt-2 opacity-90">
                  Review your performance history
                </p>
              </div>
            </div>
          </div>

          {/* Results Content */}
          <div className="p-8">
            {results.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">📭</div>
                <p className="text-gray-500">No results available yet</p>
                <p className="text-sm text-gray-400 mt-2">
                  Complete challenges to see your results here
                </p>
              </div>
            ) : (
              <div className="grid gap-6">
                {results.map((result) => (
                  <div key={result._id} className="bg-gray-50 p-6 rounded-xl">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold flex items-center gap-2">
                          <BriefcaseIcon className="w-5 h-5" />
                          {result.position?.title || "Position"}
                        </h3>
                        <p className="text-gray-600 mt-1">
                          {result.challenge?.title || "Challenge"}
                        </p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          statusStyles[result.status]
                        }`}
                      >
                        {result.status}
                      </span>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="bg-white p-4 rounded-lg">
                        <div className="flex items-center gap-2">
                          <ChartBarIcon className="w-5 h-5 text-indigo-600" />
                          <div>
                            <p className="text-sm text-gray-600">Your Score</p>
                            <p className="text-2xl font-bold">
                              {result.score} / {result.totalScore || "100"}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white p-4 rounded-lg">
                        <div className="flex items-center gap-2">
                          <ClockIcon className="w-5 h-5 text-indigo-600" />
                          <div>
                            <p className="text-sm text-gray-600">Completed</p>
                            <p className="font-medium">
                              {new Date(
                                result.submittedAt
                              ).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white p-4 rounded-lg">
                        <div className="flex items-center gap-2">
                          {result.status === "selected" ? (
                            <CheckCircleIcon className="w-5 h-5 text-green-600" />
                          ) : (
                            <XCircleIcon className="w-5 h-5 text-red-600" />
                          )}
                          <div>
                            <p className="text-sm text-gray-600">
                              Current Status
                            </p>
                            <p className="font-medium capitalize">
                              {result.status}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {result.feedback && (
                      <div className="mt-4 bg-indigo-50 p-4 rounded-lg">
                        <h4 className="text-sm font-semibold text-indigo-800 mb-2">
                          Feedback:
                        </h4>
                        <p className="text-gray-700">{result.feedback}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
