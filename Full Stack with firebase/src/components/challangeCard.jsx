import React from 'react';

const ChallengeCard = ({ challenge, onViewSubmissions }) => {
  const postedBy = challenge.postedBy || {};

  return (
    <div className="bg-white p-4 rounded-xl shadow hover:shadow-md transition">
      <h3 className="text-lg font-semibold text-gray-800">{challenge.title}</h3>
      <p className="text-sm text-gray-600 mt-1">{challenge.description}</p>

      <div className="mt-2 text-xs text-blue-600">
        Skills: {challenge.skills.join(', ')}
      </div>

      <div className="mt-2 text-xs text-gray-700 italic">
        Posted by: {postedBy.company || 'Unknown Company'}
        {postedBy.location ? ` (${postedBy.location})` : ''}
      </div>

      <button
        className="mt-3 text-sm bg-indigo-500 text-white px-3 py-1 rounded hover:bg-indigo-600"
        onClick={() => onViewSubmissions(challenge.id || challenge.title)}
      >
        View Submissions
      </button>

      <p className="mt-2 text-xs text-gray-500">
        Posted on: {new Date(challenge.postedAt).toLocaleDateString()}
      </p>
    </div>
  );
};

export default ChallengeCard;
