import React, { useState } from 'react';
import { fetchGitHubStats } from '../../utils/githubApi';
import { getGeminiFeedback } from '../../utils/geminiAPi';

export default function InputForm({ setUserData, setAiFeedback }) {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const stats = await fetchGitHubStats(username);
      setUserData(stats);

      const prompt = `Analyze this GitHub user:\nRepos: ${stats.public_repos}\nFollowers: ${stats.followers}\nLanguages: ${stats.languages.join(', ')}\nActive: ${stats.recent_activity}\nGive a professional IT-readiness analysis.`;
      const feedback = await getGeminiFeedback(prompt);
      setAiFeedback(feedback);
    } catch (error) {
      alert('Something went wrong. Please try again.');
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mb-8">
      <input
        type="text"
        className="w-85 md:w-85 sm:w-74 max-w-md p-3 border rounded-lg mb-4 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter GitHub username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 flex items-center justify-center gap-2"
        disabled={loading}
      >
        {loading ? (
          <>
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8z"
              ></path>
            </svg>
            Analyzing...
          </>
        ) : (
          'Analyze Profile'
        )}
      </button>
    </form>
  );
}
