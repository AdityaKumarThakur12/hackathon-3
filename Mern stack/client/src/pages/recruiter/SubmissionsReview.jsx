import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axios.jsx";
import {
  UserCircleIcon,
  BriefcaseIcon,
  PuzzlePieceIcon,
  DocumentTextIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

const SubmissionsReview = () => {
  const [submissions, setSubmissions] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axiosInstance.get("/recruiter/submissions", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSubmissions(res.data);
      } catch (err) {
        console.error("Error fetching submissions:", err);
        setError("Failed to load submissions. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchSubmissions();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      await axiosInstance.put(
        `/recruiter/submission/${id}`,
        { status: newStatus },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSubmissions((prev) =>
        prev.map((sub) =>
          sub._id === id ? { ...sub, status: newStatus } : sub
        )
      );
    } catch (err) {
      console.error(`Error updating status for submission ${id}:`, err);
      setError("Failed to update submission status. Please try again.");
    }
  };

  const statusStyles = {
    selected: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
    "on hold": "bg-yellow-100 text-yellow-800",
    reviewed: "bg-blue-100 text-blue-800",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-white">
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <DocumentTextIcon className="w-8 h-8" />
              Candidate Submissions
            </h1>
            <p className="mt-2 opacity-90">
              Review and manage candidate assessments
            </p>
          </div>

          {/* Content Section */}
          <div className="p-8">
            {error && (
              <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg flex items-center gap-2">
                <XCircleIcon className="w-5 h-5" />
                {error}
              </div>
            )}

            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading submissions...</p>
              </div>
            ) : submissions.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No submissions found</p>
              </div>
            ) : (
              <div className="grid gap-6">
                {submissions.map((sub) => (
                  <div
                    key={sub._id}
                    className="bg-white rounded-xl shadow-sm border border-gray-200/50"
                  >
                    <div className="p-6">
                      {/* Submission Header */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                            <UserCircleIcon className="w-5 h-5 text-indigo-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-800">
                              {sub.interviewee?.name ||
                                sub.interviewee ||
                                "Anonymous Candidate"}
                            </h3>
                            <p className="text-sm text-gray-500">
                              Applied:{" "}
                              {new Date(sub.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            statusStyles[sub.status]
                          }`}
                        >
                          {sub.status}
                        </span>
                      </div>

                      {/* Submission Details */}
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-gray-600">
                            <BriefcaseIcon className="w-5 h-5" />
                            <span className="font-medium">Position:</span>
                            <span>{sub.position?.title || "N/A"}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <PuzzlePieceIcon className="w-5 h-5" />
                            <span className="font-medium">Challenge:</span>
                            <span>{sub.challenge?.title || "N/A"}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <span className="w-5 h-5 text-center">🏆</span>
                            <span className="font-medium">Score:</span>
                            <span className="font-semibold">
                              {sub.score || "Pending"}
                            </span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="text-gray-600">
                            <h4 className="font-medium mb-2">
                              Submission Details:
                            </h4>
                            <div className="bg-gray-50 p-4 rounded-lg">
                              {Array.isArray(sub.answers) ? (
                                <ul className="list-disc pl-4 space-y-1">
                                  {sub.answers.map((answer, idx) => (
                                    <li key={idx} className="text-sm">
                                      {answer}
                                    </li>
                                  ))}
                                </ul>
                              ) : (
                                <p className="text-sm">
                                  {sub.answers || "No submission content"}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="mt-6 flex flex-wrap gap-3">
                        <button
                          onClick={() =>
                            handleStatusChange(sub._id, "selected")
                          }
                          className="px-4 py-2 rounded-lg border border-green-500 text-green-600 hover:bg-green-50 flex items-center gap-2"
                        >
                          <CheckCircleIcon className="w-5 h-5" />
                          Select Candidate
                        </button>
                        <button
                          onClick={() =>
                            handleStatusChange(sub._id, "rejected")
                          }
                          className="px-4 py-2 rounded-lg border border-red-500 text-red-600 hover:bg-red-50 flex items-center gap-2"
                        >
                          <XCircleIcon className="w-5 h-5" />
                          Reject Submission
                        </button>
                        <button
                          onClick={() => handleStatusChange(sub._id, "on hold")}
                          className="px-4 py-2 rounded-lg border border-yellow-500 text-yellow-600 hover:bg-yellow-50 flex items-center gap-2"
                        >
                          <ClockIcon className="w-5 h-5" />
                          Put on Hold
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmissionsReview;
