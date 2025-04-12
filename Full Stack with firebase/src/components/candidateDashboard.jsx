import React, { useEffect, useState } from 'react';
import Navbar from './navbar';
import Footer from './footer';
import { db } from '../firebaseConfig/firebase';
import { ref, onValue } from 'firebase/database';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { set, ref as dbRef } from 'firebase/database';
import MySubmissions from './allSubmission'; 
import ChatBotToggle from './ChatBot/chatBot';

const CandidateDashboard = () => {
    const [challenges, setChallenges] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const challengesPerPage = 6;
    const [submission, setSubmission] = useState('');
    const [selectedChallenge, setSelectedChallenge] = useState(null);
    const [expandedChallengeId, setExpandedChallengeId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
    const navigate = useNavigate();

    // States for filters
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedSkill, setSelectedSkill] = useState('');
    const [selectedCompany, setSelectedCompany] = useState('');

    useEffect(() => {
        const usersRef = ref(db, 'users');

        onValue(usersRef, (snapshot) => {
            const usersData = snapshot.val();
            const allChallenges = [];

            if (usersData) {
                Object.entries(usersData).forEach(([userId, userData]) => {
                    const companyData = userData.company || {};
                    const company = companyData.company || 'Unknown Company';
                    const location = companyData.location || 'Unknown Location';

                    if (userData.challenges) {
                        Object.entries(userData.challenges).forEach(([challengeId, challengeData]) => {
                            allChallenges.push({
                                id: challengeId,
                                ...challengeData,
                                postedBy: { company, location },
                            });
                        });
                    }
                });
            }

            allChallenges.sort((a, b) => b.postedAt - a.postedAt);
            setChallenges(allChallenges);
        });
    }, []);

    const totalPages = Math.ceil(challenges.length / challengesPerPage);

    // Filter challenges based on search query and selected filters
    const filteredChallenges = challenges.filter((challenge) => {
        const matchesSearch = challenge.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesSkill = selectedSkill ? challenge.skills?.includes(selectedSkill) : true;
        const matchesCompany = selectedCompany ? challenge.postedBy?.company === selectedCompany : true;
        return matchesSearch && matchesSkill && matchesCompany;
    });

    const currentChallenges = filteredChallenges.slice(
        (currentPage - 1) * challengesPerPage,
        currentPage * challengesPerPage
    );

    const handleSubmit = async () => {
        if (!submission.trim()) return alert('Please enter a submission link!');
        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) return alert('You must be logged in to submit.');

        const challengeId = selectedChallenge?.id;
        const submissionRef = dbRef(db, `submissions/${challengeId}/${user.uid}`);

        const newSubmission = {
            link: submission,
            date: Date.now(),
            username: user.displayName || user.email || 'Anonymous',
            title: selectedChallenge?.title,
        };

        try {
            await set(submissionRef, newSubmission);
            alert('Submission successful!');
            setSubmission('');
            setSelectedChallenge(null);
        } catch (error) {
            console.error('Error submitting:', error);
            alert('Failed to submit. Try again.');
        }
    };

    const toggleReadMore = (id) => {
        setExpandedChallengeId(expandedChallengeId === id ? null : id);
    };

    return (
        <>
            <div className='bg-zinc-950 text-white'>
                <Navbar />
                <div className="min-h-screen p-8">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-3xl md:text-5xl font-extrabold text-center leading-snug bg-clip-text text-transparent bg-gradient-to-r from-sky-400 via-indigo-400 to-purple-500 animate-gradient">
                            Candidate <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 animate-gradient-fast">
                                Dashboard
                            </span>
                        </h2>
                        {/* View All Submissions Button */}
                        <button
                            onClick={() => setIsModalOpen(true)} // Open the modal
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md transition duration-300"
                        >
                            View All Submissions
                        </button>
                    </div>

                    {/* Filters Section */}
                    <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Search Filter */}
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search challenges..."
                            className="w-full p-3 rounded-lg border border-gray-300 bg-zinc-800 text-white"
                        />

                        {/* Skill Filter */}
                        <select
                            value={selectedSkill}
                            onChange={(e) => setSelectedSkill(e.target.value)}
                            className="w-full p-3 rounded-lg border border-gray-300 bg-zinc-800 text-white"
                        >
                            <option value="">Filter by Skill</option>
                            {[...new Set(challenges.flatMap((c) => c.skills || []))].map((skill, index) => (
                                <option key={index} value={skill}>
                                    {skill}
                                </option>
                            ))}
                        </select>

                        {/* Company Filter */}
                        <select
                            value={selectedCompany}
                            onChange={(e) => setSelectedCompany(e.target.value)}
                            className="w-full p-3 rounded-lg border border-gray-300 bg-zinc-800 text-white"
                        >
                            <option value="">Filter by Company</option>
                            {[...new Set(challenges.map((c) => c.postedBy?.company))].map((company, index) => (
                                <option key={index} value={company}>
                                    {company}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr">
                        {currentChallenges.map((challenge) => {
                            const isExpanded = expandedChallengeId === challenge.id;
                            const descriptionPreview = isExpanded
                                ? challenge.description
                                : challenge.description?.slice(0, 220);

                            return (
                                <div
                                    key={challenge.id}
                                    className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 flex flex-col justify-between transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl shadow-black/30"
                                >
                                    <div>
                                        <h2 className="text-xl font-bold text-white mb-2">{challenge.title}</h2>
                                        <p className="text-sm text-zinc-300 mb-3">
                                            {descriptionPreview}
                                            {!isExpanded && challenge.description?.length > 220 && (
                                                <span
                                                    onClick={() => toggleReadMore(challenge.id)}
                                                    className="text-blue-400 cursor-pointer ml-2 hover:underline transition-all"
                                                >
                                                    Read more
                                                </span>
                                            )}
                                            {isExpanded && (
                                                <span
                                                    onClick={() => toggleReadMore(null)}
                                                    className="text-blue-400 cursor-pointer ml-2 hover:underline"
                                                >
                                                    Show less
                                                </span>
                                            )}
                                        </p>
                                        <p className="text-sm text-zinc-400 mb-1">
                                            <strong className='text-red-500'>Skills:</strong> {challenge.skills?.join(', ') || 'N/A'}
                                        </p>
                                        <p className="text-sm text-zinc-400 mt-1">
                                            <strong className='text-teal-400'>Posted by:</strong>{' '}
                                            <span className="italic">{challenge.postedBy?.company} ({challenge.postedBy?.location})</span>
                                        </p>
                                        <p className="text-xs text-gray-400 mt-2">
                                            <strong>Date:</strong>{' '}
                                            {challenge.postedAt ? new Date(challenge.postedAt).toLocaleDateString() : 'Unknown'}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => setSelectedChallenge(challenge)}
                                        className="mt-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-5 py-2 rounded hover:brightness-110 transition-all duration-200 shadow-md shadow-blue-600/20"
                                    >
                                        Submit Solution
                                    </button>
                                </div>
                            );
                        })}
                    </div>

                    <div className="mt-12 flex justify-center items-center space-x-3">
                        <button
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            className={`p-3 rounded-full border border-zinc-700 text-zinc-300 transition hover:bg-zinc-800 ${currentPage === 1 ? 'cursor-not-allowed opacity-40' : ''
                                }`}
                        >
                            <ArrowLeft className="h-5 w-5" />
                        </button>

                        {[...Array(totalPages)].map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentPage(i + 1)}
                                className={`px-4 py-2 rounded-full font-medium text-sm transition-all duration-200 
                                ${currentPage === i + 1
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-zinc-800 border border-zinc-600 text-zinc-300 hover:bg-zinc-700'
                                    }`}
                            >
                                {i + 1}
                            </button>
                        ))}

                        <button
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                            className={`p-3 rounded-full border border-zinc-700 text-zinc-300 transition hover:bg-zinc-800 ${currentPage === totalPages ? 'cursor-not-allowed opacity-40' : ''
                                }`}
                        >
                            <ArrowRight className="h-5 w-5" />
                        </button>
                    </div>

                    {selectedChallenge && (
                        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50">
                            <div className="bg-zinc-900 border border-zinc-700 rounded-lg shadow-2xl p-6 w-full max-w-md relative">
                                <button
                                    onClick={() => setSelectedChallenge(null)}
                                    className="absolute top-3 right-3 text-gray-400 hover:text-white text-xl"
                                >
                                    &times;
                                </button>
                                <h2 className="text-xl font-bold mb-4 text-white">
                                    Submit for: {selectedChallenge.title}
                                </h2>
                                <textarea
                                    value={submission}
                                    onChange={(e) => setSubmission(e.target.value)}
                                    placeholder="Paste your GitHub repo or hosted project link..."
                                    className="w-full border border-zinc-600 bg-zinc-800 text-white rounded p-3 h-32 resize-none"
                                />
                                <button
                                    onClick={handleSubmit}
                                    className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Modal */}
                    {isModalOpen && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md">
                            <div className="relative w-11/12 max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-[#0f172a] to-[#1e293b] p-6 shadow-2xl shadow-cyan-500/30 animate-fadeIn">
                                <button
                                    onClick={() => setIsModalOpen(false)} // Close the modal
                                    className="absolute top-3 right-3 text-white text-xl hover:text-cyan-400 transition-all"
                                >
                                    ✕
                                </button>
                                <MySubmissions />
                            </div>
                        </div>
                    )}
                </div>
                <Footer />
                <ChatBotToggle/>
            </div>
        </>
    );
};

export default CandidateDashboard;