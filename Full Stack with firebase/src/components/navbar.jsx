import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useAuth } from '../contexts/authContext';
import { useNavigate } from 'react-router-dom';
import { ref, set, get } from 'firebase/database';
import { db } from '../firebaseConfig/firebase';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [loading, setLoading] = useState(false);

    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Dashboard', path: '/dashboard' },
        { name: 'Challenges', path: '/challenges' },
        { name: 'Company', path: '/company' },
        { name: 'FAQ', path: '/faq' },
        { name: 'Contact', path: '/contact' }
    ];

    useEffect(() => {
        const fetchProfile = async () => {
            if (!currentUser) return;
            const profileRef = ref(db, `users/${currentUser.uid}/profile`);
            const snapshot = await get(profileRef);
            if (snapshot.exists()) {
                const data = snapshot.val();
                setPhone(data.phone || '');
                setAddress(data.address || '');
            }
        };
        fetchProfile();
    }, [currentUser]);

    // for loading
    const handleNavigate = (path) => {
        setLoading(true); 
        navigate(path);
        setTimeout(() => setLoading(false), 500); 
    };
    const handleLogout = async () => {
        try {
            await logout();
            navigate('/');
        } catch (err) {
            console.error('Logout error:', err.message);
        }
    };

    const saveProfile = async () => {
        if (!currentUser) return;
        try {
            const userRef = ref(db, `users/${currentUser.uid}/profile`);
            await set(userRef, {
                email: currentUser.email,
                displayName: currentUser.displayName || '',
                phone,
                address
            });
            alert('Profile updated!');
            setShowProfile(false);
        } catch (err) {
            console.error('Error saving profile:', err.message);
            alert('Failed to update profile.');
        }
    };

    return (
        <nav className="w-full px-6 py-4 bg-transparent text-white flex items-center justify-between relative z-50">
            {/* Logo */}
            <div className="flex items-center">
                <img src="/logo.svg" alt="Cilio" className="h-8" />
                <span className="ml-2 text-2xl font-semibold">Cilio</span>
            </div>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center space-x-2">
                {navLinks.map(({ name, path }) => (
                    <button
                        key={name}
                        onClick={() => handleNavigate(path)}
                        className={`px-4 py-2 rounded-full transition-all duration-300 cursor-pointer text-sm font-medium
                            ${name === 'Home'
                                ? 'bg-gray-300 text-black'
                                : 'bg-white/10 text-white hover:bg-gray-300 hover:text-black'}`}
                    >
                        {name}
                    </button>
                ))}
            </div>

            {/* Auth/Profile (Desktop) */}
            <div className="hidden md:flex items-center space-x-4">
                {currentUser ? (
                    <>
                        {/* Profile Icon */}
                        <div className="relative">
                            <button
                                onClick={() => setShowProfile(!showProfile)}
                                className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center font-bold"
                            >
                                {currentUser.email?.[0]?.toUpperCase() || 'A'}
                            </button>

                            {showProfile && (
                                <div className="absolute right-0 mt-2 w-72 bg-[#1c1c1c] text-white rounded-xl p-5 shadow-xl z-50 border border-gray-700 
                                backdrop-blur-sm transition-all duration-300 
                                ring-1 ring-white/10 hover:ring-white/20 
                                hover:shadow-[0_0_15px_rgba(0,255,255,0.3)]">
                                    <h3 className="text-lg font-semibold mb-2 text-cyan-400">Profile</h3>

                                    <p className="text-sm mb-1"><span className="font-medium text-gray-300">Email:</span> {currentUser.email}</p>

                                    <div className="mt-3">
                                        <label className="block text-sm text-gray-400">Phone:</label>
                                        <input
                                            type="text"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            className="w-full mt-1 px-3 py-2 bg-[#2b2b2b] text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                            placeholder="Optional"
                                        />
                                    </div>

                                    <div className="mt-3">
                                        <label className="block text-sm text-gray-400">Address:</label>
                                        <textarea
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                            className="w-full mt-1 px-3 py-2 bg-[#2b2b2b] text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                            placeholder="Optional"
                                        />
                                    </div>

                                    <button
                                        onClick={saveProfile}
                                        className="mt-5 w-full bg-cyan-600 hover:bg-cyan-500 text-white font-medium py-2 rounded-md shadow-md hover:shadow-[0_0_12px_rgba(0,255,255,0.5)] transition duration-300"
                                    >
                                        Save
                                    </button>
                                </div>
                            )}
                        </div>

                        <button
                            onClick={handleLogout}
                            className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-full transition-colors"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <button
                            onClick={() => handleNavigate('/login')}
                            className="text-white/80 hover:text-white transition"
                        >
                            Login
                        </button>
                        <button
                            onClick={() => handleNavigate('/signup')}
                            className="px-4 py-2 bg-white text-gray-900 rounded-full hover:bg-opacity-90 transition-colors"
                        >
                            Sign Up
                        </button>
                    </>
                )}
            </div>

            {/* Mobile Icons */}
            <div className="md:hidden flex items-center space-x-3">
                {currentUser && (
                    <button
                        onClick={() => setShowProfile(!showProfile)}
                        className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center text-sm font-bold"
                    >
                        {currentUser.email?.[0]?.toUpperCase() || 'A'}
                    </button>
                )}
                <button onClick={() => setMenuOpen(!menuOpen)} className="text-white">
                    {menuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu Dropdown */}
            {menuOpen && (
                <div className="absolute top-16 left-0 w-full bg-[#1a1a1a] px-6 py-4 flex flex-col space-y-4 md:hidden shadow-xl z-40">
                    {navLinks.map(({ name, path }) => (
                        <button
                            key={name}
                            onClick={() => {
                                handleNavigate(path);
                                setMenuOpen(false);
                            }}
                            className={`block px-4 py-2 rounded-full transition-all duration-300 text-sm font-medium
                                ${name === 'Home'
                                    ? 'bg-gray-300 text-black'
                                    : 'bg-white/10 text-white hover:bg-gray-300 hover:text-black'}`}
                        >
                            {name}
                        </button>
                    ))}
                    <hr className="border-white/20" />
                    <div className="flex flex-col space-y-2">
                        {currentUser ? (
                            <button
                                onClick={handleLogout}
                                className="px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors w-fit"
                            >
                                Logout
                            </button>
                        ) : (
                            <>
                                <button
                                    onClick={() => {
                                        handleNavigate('/login');
                                        setMenuOpen(false);
                                    }}
                                    className="text-white/80 hover:text-white transition text-left"
                                >
                                    Login
                                </button>
                                <button
                                    onClick={() => {
                                        handleNavigate('/signup');
                                        setMenuOpen(false);
                                    }}
                                    className="px-4 py-2 bg-white text-gray-900 rounded-full hover:bg-opacity-90 transition-colors w-fit"
                                >
                                    Sign Up
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}

            {/* Profile Modal for Mobile */}
            {showProfile && (
                <div className="absolute top-20 right-4 w-72 bg-[#1c1c1c] text-white rounded-xl p-5 shadow-xl z-50 border border-gray-700 
    backdrop-blur-sm transition-all duration-300 
    ring-1 ring-white/10 hover:ring-white/20 
    hover:shadow-[0_0_15px_rgba(0,255,255,0.3)] md:hidden">
                    <h3 className="text-lg font-semibold mb-2 text-cyan-400">Profile</h3>
                    <p className="text-sm mb-1"><span className="font-medium text-gray-300">Email:</span> {currentUser.email}</p>

                    <div className="mt-3">
                        <label className="block text-sm text-gray-400">Phone:</label>
                        <input
                            type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full mt-1 px-3 py-2 bg-[#2b2b2b] text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                            placeholder="Optional"
                        />
                    </div>

                    <div className="mt-3">
                        <label className="block text-sm text-gray-400">Address:</label>
                        <textarea
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="w-full mt-1 px-3 py-2 bg-[#2b2b2b] text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                            placeholder="Optional"
                        />
                    </div>

                    <button
                        onClick={saveProfile}
                        className="mt-5 w-full bg-cyan-600 hover:bg-cyan-500 text-white font-medium py-2 rounded-md shadow-md hover:shadow-[0_0_12px_rgba(0,255,255,0.5)] transition duration-300"
                    >
                        Save
                    </button>
                </div>
            )}

            {loading && (
                <div className="fixed inset-0 bg-[#1a1a2e] bg-opacity-10 flex items-center justify-center z-50">
                    <div className="w-16 h-16 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;