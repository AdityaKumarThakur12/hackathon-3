import React from 'react';

const SubmissionModal = ({ isOpen, onClose, submissions }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white w-[90%] md:w-[600px] rounded-2xl p-6 relative shadow-xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-black text-xl font-bold"
        >
          ×
        </button>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Challenge Submissions</h2>

        {submissions && submissions.length > 0 ? (
          <ul className="space-y-3 max-h-80 overflow-y-auto">
            {submissions.map((submission, index) => (
              <li
                key={index}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition"
              >
                <p className="text-sm font-medium text-gray-700">
                  Submitted by: <span className="text-indigo-600">{submission.username}</span>
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Submitted on: {new Date(submission.date).toLocaleString()}
                </p>
                <a
                  href={submission.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline text-sm mt-2 block"
                >
                  View Submission
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500">No submissions for this challenge yet.</p>
        )}
      </div>
    </div>
  );
};

export default SubmissionModal;
