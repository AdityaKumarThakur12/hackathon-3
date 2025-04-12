import React, { useState, useEffect } from 'react';
import PostChallengeForm from './postChallange';
import ChallengeCard from './challangeCard';
import SubmissionModal from './submissionModal';

import { getDatabase, ref, get, set, push } from 'firebase/database';
import { getAuth, signOut } from 'firebase/auth';

const RecruiterDashboard = () => {
    const [challenges, setChallenges] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedChallenge, setSelectedChallenge] = useState(null);
    const [submissions, setSubmissions] = useState([]);
    const [profile, setProfile] = useState({ name: '', email: '', role: '', company: '', location: '', description: '' });
    const [companyForm, setCompanyForm] = useState({
        companyName: "",
        location: "",
        description: "",
    });
    const [jobTitle, setJobTitle] = useState('');
    const [jobDesc, setJobDesc] = useState('');
    const [postedJobs, setPostedJobs] = useState([]);
    const [showUpdateForm, setShowUpdateForm] = useState(false);


    const auth = getAuth();

    useEffect(() => {
        const user = auth.currentUser;
        if (!user) return;

        const db = getDatabase();
        const uid = user.uid;

        const fetchProfile = async () => {
            try {
                const profileRef = ref(db, `users/${uid}/profile`);
                const snapshot = await get(profileRef);
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    setProfile(data);
                    setCompanyForm({
                        company: data.company || '',
                        location: data.location || '',
                        description: data.description || ''
                    });
                } else {
                    console.log('No profile data found');
                }
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };
        const fetchCompanyInfo = async () => {
            try {
                const companyRef = ref(db, `users/${uid}/company`);
                const snapshot = await get(companyRef);
                if (snapshot.exists()) {
                    setCompanyForm(snapshot.val());
                } else {
                    console.log("No company info found at users/${uid}/company");
                }
            } catch (err) {
                console.error("Error fetching company info:", err);
            }
        };

        const fetchJobs = async () => {
            try {
                const jobsRef = ref(db, `users/${uid}/jobs`);
                const snapshot = await get(jobsRef);
                if (snapshot.exists()) {
                    setPostedJobs(Object.values(snapshot.val()));
                }
            } catch (error) {
                console.error('Error fetching jobs:', error);
            }
        };

        const fetchChallenges = async () => {
            try {
                const challengesRef = ref(db, `users/${uid}/challenges`);
                const snapshot = await get(challengesRef);
                if (snapshot.exists()) {
                    const challengeArray = Object.values(snapshot.val());
                    setChallenges(challengeArray);
                }
            } catch (error) {
                console.error('Error fetching challenges:', error);
            }
        };

        fetchProfile();
        fetchCompanyInfo();
        fetchJobs();
        fetchChallenges();
    }, [auth.currentUser]);

    const handleInputChange = (e) => {
        setCompanyForm({ ...companyForm, [e.target.name]: e.target.value });
    };

    const handleSaveCompanyInfo = async () => {
        const user = auth.currentUser;
        if (!user) return;

        const db = getDatabase();
        const companyRef = ref(db, `users/${user.uid}/company`);

        try {
            await set(companyRef, companyForm);
            console.log("Company info saved at users/${uid}/company");
            setShowUpdateForm(false);
        } catch (error) {
            console.error("Error saving company info:", error);
        }
    };
    const handlePostChallenge = async (newChallenge) => {
        const user = auth.currentUser;
        if (!user) return;

        const db = getDatabase();
        const challengeRef = ref(db, `users/${user.uid}/challenges`);
        const newRef = push(challengeRef);

        try {
            await set(newRef, newChallenge);
            setChallenges(prev => [...prev, newChallenge]);
        } catch (error) {
            console.error('Error posting challenge:', error);
        }
    };

    function sanitizeForFirebasePath(str) {
        return str
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-') // replace invalid chars with hyphens
            .replace(/^-+|-+$/g, '');    // remove leading/trailing hyphens
    }

    const handleViewSubmissions = async (challengeIdOrTitle) => {
        const rawPath = challenge.id || challenge.title;
        console.log("Challenge ID or Title passed in:", rawPath);

        const path = sanitizeForFirebasePath(rawPath);
        console.log("Sanitized path:", path);
        const submissionsRef = ref(db, `submissions/${path}`);

        try {
            const snapshot = await get(submissionsRef);

            if (snapshot.exists()) {
                const data = snapshot.val();
                const parsedSubmissions = Object.values(data);
                console.log("Submissions:", parsedSubmissions);
                setSelectedChallengeSubmissions(parsedSubmissions); // Or whatever state you're using
                setIsModalOpen(true);
            } else {
                console.log("No submissions found.");
                setSelectedChallengeSubmissions([]);
                setIsModalOpen(true);
            }
        } catch (error) {
            console.error("Error fetching submissions:", error);
        }
    };



    const handlePostJob = async () => {
        const user = auth.currentUser;
        if (!jobTitle || !jobDesc || !user) return;

        const newJob = { title: jobTitle, description: jobDesc, date: Date.now() };
        const db = getDatabase();
        const jobsRef = ref(db, `users/${user.uid}/jobs/${Date.now()}`);

        try {
            await set(jobsRef, newJob);
            setPostedJobs(prev => [...prev, newJob]);
            setJobTitle('');
            setJobDesc('');
        } catch (error) {
            console.error('Error posting job:', error);
        }
    };

    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                console.log('Logged out successfully');
                setProfile({ name: '', email: '', role: '', company: '', location: '', description: '' });
                window.location.href = '/';
            })
            .catch((error) => {
                console.error('Logout error:', error);
            });
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            {/* Header */}
            <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Recruiter Dashboard</h1>
                    <p className="text-sm text-gray-600">
                        Welcome, <span className="font-medium text-blue-600">{profile.name}</span> ({profile.role})
                    </p>
                    <p className="text-sm text-gray-500">{profile.email}</p>
                </div>
                <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg">
                    Logout
                </button>
            </header>

            {/* Company Info Display */}
            <div className="bg-white rounded-lg shadow-md p-4 mb-6">
                <h2 className="text-2xl font-semibold mb-2">Company Information</h2>
                {showUpdateForm ? (
                    <div className="space-y-3">
                        <input
                            type="text"
                            name="company"
                            placeholder="Company Name"
                            value={companyForm.company}
                            onChange={handleInputChange}
                            className="w-full border rounded p-2"
                        />
                        <input
                            type="text"
                            name="location"
                            placeholder="Location"
                            value={companyForm.location}
                            onChange={handleInputChange}
                            className="w-full border rounded p-2"
                        />
                        <textarea
                            name="description"
                            placeholder="Description"
                            value={companyForm.description}
                            onChange={handleInputChange}
                            className="w-full border rounded p-2"
                        />
                        <button
                            onClick={handleSaveCompanyInfo}
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                            Save Info
                        </button>
                    </div>
                ) : (
                    <div className="space-y-1">
                        <p>
                            <strong>Name:</strong> {companyForm.company}
                        </p>
                        <p>
                            <strong>Location:</strong> {companyForm.location}
                        </p>
                        <p>
                            <strong>Description:</strong> {companyForm.description}
                        </p>
                        <button
                            onClick={() => setShowUpdateForm(true)}
                            className="mt-2 text-blue-600 hover:underline"
                        >
                            Edit Info
                        </button>
                    </div>
                )}
            </div>

            {/* Post Job Section */}
            <section className="bg-white p-6 rounded-2xl shadow-lg mb-6">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Post a Job Role</h2>
                <input
                    type="text"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    placeholder="Job Title"
                    className="w-full mb-2 p-2 border border-gray-300 rounded-lg"
                />
                <textarea
                    value={jobDesc}
                    onChange={(e) => setJobDesc(e.target.value)}
                    placeholder="Job Description"
                    className="w-full mb-4 p-2 border border-gray-300 rounded-lg"
                />
                <button
                    onClick={handlePostJob}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                    Post Job
                </button>
            </section>

            {/* Posted Jobs */}
            {postedJobs.length > 0 && (
                <section className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-3xl shadow-xl mb-10 border border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 tracking-tight">
                        🚀 Posted Job Roles
                    </h2>

                    <div className="grid md:grid-cols-2 gap-6">
                        {postedJobs.map((job, index) => (
                            <div
                                key={index}
                                className="transform transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl bg-white rounded-xl p-5 border border-gray-100 shadow-sm"
                            >
                                <h3 className="text-xl font-semibold text-indigo-600 mb-2">
                                    {job.title}
                                </h3>
                                <p className="text-sm text-gray-700 leading-relaxed">{job.description}</p>

                                <div className="mt-4 text-xs text-gray-500">
                                    Posted on: {new Date(job.postedAt || Date.now()).toLocaleDateString()}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}


            {/* Post Challenge Form */}
            <div className="bg-white p-6 rounded-2xl shadow-lg mb-8">
                <PostChallengeForm onPost={handlePostChallenge} />
            </div>

            {/* Posted Challenges */}
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Your Posted Challenges</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {challenges.length === 0 ? (
                    <p className="text-gray-500">No challenges posted yet.</p>
                ) : (
                    challenges.map((challenge, index) => (
                        <ChallengeCard
                            key={index}
                            challenge={challenge}
                            onViewSubmissions={handleViewSubmissions}
                        />
                    ))
                )}
            </div>

            {/* Submissions Modal */}
            <SubmissionModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                submissions={submissions}
            />
        </div>
    );
};

export default RecruiterDashboard;
