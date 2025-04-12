import React from 'react';

export default function AiFeedback({ feedback }) {
  const parseFeedback = (text) => {
    const lines = text.split('\n');
    let addedSections = {
      strengths: false,
      weaknesses: false,
      assessment: false,
      recommendation: false,
      conclusion: false,
      roles: false, // 🆕 tracking if roles were added
    };

    return lines.map((line, index) => {
      const trimmed = line.trim().replace(/\*\*/g, ''); // kill the stars
      const lowered = trimmed.toLowerCase();

      if (!trimmed) return <br key={index} />;
      

      // 🌟 Strengths
      if (
        (lowered.includes('strengths:') || lowered.startsWith('strengths')) &&
        !addedSections.strengths
      ) {
        addedSections.strengths = true;
        return (
          <p key={index} className="mt-6 text-green-700 font-bold text-lg">
            🌟 What You’re Crushing:
          </p>
        );
      }

      // ⚠️ Weaknesses
      if (
        (lowered.includes('weaknesses:') || lowered.startsWith('weaknesses')) &&
        !addedSections.weaknesses
      ) {
        addedSections.weaknesses = true;
        return (
          <p key={index} className="mt-6 text-red-700 font-bold text-lg">
            ⚠️ Where You’re Slippin’:
          </p>
        );
      }

      // 🧠 Assessment
      if (
        (lowered.includes('assessment') || trimmed.includes('🧠')) &&
        !addedSections.assessment
      ) {
        addedSections.assessment = true;
        return (
          <p key={index} className="mt-6 font-bold text-indigo-700 text-lg">
            🧠 IT Readiness Assessment:
          </p>
        );
      }

      // 📌 Recommendations
      if (
        (lowered.includes('recommendation') || trimmed.includes('📌')) &&
        !addedSections.recommendation
      ) {
        addedSections.recommendation = true;
        return (
          <p key={index} className="mt-6 font-bold text-blue-700 text-lg">
            📌 Recommendations for Level-Up:
          </p>
        );
      }

      // 🧾 Conclusion
      if (
        (lowered.startsWith('this user') || lowered.includes('conclusion') || trimmed.includes('🧾')) &&
        !addedSections.conclusion
      ) {
        addedSections.conclusion = true;
        return (
          <p key={index} className="mt-6 font-bold text-gray-700 text-lg">
            🧾 Final Verdict:
          </p>
        );
      }

      // 💼 Suitable Roles
      if (
        (lowered.includes('suitable role') || lowered.includes('ideal role') || trimmed.includes('💼')) &&
        !addedSections.roles
      ) {
        addedSections.roles = true;
        return (
          <p key={index} className="mt-6 font-bold text-purple-700 text-lg">
            💼 Ideal Roles Based on Your Vibes:
          </p>
        );
      }

      // ✅ Positive bullet
      if (trimmed.startsWith('✅') || trimmed.startsWith('* ✅')) {
        return (
          <p key={index} className="text-green-700 pl-4 font-medium">
            {trimmed.replace('* ', '')}
          </p>
        );
      }

      // ❌ Negative bullet
      if (trimmed.startsWith('❌') || trimmed.startsWith('* ❌')) {
        return (
          <p key={index} className="text-red-700 pl-4 font-medium">
            {trimmed.replace('* ', '')}
          </p>
        );
      }

      // Generic bullet
      if (trimmed.startsWith('*')) {
        return (
          <p key={index} className="pl-4 list-disc list-inside text-gray-900 font-medium">
            {trimmed.replace('* ', '')}
          </p>
        );
      }

      // Default paragraph
      return (
        <p key={index} className="text-gray-900 leading-relaxed mb-2">
          {trimmed}
        </p>
      );
    });
  };

  return (
    <div className="bg-white shadow-md p-6 rounded-xl text-sm sm:text-base">
      {parseFeedback(feedback)}
    </div>
  );
}
