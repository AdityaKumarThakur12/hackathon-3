import React, { useState } from 'react';
import Navbar from '../components/navbar';
import InputForm from '../components/githubAI/inputForm';
import UserStats from '../components/githubAI/userStat';
import AiFeedback from '../components/githubAI/aifeedback';
import Footer from '../components/footer';
import ChatBotToggle from '../components/ChatBot/chatBot';

export default function GithubReview() {
    const [userData, setUserData] = useState(null);
    const [aiFeedback, setAiFeedback] = useState('');

    return (
        <>
            <div className='bg-black'>
                <Navbar />
            </div>

            <div className="flex flex-row justify-between items-start gap-10 flex-wrap md:flex-nowrap px-4 md:px-12 py-8 bg-gradient-to-br from-[#0f0f0f] via-[#111827] to-[#1f2937] text-white min-h-screen">

                {/* Left Column */}
                <div className="flex flex-col gap-6 w-full md:w-1/2">
                    <h2 className="text-3xl md:text-5xl font-extrabold text-center leading-snug bg-clip-text text-transparent bg-gradient-to-r from-sky-400 via-indigo-400 to-purple-500 animate-gradient mb-10">
                        GitHub <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 animate-gradient-fast">
                            AI Review
                        </span>
                    </h2>
                    <InputForm setUserData={setUserData} setAiFeedback={setAiFeedback} />

                    {aiFeedback?.trim() ? (
                        <div className="mt-6">
                            <h2 className="text-2xl font-bold mb-2 border-b pb-2 border-gray-700">
                                🤖 AI Feedback
                            </h2>
                            <AiFeedback feedback={aiFeedback} />
                        </div>
                    ) : (
                        <div className="mt-6 p-6 bg-gradient-to-r from-purple-100 via-blue-100 to-cyan-100 rounded-xl border border-dashed border-blue-300 text-center shadow-inner animate-pulse">
                            <p className="text-lg text-gray-700 font-medium italic">
                                🔮 AI is conjuring insights from the GitHub galaxy...<br />
                                Hang tight, magic's in the making.
                            </p>
                        </div>
                    )}
                </div>


                {/* Right Column */}
                <div className="w-full md:w-1/2">
                    <h2 className="text-3xl md:text-5xl font-extrabold text-center leading-snug bg-clip-text text-transparent bg-gradient-to-r from-sky-400 via-indigo-400 to-purple-500 animate-gradient mb-10">
                        Github <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 animate-gradient-fast">
                            User Stats
                        </span>
                    </h2>
                    <UserStats userData={userData} />
                </div>
            </div>

            <Footer />
            <ChatBotToggle/>
        </>
    );
}
