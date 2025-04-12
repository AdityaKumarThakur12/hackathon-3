import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';
import { FcGoogle } from 'react-icons/fc';
import { motion } from 'framer-motion';
import { getDatabase, ref, set } from 'firebase/database';

const Login = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "candidate", // default role
    });

    const navigate = useNavigate();
    const { login, googleSignIn } = useAuth();
    const [loading, setLoading] = useState(false);

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if (!formData.name || !formData.email || !formData.password) {
            toast.error("Please fill in all the fields");
            return;
        }

        setLoading(true); // start loading

        try {
            const userCredential = await login(formData.email, formData.password);
            const user = userCredential.user;

            const db = getDatabase();
            const profileRef = ref(db, `users/${user.uid}/profile`);

            await set(profileRef, {
                name: formData.name,
                email: formData.email,
                role: formData.role
            });

            toast.success("Logged in successfully!");

            const roleSnapshot = await (await import('firebase/database')).get(profileRef);
            const role = roleSnapshot.val().role;

            if (role === "recruiter") {
                navigate("/recruiterDashboard");
            } else {
                navigate("/");
            }

        } catch (err) {
            toast.error(err.message);
        } finally {
            setLoading(false); // stop loading
        }
    }

    const handleGoogleSignIn = async () => {
        try {
            await googleSignIn();
            toast.success("Successfully logged in with Google!");
            navigate("/");
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className='w-full h-screen flex flex-col md:flex-row'>
            <Toaster />

            {/* Left Section (Video & Branding) */}
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


            {/* Right Section (Login Form) */}
            <div className='w-full md:w-1/2 h-screen flex items-center justify-center bg-gray-900 px-6'>
                <motion.form
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    onSubmit={handleSubmit}
                    className='w-full max-w-sm glass border border-gray-200 shadow-xl shadow-blue-500/30 p-8 rounded-2xl'
                >
                    <h1 className='text-3xl text-white font-medium mb-1 py-1 text-center'>
                        𝖂𝖊𝖑𝖈𝖔𝖒𝖊 𝖙𝖔 <span className="bg-gradient-to-r from-blue-400 to-sky-500 text-transparent bg-clip-text text-4xl">𝖑𝖔𝖌𝖎𝖓</span> ✍
                    </h1>

                    {/* Name Input */}
                    <label className='text-gray-300'>Name</label>
                    <input
                        className='border border-gray-300 px-2 text-black bg-gray-100 py-1.5 rounded my-2 mb-2 w-full'
                        type='text'
                        placeholder='Enter Your Name'
                        name='name'
                        value={formData.name}
                        onChange={handleChange}
                    />

                    {/* Email Input */}
                    <label className='text-gray-300'>Email</label>
                    <input
                        className='border border-gray-300 px-2 text-black bg-gray-100 py-1.5 rounded my-2 mb-2 w-full'
                        type='text'
                        placeholder='Enter Your Email'
                        name='email'
                        value={formData.email}
                        onChange={handleChange}
                    />

                    {/* Password Input */}
                    <label className='text-gray-300'>Password</label>
                    <input
                        className='border border-gray-300 text-black rounded my-2 bg-gray-100 px-2 py-1.5 w-full'
                        type='password'
                        placeholder='Enter Your password'
                        name='password'
                        value={formData.password}
                        onChange={handleChange}
                    />

                    {/* Role Selection */}
                    <label className='text-gray-300 tracking-wide uppercase text-sm font-semibold mb-2 block'>Role</label>
                    <div className='flex flex-row gap-2'>
                        <label className='flex items-center gap-2 text-white cursor-pointer'>
                            <input
                                type='radio'
                                name='role'
                                value='candidate'
                                checked={formData.role === 'candidate'}
                                onChange={handleChange}
                                className='accent-purple-600 w-4 h-4'
                            />
                            <span className='text-base'>Candidate</span>
                        </label>

                        <label className='flex items-center gap-2 text-white cursor-pointer'>
                            <input
                                type='radio'
                                name='role'
                                value='recruiter'
                                checked={formData.role === 'recruiter'}
                                onChange={handleChange}
                                className='accent-purple-600 w-4 h-4'
                            />
                            <span className='text-base'>Recruiter</span>
                        </label>
                    </div>


                    <p className='text-sm text-gray-300 mt-2 mb-2'>
                        Don't have an account?
                        <span
                            className='text-sky-400 ml-1 cursor-pointer font-medium hover:text-sky-800'
                            onClick={() => navigate("/signup")}
                        > Sign Up</span>
                    </p>

                    <motion.button
                        type='submit'
                        whileHover={{ scale: loading ? 1 : 1.05 }}
                        disabled={loading}
                        className={`px-4 py-2 w-full border rounded-xl mt-2 text-xl transition duration-300 
                    ${loading ? "bg-sky-300 cursor-not-allowed" : "bg-sky-500 hover:bg-blue-600"} text-white flex justify-center items-center gap-2`}>

                        {loading ? (
                            <>
                                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                                </svg>
                                Loading...
                            </>
                        ) : (
                            <>Login 🛡️</>
                        )}
                    </motion.button>

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-gray-900 rounded-lg text-gray-200">Or continue with</span>
                            </div>
                        </div>
                        <button
                            onClick={handleGoogleSignIn}
                            className="w-full mt-4 py-2 px-4 bg-white text-gray-700 border border-gray-300 rounded-md shadow-md flex items-center justify-center gap-2 hover:bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        >
                            <FcGoogle className="text-xl" />
                            <span>Sign in with Google</span>
                        </button>
                    </div>
                </motion.form>
            </div>
        </div>
    );
};

export default Login;
