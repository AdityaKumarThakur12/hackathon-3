import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

export default function UserStats() {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');

  const fetchGitHubData = async () => {
    setError('');
    try {
      const res = await fetch(`https://api.github.com/users/${username}`);
      if (!res.ok) throw new Error('GitHub user not found');

      const data = await res.json();

      setUserData({
        ...data,
        languages: ['JavaScript', 'React'], // Optional: improve later
        recent_activity: 'Active contributor', // Optional: GitHub Events API
      });
    } catch (err) {
      setError(err.message || 'Something went wrong');
      setUserData(null);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-8 p-4">

      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Enter GitHub Username"
          className="border border-gray-300 px-4 py-2 rounded-l w-full"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button
          onClick={fetchGitHubData}
          className="bg-black text-white px-6 py-2 rounded-r hover:bg-gray-800"
        >
          Fetch
        </button>
      </div>

      {error && (
        <p className="text-red-500 text-center mb-4">{error}</p>
      )}

      {/* 👇 Show this only when userData is null and no error */}
      {!userData && !error && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center text-gray-400 p-6 border border-dashed border-gray-600 rounded-xl"
        >
          <p className="text-xl font-semibold mb-2">🧠 Your GitHub Stats Will Appear Here</p>
          <p className="text-sm">Enter a username and click fetch to see the magic ✨</p>
        </motion.div>
      )}

      {/* 👇 Your untouched original block for when data is fetched */}
      {userData && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-white via-gray-100 to-white shadow-xl rounded-2xl p-6 hover:shadow-2xl transition-shadow duration-300"
        >
          <div className="flex items-center space-x-4 mb-4">
            <img
              src={userData.avatar_url}
              alt="GitHub Profile"
              className="w-20 h-20 rounded-full shadow-md"
            />
            <div>
              <h2 className="text-2xl text-black font-bold">{userData.name || userData.login}</h2>
              {userData.location && <p className="text-gray-500">{userData.location}</p>}
            </div>
          </div>

          {userData.bio && (
            <p className="text-gray-700 italic mb-4">"{userData.bio}"</p>
          )}

          <div className="grid grid-cols-2 gap-4 text-sm text-gray-800">
            <p><strong>Repos:</strong> {userData.public_repos}</p>
            <p><strong>Followers:</strong> {userData.followers}</p>
            <p><strong>Languages:</strong> {userData.languages.join(', ')}</p>
            <p><strong>Recent Activity:</strong> {userData.recent_activity}</p>
          </div>

          <div className="flex space-x-4 mt-4">
            <a href={userData.html_url} target="_blank" rel="noopener noreferrer">
              <FaGithub className="text-xl hover:text-black" />
            </a>
            {userData.blog?.includes("linkedin.com") && (
              <a href={userData.blog} target="_blank" rel="noopener noreferrer">
                <FaLinkedin className="text-xl hover:text-blue-600" />
              </a>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
}
