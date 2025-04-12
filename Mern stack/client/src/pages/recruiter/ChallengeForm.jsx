import React, { useState, useEffect } from "react";
import axiosInstance from "../../api/axios.jsx";
import {
  PuzzlePieceIcon,
  DocumentTextIcon,
  ChartBarIcon,
  BriefcaseIcon,
} from "@heroicons/react/24/outline";

const ChallengeForm = () => {
  const [positions, setPositions] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    difficulty: "",
    position: "",
  });
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axiosInstance.get("recruiter/position", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPositions(res.data);
      } catch (err) {
        console.error("Failed to fetch positions:", err);
        alert("Error fetching positions.");
      }
    };
    fetchPositions();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, description, difficulty, position } = formData;

    if (!title || !description || !difficulty || !position) {
      return alert("Please fill out all fields.");
    }

    try {
      const token = localStorage.getItem("token");
      await axiosInstance.post(
        "recruiter/challenge",
        {
          title,
          description,
          difficulty,
          positionId: position,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      setFormData({ title: "", description: "", difficulty: "", position: "" });
    } catch (err) {
      console.error("Failed to create challenge:", err);
      alert("Failed to create challenge.");
    }
  };

  const difficultyColors = {
    Easy: "bg-green-100 text-green-800",
    Medium: "bg-yellow-100 text-yellow-800",
    Hard: "bg-red-100 text-red-800",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-white">
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <PuzzlePieceIcon className="w-8 h-8" />
              Design New Challenge
            </h1>
            <p className="mt-2 opacity-90">
              Create skill-testing assessments for candidates
            </p>
          </div>

          {/* Form Content */}
          <div className="grid md:grid-cols-2 gap-8 p-8">
            {/* Form Section */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Challenge Title
                  </label>
                  <div className="relative">
                    <input
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="Full-stack Development Challenge"
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                    <PuzzlePieceIcon className="w-5 h-5 absolute left-3 top-3.5 text-gray-400" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Challenge Description
                  </label>
                  <div className="relative">
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Describe the challenge requirements and evaluation criteria..."
                      rows="4"
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                    <DocumentTextIcon className="w-5 h-5 absolute left-3 top-3.5 text-gray-400" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Difficulty Level
                  </label>
                  <div className="relative">
                    <select
                      name="difficulty"
                      value={formData.difficulty}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent appearance-none"
                    >
                      <option value="">Select Difficulty</option>
                      <option value="Easy">Easy</option>
                      <option value="Medium">Medium</option>
                      <option value="Hard">Hard</option>
                    </select>
                    <ChartBarIcon className="w-5 h-5 absolute left-3 top-3.5 text-gray-400" />
                    <svg
                      className="w-5 h-5 absolute right-3 top-3.5 text-gray-400 pointer-events-none"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Associated Position
                  </label>
                  <div className="relative">
                    <select
                      name="position"
                      value={formData.position}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent appearance-none"
                    >
                      <option value="">Select Position</option>
                      {positions.map((pos) => (
                        <option key={pos._id} value={pos._id}>
                          {pos.title}
                        </option>
                      ))}
                    </select>
                    <BriefcaseIcon className="w-5 h-5 absolute left-3 top-3.5 text-gray-400" />
                    <svg
                      className="w-5 h-5 absolute right-3 top-3.5 text-gray-400 pointer-events-none"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
              >
                Create Challenge
              </button>

              {showSuccess && (
                <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-lg flex items-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Challenge created successfully!
                </div>
              )}
            </form>

            {/* Preview Section */}
            <div className="bg-gray-50 p-6 rounded-lg border border-dashed border-gray-200">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <PuzzlePieceIcon className="w-5 h-5 text-gray-500" />
                Challenge Preview
              </h3>

              {formData.title ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                      <PuzzlePieceIcon className="w-5 h-5 text-indigo-600" />
                    </div>
                    <h2 className="text-xl font-semibold">{formData.title}</h2>
                  </div>

                  {formData.description && (
                    <div className="mt-2">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">
                        Description
                      </h4>
                      <p className="text-gray-600 text-sm">
                        {formData.description}
                      </p>
                    </div>
                  )}

                  {formData.difficulty && (
                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">
                        Difficulty
                      </h4>
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          difficultyColors[formData.difficulty]
                        }`}
                      >
                        {formData.difficulty}
                      </span>
                    </div>
                  )}

                  {formData.position && (
                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">
                        Associated Position
                      </h4>
                      <div className="flex items-center gap-2">
                        <BriefcaseIcon className="w-5 h-5 text-gray-500" />
                        <span className="text-gray-600">
                          {
                            positions.find((p) => p._id === formData.position)
                              ?.title
                          }
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-gray-400 text-sm">
                  Start typing to see a preview of the challenge...
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChallengeForm;
