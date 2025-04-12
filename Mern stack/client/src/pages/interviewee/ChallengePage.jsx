import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { useParams, useNavigate } from "react-router-dom";
import {
  PuzzlePieceIcon,
  ClockIcon,
  DocumentTextIcon,
  CodeBracketIcon,
  CheckCircleIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";

export default function ChallengePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [challenge, setChallenge] = useState(null);
  const [answers, setAnswers] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(3600); // 1 hour in seconds
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!id) {
      setError("Challenge ID is missing");
      setLoading(false);
      return;
    }

    axios
      .get(`/interviewee/challenge/${id}`)
      .then((res) => {
        if (!res.data) throw new Error("Challenge not found");
        setChallenge(res.data);
        setLoading(false);
        // Initialize timer if challenge has duration
        if (res.data.duration) setTimeLeft(res.data.duration * 60);
      })
      .catch((err) => {
        console.error("Error fetching challenge:", err);
        setError(err.message || "Failed to load challenge");
        setLoading(false);
      });
  }, [id]);

  // Timer countdown
  useEffect(() => {
    if (!timeLeft) return;
    const timer = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleChange = (qId, value) => {
    setAnswers((prev) => ({ ...prev, [qId]: value }));
  };

  const calculateProgress = () => {
    const answered = Object.keys(answers).length;
    return (answered / challenge.questions.length) * 100;
  };

  const handleSubmit = async () => {
    if (
      window.confirm(
        "Are you sure you want to submit? This action cannot be undone."
      )
    ) {
      setIsSubmitting(true);
      try {
        const totalScore = challenge.questions.reduce((sum, q) => {
          const correct = answers[q._id] === q.correctAnswer;
          return sum + (correct ? q.score : 0);
        }, 0);

        await axios.post("/interviewee/submit", {
          challengeId: challenge._id,
          answers: Object.values(answers),
          score: totalScore,
        });

        // In your challenge submission handler
        navigate("/interviewee/results");
      } catch (err) {
        console.error("Submission error:", err);
        alert("Submission failed. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    }
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      {/* Challenge Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-3">
                <PuzzlePieceIcon className="w-8 h-8" />
                {challenge.title}
              </h1>
              <p className="mt-2 opacity-90">{challenge.description}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-white/10 p-3 rounded-lg">
                <ClockIcon className="w-6 h-6" />
                <span className="ml-2">
                  {Math.floor(timeLeft / 60)}:
                  {(timeLeft % 60).toString().padStart(2, "0")}
                </span>
              </div>
              <div className="bg-white/10 p-3 rounded-lg">
                <span className="text-sm">Progress:</span>
                <span className="ml-2 font-bold">
                  {calculateProgress().toFixed(0)}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-8 grid md:grid-cols-4 gap-8">
        {/* Questions List */}
        <div className="md:col-span-3 space-y-6">
          {challenge.questions.map((q, idx) => (
            <div key={q._id} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                  <span className="text-indigo-600 font-medium">{idx + 1}</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{q.questionText}</h3>
                  <span
                    className={`text-sm ${
                      q.type === "mcq"
                        ? "text-blue-600"
                        : q.type === "coding"
                        ? "text-green-600"
                        : "text-purple-600"
                    }`}
                  >
                    {q.type.toUpperCase()} • {q.score} points
                  </span>
                </div>
              </div>

              {q.type === "mcq" ? (
                <div className="grid gap-2">
                  {q.options?.map((opt, i) => (
                    <label
                      key={i}
                      className={`p-3 rounded-lg border cursor-pointer transition-all ${
                        answers[q._id] === opt
                          ? "border-indigo-500 bg-indigo-50"
                          : "border-gray-200 hover:border-indigo-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name={q._id}
                        value={opt}
                        onChange={(e) => handleChange(q._id, e.target.value)}
                        className="hidden"
                      />
                      {opt}
                    </label>
                  ))}
                </div>
              ) : (
                <div className="relative">
                  {q.type === "coding" && (
                    <>
                      <div className="absolute top-3 right-3 text-gray-400">
                        <CodeBracketIcon className="w-5 h-5" />
                      </div>
                      <div className="mb-2 text-sm font-mono text-gray-500">
                        {q.language || "JavaScript"} code
                      </div>
                    </>
                  )}
                  <textarea
                    className={`w-full p-4 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                      q.type === "coding" ? "h-48 font-mono text-sm" : "h-32"
                    }`}
                    value={answers[q._id] || ""}
                    onChange={(e) => handleChange(q._id, e.target.value)}
                    placeholder={
                      q.type === "coding"
                        ? "Write your code here..."
                        : "Type your written answer here..."
                    }
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Progress Sidebar */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-xl shadow-sm p-6 sticky top-8">
            <h3 className="text-lg font-semibold mb-4">Challenge Summary</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Total Questions:</span>
                <span className="font-semibold">
                  {challenge.questions.length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Answered:</span>
                <span className="font-semibold text-indigo-600">
                  {Object.keys(answers).length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Estimated Time:</span>
                <span className="font-semibold">
                  {challenge.duration || 60} mins
                </span>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full mt-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-3 rounded-lg font-semibold transition-all disabled:opacity-50"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <ArrowPathIcon className="w-4 h-4 animate-spin" />
                  Submitting...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <CheckCircleIcon className="w-5 h-5" />
                  Submit Challenge
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
