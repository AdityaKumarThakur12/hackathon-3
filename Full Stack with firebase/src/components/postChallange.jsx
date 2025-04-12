import React, { useState } from 'react';
import { ref, push, get, child } from 'firebase/database';
import { db } from '../firebaseConfig/firebase';
import { auth } from '../firebaseConfig/firebase'; // Ensure this exists and is correct

const PostChallengeForm = ({ onPost }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [skills, setSkills] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = auth.currentUser;
    if (!user) {
      alert("You're not logged in!");
      return;
    }

    const uid = user.uid;

    try {
      // Fetch company info from users/${uid}/company
      const companySnap = await get(ref(db, `users/${uid}/company`));
      let companyInfo = {
        company: "Unknown",
        location: "Not specified",
        description: "",
      };

      if (companySnap.exists()) {
        companyInfo = companySnap.val();
      }

      const newChallenge = {
        title,
        description,
        skills: skills.split(',').map((s) => s.trim()),
        postedAt: new Date().toISOString(),
        postedBy: {
          uid,
          ...companyInfo,
        },
      };

      // Call parent callback (if needed)
      onPost(newChallenge);

      // Save to Firebase Realtime Database
      await push(ref(db, 'challenges'), newChallenge);
      console.log('✅ Challenge saved to Firebase with company info');

      // Reset form
      setTitle('');
      setDescription('');
      setSkills('');
    } catch (error) {
      console.error('❌ Error saving challenge:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3 className="text-lg font-semibold mb-4 text-gray-700">Post a New Challenge</h3>

      <div className="mb-4">
        <label className="block font-medium text-gray-600 mb-1">Title</label>
        <input
          className="w-full border border-gray-300 p-2 rounded-lg"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block font-medium text-gray-600 mb-1">Description</label>
        <textarea
          className="w-full border border-gray-300 p-2 rounded-lg"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block font-medium text-gray-600 mb-1">
          Required Skills (comma separated)
        </label>
        <input
          className="w-full border border-gray-300 p-2 rounded-lg"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          placeholder="e.g., React, MongoDB, Figma"
          required
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
      >
        Post Challenge
      </button>
    </form>
  );
};

export default PostChallengeForm;
