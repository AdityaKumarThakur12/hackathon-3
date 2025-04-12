import React, { useState, useEffect } from "react";
import axiosInstance from "../../api/axios.jsx";
import {
  QuestionMarkCircleIcon,
  DocumentTextIcon,
  CodeBracketIcon,
  PencilSquareIcon,
  PlusCircleIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

const emptyQuestion = {
  questionText: "",
  type: "mcq",
  options: ["", "", "", ""],
  correctAnswer: "",
  score: 0,
};

const QuestionForm = () => {
  const [challenges, setChallenges] = useState([]);
  const [challengeId, setChallengeId] = useState("");
  const [questions, setQuestions] = useState([{ ...emptyQuestion }]);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const res = await axiosInstance.get("/recruiter/challenges");
        setChallenges(res.data);
      } catch (err) {
        console.error("Failed to fetch challenges:", err);
      }
    };
    fetchChallenges();
  }, []);

  // ... keep existing handler functions ...
  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updated = [...questions];
    updated[index][name] = name === "score" ? parseInt(value, 10) : value;
    setQuestions(updated);
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const updated = [...questions];
    updated[qIndex].options[oIndex] = value;
    setQuestions(updated);
  };

  const addQuestion = () => {
    setQuestions([...questions, { ...emptyQuestion }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!challengeId) {
      return alert("Please select a challenge before submitting.");
    }

    try {
      const token = localStorage.getItem("token");
      await axiosInstance.post(
        "/recruiter/questions/bulk",
        {
          challengeId,
          questions,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Questions created successfully");
      setChallengeId("");
      setQuestions([{ ...emptyQuestion }]);
    } catch (err) {
      console.error(
        "Failed to create questions:",
        err.response?.data || err.message
      );
      alert("Failed to create questions");
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-white">
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <QuestionMarkCircleIcon className="w-8 h-8" />
              Question Factory
            </h1>
            <p className="mt-2 opacity-90">
              Craft engaging assessment questions
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 p-8">
            {/* Form Section */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Challenge
                </label>
                <div className="relative">
                  <select
                    value={challengeId}
                    onChange={(e) => setChallengeId(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent appearance-none"
                  >
                    <option value="">Choose a challenge...</option>
                    {challenges.map((ch) => (
                      <option key={ch._id} value={ch._id}>
                        {ch.title}
                      </option>
                    ))}
                  </select>
                  <DocumentTextIcon className="w-5 h-5 absolute left-3 top-3.5 text-gray-400" />
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

              {questions.map((q, idx) => (
                <div
                  key={idx}
                  className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium text-indigo-600">
                      Question #{idx + 1}
                    </h3>
                    {idx > 0 && (
                      <button
                        type="button"
                        onClick={() =>
                          setQuestions(questions.filter((_, i) => i !== idx))
                        }
                        className="text-red-500 hover:text-red-700 text-sm"
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Question Text
                      </label>
                      <div className="relative">
                        <input
                          name="questionText"
                          value={q.questionText}
                          onChange={(e) => handleChange(idx, e)}
                          placeholder="What's the capital of France?"
                          className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                        <QuestionMarkCircleIcon className="w-5 h-5 absolute left-3 top-3.5 text-gray-400" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Question Type
                      </label>
                      <div className="relative">
                        <select
                          name="type"
                          value={q.type}
                          onChange={(e) => handleChange(idx, e)}
                          className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent appearance-none"
                        >
                          <option value="mcq">Multiple Choice</option>
                          <option value="coding">Coding Challenge</option>
                          <option value="written">Written Response</option>
                        </select>
                        {q.type === "mcq" && (
                          <DocumentTextIcon className="w-5 h-5 absolute left-3 top-3.5 text-gray-400" />
                        )}
                        {q.type === "coding" && (
                          <CodeBracketIcon className="w-5 h-5 absolute left-3 top-3.5 text-gray-400" />
                        )}
                        {q.type === "written" && (
                          <PencilSquareIcon className="w-5 h-5 absolute left-3 top-3.5 text-gray-400" />
                        )}
                      </div>
                    </div>

                    {q.type === "mcq" && (
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                          Options
                        </label>
                        {q.options.map((opt, oIdx) => (
                          <div key={oIdx} className="flex items-center gap-2">
                            <span className="text-gray-500">
                              {String.fromCharCode(65 + oIdx)}.
                            </span>
                            <input
                              value={opt}
                              onChange={(e) =>
                                handleOptionChange(idx, oIdx, e.target.value)
                              }
                              placeholder={`Option ${oIdx + 1}`}
                              className="flex-1 pl-7 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500"
                            />
                          </div>
                        ))}
                      </div>
                    )}

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {q.type === "mcq"
                          ? "Correct Option"
                          : "Expected Answer"}
                      </label>
                      {q.type === "mcq" ? (
                        <select
                          name="correctAnswer"
                          value={q.correctAnswer}
                          onChange={(e) => handleChange(idx, e)}
                          className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        >
                          <option value="">Select correct option</option>
                          {q.options.map((_, oIdx) => (
                            <option
                              key={oIdx}
                              value={String.fromCharCode(65 + oIdx)}
                            >
                              Option {String.fromCharCode(65 + oIdx)}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          name="correctAnswer"
                          value={q.correctAnswer}
                          onChange={(e) => handleChange(idx, e)}
                          placeholder="Sample answer..."
                          className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Points
                      </label>
                      <input
                        name="score"
                        type="number"
                        value={q.score}
                        onChange={(e) => handleChange(idx, e)}
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        min="0"
                      />
                    </div>
                  </div>
                </div>
              ))}

              <div className="space-y-4">
                <button
                  type="button"
                  onClick={addQuestion}
                  className="w-full bg-indigo-100 hover:bg-indigo-200 text-indigo-600 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <PlusCircleIcon className="w-5 h-5" />
                  Add Another Question
                </button>

                <button
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  <CheckCircleIcon className="w-5 h-5" />
                  Publish All Questions
                </button>
              </div>

              {showSuccess && (
                <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-lg flex items-center gap-2">
                  <CheckCircleIcon className="w-5 h-5" />
                  Questions created successfully!
                </div>
              )}
            </form>

            {/* Preview Section */}
            <div className="bg-gray-50 p-6 rounded-lg border border-dashed border-gray-200">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <DocumentTextIcon className="w-5 h-5 text-gray-500" />
                Live Preview
              </h3>

              {challengeId ? (
                <div className="space-y-6">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="text-sm font-medium text-gray-500 mb-2">
                      Selected Challenge:
                    </h4>
                    <p className="text-indigo-600 font-medium">
                      {challenges.find((c) => c._id === challengeId)?.title}
                    </p>
                  </div>

                  {questions.map((q, idx) => (
                    <div
                      key={idx}
                      className="bg-white p-4 rounded-lg shadow-sm"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-gray-500">
                            Q{idx + 1}
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
                          {q.score} pts
                        </span>
                      </div>

                      <p className="text-gray-800 mb-4">{q.questionText}</p>

                      {q.type === "mcq" && (
                        <div className="space-y-2">
                          {q.options.map((opt, oIdx) => (
                            <div
                              key={oIdx}
                              className={`p-2 rounded border ${
                                q.correctAnswer ===
                                String.fromCharCode(65 + oIdx)
                                  ? "border-green-300 bg-green-50"
                                  : "border-gray-200"
                              }`}
                            >
                              {String.fromCharCode(65 + oIdx)}. {opt}
                            </div>
                          ))}
                        </div>
                      )}

                      {q.type !== "mcq" && q.correctAnswer && (
                        <div className="mt-4 p-3 bg-gray-50 rounded border border-gray-200">
                          <p className="text-sm text-gray-600">
                            Sample Answer:
                          </p>
                          <p className="text-gray-800">{q.correctAnswer}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 text-sm">
                  Select a challenge and start adding questions to see
                  preview...
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionForm;
