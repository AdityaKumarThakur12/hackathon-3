import React, { useState, useEffect } from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import { getDatabase, ref, get } from 'firebase/database';
import ChatBotToggle from '../components/ChatBot/chatBot';

const AllJobsPage = () => {
    const [jobs, setJobs] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOption, setSortOption] = useState('date');

    useEffect(() => {
        const fetchAllJobs = async () => {
            const db = getDatabase();
            const usersRef = ref(db, 'users');
            try {
                const snapshot = await get(usersRef);
                if (snapshot.exists()) {
                    const usersData = snapshot.val();
                    const allJobs = [];

                    for (const uid in usersData) {
                        const user = usersData[uid];
                        if (user.jobs) {
                            for (const jobId in user.jobs) {
                                const job = user.jobs[jobId];
                                allJobs.push({
                                    ...job,
                                    company: user.company?.company || 'Unknown Company',
                                    location: user.company?.location || 'Unknown Location',
                                    postedBy: user.profile?.name || 'Unknown Recruiter',
                                    postedAt: job.date || Date.now(),
                                });
                            }
                        }
                    }

                    setJobs(allJobs);
                } else {
                    console.log('No users found');
                }
            } catch (error) {
                console.error('Error fetching jobs:', error);
            }
        };

        fetchAllJobs();
    }, []);

    const filteredJobs = jobs
        .filter(job =>
            job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.company.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
            if (sortOption === 'date') {
                return new Date(b.postedAt) - new Date(a.postedAt);
            } else if (sortOption === 'title') {
                return a.title.localeCompare(b.title);
            }
            return 0;
        });

    return (
        <>
            <div className='bg-black'>
                <Navbar />
            </div>

            <div className="min-h-screen bg-[#0d1117] text-gray-200 p-6 pb-18">
                <h2 className="text-3xl md:text-5xl font-extrabold text-center leading-snug bg-clip-text text-transparent bg-gradient-to-r from-sky-400 via-indigo-400 to-purple-500 animate-gradient mb-10">
                    Drag Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 animate-gradient-fast">
                        Dream Company
                    </span>
                </h2>

                {/* Filters */}
                <div className="flex flex-col md:flex-row gap-4 mb-8 justify-between items-center">
                    <input
                        type="text"
                        placeholder="🔍 Search by title or company..."
                        className="w-full md:w-1/2 p-3 rounded-xl bg-[#161b22] text-gray-200 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                    <select
                        className="w-full md:w-1/4 p-3 rounded-xl bg-[#161b22] text-gray-200 border border-gray-600"
                        value={sortOption}
                        onChange={e => setSortOption(e.target.value)}
                    >
                        <option value="date">Sort by Date</option>
                        <option value="title">Sort by Title</option>
                    </select>
                </div>

                {/* Job Cards */}
                {filteredJobs.length === 0 ? (
                    <p className="text-center text-lg text-gray-400">No job postings found.</p>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredJobs.map((job, index) => (
                            <div
                                key={index}
                                className="bg-[#161b22] border border-gray-700 rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300"
                            >
                                <h3 className="text-2xl font-semibold text-indigo-400 mb-2">{job.title}</h3>
                                <p className="text-base text-gray-300 mb-4">{job.description}</p>
                                <p className="text-sm text-gray-400 mb-1"><strong>🏢 Company:</strong> {job.company}</p>
                                <p className="text-sm text-gray-400 mb-1"><strong>📍 Location:</strong> {job.location}</p>
                                <p className="text-xs text-gray-500 mt-2 mb-4">
                                    Posted by {job.postedBy} on {new Date(job.postedAt).toLocaleDateString()}
                                </p>
                                <button className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded-xl transition-all">
                                    📩 Contact HR
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <Footer />
            <ChatBotToggle/>
        </>
    );
};

export default AllJobsPage;
