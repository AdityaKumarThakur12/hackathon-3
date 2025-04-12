import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';
import { motion } from 'framer-motion';
import { ref, set } from 'firebase/database';
import { db } from '../firebaseConfig/firebase';

const Signup = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        role: "candidate", // default role
    });
    const [loading, setLoading] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();
    const { signup } = useAuth();

    function handleChange(e) {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if (formData.password !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        if (!formData.email || !formData.password) {
            toast.error("Please enter your email and password to sign up");
            return;
        }

        setLoading(true); // start loading

        try {
            const userCredential = await signup(formData.email, formData.password);
            const user = userCredential.user;

            await set(ref(db, 'users/' + user.uid), {
                email: formData.email,
                role: formData.role
            });

            toast.success('Sign up Successfully!');
            setFormData({ email: "", password: "", role: "candidate" });
            setConfirmPassword('');
            navigate("/login");
        } catch (err) {
            toast.error(err.message);
        } finally {
            setLoading(false); // end loading
        }
    }


    return (
        <div className='w-full h-screen flex flex-col md:flex-row'>
            <Toaster />

            {/* Left: Video Panel */}
            <div className='w-full sm:w-1/4 md:w-1/2 h-screen relative flex items-center justify-center bg-black'>
                <video autoPlay loop muted playsInline className='w-full h-full object-cover'>
                    <source src='https://videos.pexels.com/video-files/3129957/3129957-uhd_2560_1440_25fps.mp4' type='video/mp4' />
                    Your browser does not support the video tag.
                </video>

                <div className="absolute inset-0 bg-black/60"></div>

                <div className="absolute top-5 left-5 flex items-center cursor-pointer" onClick={() => navigate('/')}>
                    <img src='/logo.svg' alt='Logo' className='w-10 h-10 object-contain' />
                    <span className='text-white text-2xl font-bold ml-3 tracking-wide'>Cilio</span>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="absolute text-center text-white px-8 hidden sm:block"
                >
                    <h2 className="text-4xl font-extrabold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text">
                        🚫 Kill The Resume. Hire With Proof.
                    </h2>
                    <p className="text-lg mt-4 text-gray-200">
                        Show your skills. Skip the fluff. This is hiring for the real ones.
                    </p>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="text-md mt-2 font-medium text-gray-300"
                    >
                        ✍️ Candidates submit challenges, not paper. <br />
                        🤖 AI makes matches based on what you can *do*, not what you *say*.
                    </motion.p>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1, duration: 1 }}
                        className="text-md mt-2 text-gray-400 italic"
                    >
                        “This isn't a job board. It's a battleground for real talent.” ⚔️
                    </motion.p>
                </motion.div>
            </div>

            {/* Right: Signup Form */}
            <div className='w-full md:w-1/2 h-screen flex items-center justify-center bg-gray-900 px-6'>
                <motion.form
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    onSubmit={handleSubmit}
                    className='w-full max-w-sm glass border border-gray-200 shadow-xl shadow-purple-500/30 p-8 rounded-2xl'>

                    <h1 className='text-3xl text-white font-medium mb-8 py-4 text-center'>
                        𝖂𝖊𝖑𝖈𝖔𝖒𝖊 𝖙𝖔 <span className="bg-gradient-to-r from-pink-400 to-purple-500 text-transparent bg-clip-text text-4xl">𝕾𝖎𝖌𝖓𝖚𝖕</span> ✍
                    </h1>

                    <label className='text-gray-300'>Email</label>
                    <input
                        className='border border-gray-300 px-2 text-black bg-gray-100 py-1.5 rounded my-2 mb-4 w-full'
                        type='email'
                        placeholder='Enter Your Email'
                        name='email'
                        value={formData.email}
                        onChange={handleChange}
                    />

                    <label className='text-gray-300'>Password</label>
                    <input
                        className='border border-gray-300 text-black rounded my-2 bg-gray-100 px-2 py-1.5 w-full'
                        type='password'
                        placeholder='Enter Your password'
                        name='password'
                        value={formData.password}
                        onChange={handleChange}
                    />

                    <label className='text-gray-300'>Confirm Password</label>
                    <input
                        className='border border-gray-300 text-black rounded my-2 bg-gray-100 px-2 py-1.5 w-full'
                        type='password'
                        placeholder='Confirm Your password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />

                    <label className='text-gray-300 mt-2'>Select Role</label>
                    <div className="flex gap-4 text-white mt-2 mb-4">
                        <label className="flex items-center gap-2">
                            <input
                                type="radio"
                                name="role"
                                value="recruiter"
                                checked={formData.role === "recruiter"}
                                onChange={handleChange}
                                className="accent-purple-500"
                            />
                            Recruiter
                        </label>
                        <label className="flex items-center gap-2">
                            <input
                                type="radio"
                                name="role"
                                value="candidate"
                                checked={formData.role === "candidate"}
                                onChange={handleChange}
                                className="accent-purple-500"
                            />
                            Candidate
                        </label>
                    </div>

                    <p className='text-sm text-gray-300 mt-2 mb-2'>
                        Already have an account?
                        <span
                            className='text-purple-400 ml-1 cursor-pointer font-medium hover:text-purple-800'
                            onClick={() => navigate("/login")}
                        > Login</span>
                    </p>

                    <motion.button
                        type='submit'
                        whileHover={{ scale: loading ? 1 : 1.05 }}
                        disabled={loading}
                        className={`px-4 py-2 w-full border text-white rounded-xl mt-4 text-xl cursor-pointer transition duration-300 
        ${loading ? 'bg-purple-300 cursor-not-allowed' : 'bg-purple-500 hover:bg-purple-600'}`}
                    >
                        {loading ? (
                            <div className="flex items-center justify-center gap-2">
                                <svg className="w-5 h-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                                </svg>
                                Signing up...
                            </div>
                        ) : (
                            'Sign up 🔐'
                        )}
                    </motion.button>
                </motion.form>
            </div>
        </div>
    );
};

export default Signup;
