import React, { useEffect, useState } from 'react';
import { ref, get } from 'firebase/database';
import { db } from '../firebaseConfig/firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import AIReviewModal from './aireviewModal';

const MySubmissions = () => {
    const [submissions, setSubmissions] = useState([]);
    const [filteredSubmissions, setFilteredSubmissions] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTopic, setSelectedTopic] = useState('');
    const [topics, setTopics] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [repoUrl, setRepoUrl] = useState('');

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setCurrentUser(user);
            } else {
                console.warn('User not logged in');
                setLoading(false);
            }
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (!currentUser) return;

        const fetchSubmissions = async () => {
            try {
                const submissionsRef = ref(db, 'submissions');
                const snapshot = await get(submissionsRef);
                const data = snapshot.val();
                const userSubmissions = [];

                if (data) {
                    const challengeFetches = [];

                    for (const [challengeId, users] of Object.entries(data)) {
                        for (const [userId, submission] of Object.entries(users)) {
                            if (userId === currentUser.uid) {
                                const challengeRef = ref(db, `challenges/${challengeId}`);
                                const fetchChallenge = get(challengeRef).then((challengeSnap) => {
                                    const challengeData = challengeSnap.val();
                                    const topic = challengeData?.title || 'Unknown Topic';

                                    userSubmissions.push({
                                        challengeId,
                                        userId,
                                        email: currentUser.email,
                                        topic,
                                        description: challengeData?.description || 'No description available',
                                        ...submission,
                                    });
                                });

                                challengeFetches.push(fetchChallenge);
                            }
                        }
                    }

                    await Promise.all(challengeFetches);
                }

                const reversed = userSubmissions.reverse();
                setSubmissions(reversed);
                setFilteredSubmissions(reversed);

                // Extract unique topics
                const allTopics = [...new Set(reversed.map((s) => s.topic))];
                setTopics(allTopics);
            } catch (error) {
                console.error('Error fetching submissions:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchSubmissions();
    }, [currentUser]);

    useEffect(() => {
        let filtered = submissions;

        if (searchTerm.trim()) {
            filtered = filtered.filter((sub) =>
                sub.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (selectedTopic) {
            filtered = filtered.filter((sub) => sub.title === selectedTopic);
        }

        setFilteredSubmissions(filtered);
    }, [searchTerm, selectedTopic, submissions]);

    const handleAIReview = (submission) => {
        if (!submission.link) {
            alert('No GitHub link found for this submission.');
            return;
        }
        setRepoUrl(submission.link);
        setShowModal(true);
    };

    return (
        <div className="min-h-screen bg-[#0d1117] py-10 px-6">
            <h2 className="text-3xl md:text-5xl font-extrabold text-center leading-snug bg-clip-text text-transparent bg-gradient-to-r from-sky-400 via-indigo-400 to-purple-500 animate-gradient mb-6">
                MY <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 animate-gradient-fast">Submissions</span>
            </h2>

            {/* Filters */}
            <div className="mb-8 flex flex-col md:flex-row gap-4 justify-center items-center">
                <input
                    type="text"
                    placeholder="Search by title..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="px-4 py-2 rounded-lg bg-[#1c1f26] text-white border border-cyan-400 w-72 focus:outline-none"
                />
                <select
                    value={selectedTopic}
                    onChange={(e) => setSelectedTopic(e.target.value)}
                    className="px-4 py-2 rounded-lg bg-[#1c1f26] text-white border border-purple-400 w-72 focus:outline-none"
                >
                    <option value="">All Topics</option>
                    {topics.map((topic, i) => (
                        <option key={i} value={topic}>
                            {topic}
                        </option>
                    ))}
                </select>
            </div>

            {/* Total count */}
            <p className="text-center text-sm text-cyan-300 mb-6">
                Total Submissions: <span className="font-bold">{filteredSubmissions.length}</span>
            </p>

            {loading ? (
                <p className="text-center text-gray-400">Loading your submissions...</p>
            ) : filteredSubmissions.length === 0 ? (
                <p className="text-center text-gray-500">No submissions found.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredSubmissions.map((sub, index) => (
                        <div
                            key={index}
                            className="bg-[#161b22] border border-cyan-500/20 p-5 rounded-xl shadow-md text-white transition-all duration-300 hover:shadow-cyan-500/30 hover:scale-[1.02] hover:border-cyan-400 hover:backdrop-blur-sm"
                        >
                            <h2 className="text-xl font-semibold text-cyan-300 mb-2 drop-shadow-md">
                                {sub.title}
                            </h2>
                            <p className="text-sm text-gray-400 mb-2">
                                <strong>Challenge ID:</strong> {sub.challengeId}
                            </p>
                            <p className="text-gray-300 mb-2">
                                <strong>Email:</strong> {sub.email}
                            </p>
                            <p className="text-gray-300 mb-2">
                                <strong>Submission Date:</strong>{' '}
                                {sub.date ? new Date(sub.date).toLocaleString() : 'Unknown'}
                            </p>
                            <p className="text-gray-300 mb-2">
                                <strong>Your Submission:</strong>{' '}
                                <span className="block overflow-hidden text-ellipsis whitespace-nowrap">
                                    {sub.submission || sub.link || 'No submission text'}
                                </span>
                            </p>
                            <div className="flex justify-around gap-2 items-center mt-3">
                                {sub.link && (
                                    <a
                                        href={sub.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-white flex text-sm bg-cyan-600 px-3 py-2 rounded-lg hover:bg-cyan-700 transition duration-300 shadow-md hover:shadow-cyan-400"
                                    >
                                      🔗 View Link
                                    </a>
                                )}
                                <button
                                    onClick={() => handleAIReview(sub)}
                                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition duration-300 shadow-md hover:shadow-purple-400"
                                >
                                    AI Review ✨ 
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* AI Review Modal */}
            {showModal && (
                <AIReviewModal
                    repoUrl={repoUrl}
                    onClose={() => setShowModal(false)}
                />
            )}
        </div>
    );
};

export default MySubmissions;