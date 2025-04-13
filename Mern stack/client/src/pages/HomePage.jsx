import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Github, Linkedin, Twitter, Brain, Code, Target } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import {
  ChartBarIcon,
  ShieldCheckIcon,
  PuzzlePieceIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import SplashCursor from '../components/cursor';

function App() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const challenges = [
    {
      title: "Algorithm Challenge",
      description: "Solve real-world algorithmic problems",
      icon: <Code className="w-6 h-6 text-indigo-400" />,
      difficulty: "Intermediate"
    },
    {
      title: "System Design",
      description: "Design scalable architecture solutions",
      icon: <Brain className="w-6 h-6 text-purple-400" />,
      difficulty: "Advanced"
    },
    {
      title: "Code Review",
      description: "Review and improve existing codebases",
      icon: <Target className="w-6 h-6 text-indigo-400" />,
      difficulty: "Intermediate"
    }
  ];

  const companies = [
    {
      name: "TechCorp",
      logo: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=128&h=128&fit=crop",
      positions: 5,
      rating: 4.8
    },
    {
      name: "InnovateLabs",
      logo: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=128&h=128&fit=crop",
      positions: 3,
      rating: 4.9
    },
    {
      name: "FutureTech",
      logo: "https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?w=128&h=128&fit=crop",
      positions: 7,
      rating: 4.7
    }
  ];

  return (
    // <Router>
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navbar */}
      <div className='-z-20'>
      <SplashCursor/>
      </div>
     
      <nav className="bg-gray-800/50 backdrop-blur-lg fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex-shrink-0"
            >
              <Link to="/" className="text-2xl font-bold text-indigo-500">AntiResume</Link>
            </motion.div>

            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link to="/" className="hover:text-gray-300 transition duration-300">Home</Link>
                <Link to="/interviewee/login" className="hover:text-gray-300 transition duration-300">Interviewee Login</Link>
                <Link to="/interviewee" className="hover:text-gray-300 transition duration-300">Interviewee Dashboard</Link>
                <Link to="/interviewee/results" className="hover:text-gray-300 transition duration-300">Results</Link>
              </div>
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-300 hover:text-white"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-gray-800"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link to="/about" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">About</Link>
              <Link to="/features" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Features</Link>
              <Link to="/pricing" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Pricing</Link>
              <Link to="/contact" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Contact</Link>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Main Content */}
      <div className="pt-16">
        {/* Hero Section */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={fadeIn}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
        >
          <div className="text-center mb-16">
            <motion.h1
              className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Revolutionizing Hiring
            </motion.h1>
            <motion.p
              className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Where skills speak louder than resumes, and potential trumps pedigree.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row justify-center gap-4 mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
             <Link
              to="/interviewee/login"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg"
            >
              Showcase Your Skills
            </Link>
            <Link
              to="/recruiter/login"
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg"
            >
              Find Real Talent
            </Link>
            </motion.div>
          </div>

          {/* Value Proposition Grid */}
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <PuzzlePieceIcon className="h-12 w-12 text-indigo-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-white">Skill-Based Challenges</h3>
              <p className="text-gray-400">Demonstrate abilities through real-world tasks</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <ShieldCheckIcon className="h-12 w-12 text-purple-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-white">Bias-Free Matching</h3>
              <p className="text-gray-400">AI-powered anonymous evaluations</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <ChartBarIcon className="h-12 w-12 text-indigo-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-white">Transparent Metrics</h3>
              <p className="text-gray-400">Real salary data and culture insights</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <UserGroupIcon className="h-12 w-12 text-purple-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-white">Smart Feedback Loop</h3>
              <p className="text-gray-400">Continuous improvement through outcomes</p>
            </motion.div>
          </motion.div>

          {/* Statistics Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="bg-gray-800 rounded-2xl p-12 mb-20"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.2 }}
                  className="text-4xl font-bold text-indigo-400 mb-2"
                >
                  500+
                </motion.div>
                <p className="text-gray-300">Companies Hiring</p>
              </div>
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.4 }}
                  className="text-4xl font-bold text-purple-400 mb-2"
                >
                  10,000+
                </motion.div>
                <p className="text-gray-300">Successful Matches</p>
              </div>
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.6 }}
                  className="text-4xl font-bold text-indigo-400 mb-2"
                >
                  95%
                </motion.div>
                <p className="text-gray-300">Satisfaction Rate</p>
              </div>
            </div>
          </motion.div>

          {/* Skills Challenge Section */}
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="py-20 bg-gray-900"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-center text-white mb-12">
                Prove Your Skills Through Challenges
              </h2>
              <Swiper
                modules={[Autoplay, Pagination]}
                spaceBetween={30}
                slidesPerView={1}
                pagination={{ clickable: true }}
                autoplay={{ delay: 3000 }}
                breakpoints={{
                  640: { slidesPerView: 2 },
                  768: { slidesPerView: 3 }
                }}
                className="pb-12"
              >
                {challenges.map((challenge, index) => (
                  <SwiperSlide key={index}>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="bg-gray-800 p-6 rounded-xl shadow-lg"
                    >
                      <div className="flex items-center justify-between mb-4">
                        {challenge.icon}
                        <span className="text-sm font-medium text-indigo-400">
                          {challenge.difficulty}
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-2">
                        {challenge.title}
                      </h3>
                      <p className="text-gray-400">{challenge.description}</p>
                    </motion.div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </motion.section>

          {/* How It Works Section */}
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="py-20 bg-gray-800"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-center text-white mb-16">
                How Our Platform Works
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative"
                >
                  <div className="absolute -top-4 -left-4 w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold">
                    1
                  </div>
                  <div className="bg-gray-700 p-6 rounded-xl">
                    <h3 className="text-xl font-semibold text-white mb-4">Complete Challenges</h3>
                    <p className="text-gray-300">
                      Showcase your abilities through real-world coding challenges and projects
                    </p>
                  </div>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative"
                >
                  <div className="absolute -top-4 -left-4 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                    2
                  </div>
                  <div className="bg-gray-700 p-6 rounded-xl">
                    <h3 className="text-xl font-semibold text-white mb-4">AI Matching</h3>
                    <p className="text-gray-300">
                      Our AI analyzes your skills and matches you with relevant positions
                    </p>
                  </div>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative"
                >
                  <div className="absolute -top-4 -left-4 w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold">
                    3
                  </div>
                  <div className="bg-gray-700 p-6 rounded-xl">
                    <h3 className="text-xl font-semibold text-white mb-4">Get Hired</h3>
                    <p className="text-gray-300">
                      Connect with companies that value your proven abilities
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.section>

          {/* Featured Companies Section */}
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="py-20 bg-gray-900"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-center text-white mb-12">
                Companies Hiring Now
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                {companies.map((company, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className="bg-gray-800 rounded-xl p-6 shadow-lg"
                  >
                    <div className="flex items-center mb-4">
                      <img
                        src={company.logo}
                        alt={company.name}
                        className="w-12 h-12 rounded-full mr-4"
                      />
                      <div>
                        <h3 className="text-xl font-semibold text-white">
                          {company.name}
                        </h3>
                        <div className="flex items-center mt-1">
                          <span className="text-yellow-400">★</span>
                          <span className="text-gray-400 ml-1">{company.rating}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-indigo-400">
                        {company.positions} open positions
                      </span>
                      <Link
                        to={`/companies/${company.name.toLowerCase()}`}
                        className="text-white bg-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                      >
                        View Jobs
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

         
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8 }}
            className="mb-20"
          >
            <h2 className="text-3xl font-bold text-center mb-12 text-white">What People Say</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-gray-800 p-6 rounded-xl shadow-lg"
              >
                <p className="text-gray-300 mb-4">"This platform completely transformed our hiring process. We found amazing talent that we might have missed through traditional recruiting."</p>
                <div className="flex items-center">
                  <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=60&h=60&q=80" alt="Sarah Chen" className="rounded-full w-12 h-12 mr-4" />
                  <div>
                    <p className="font-semibold text-white">Sarah Chen</p>
                    <p className="text-gray-400 text-sm">CTO, TechFlow</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-gray-800 p-6 rounded-xl shadow-lg"
              >
                <p className="text-gray-300 mb-4">"As a self-taught developer, this platform gave me the opportunity to prove my skills. Now I'm working at my dream company!"</p>
                <div className="flex items-center">
                  <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=60&h=60&q=80" alt="Alex Rivera" className="rounded-full w-12 h-12 mr-4" />
                  <div>
                    <p className="font-semibold text-white">Alex Rivera</p>
                    <p className="text-gray-400 text-sm">Software Engineer</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-gray-800 p-6 rounded-xl shadow-lg"
              >
                <p className="text-gray-300 mb-4">"The skill-based challenges helped us identify candidates who could actually solve our problems, not just talk about them."</p>
                <div className="flex items-center">
                  <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=60&h=60&q=80" alt="Tom Wilson" className="rounded-full w-12 h-12 mr-4" />
                  <div>
                    <p className="font-semibold text-white">Tom Wilson</p>
                    <p className="text-gray-400 text-sm">HR Director, Innovate Inc</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2 }}
            className="text-center bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-12 shadow-xl"
          >
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Transform Hiring?</h2>
            <p className="text-indigo-100 mb-8">Join the movement against resume-based recruitment</p>
            <Link
              to="/signup"
              className="inline-block bg-white text-indigo-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors transform hover:scale-105"
            >
              Get Started Free
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">AntiResume</h3>
              <p className="text-sm">Revolutionizing the way companies hire and talents get discovered.</p>
            </div>
            <div>
              <h4 className="text-white text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link to="/features" className="hover:text-white transition-colors">Features</Link></li>
                <li><Link to="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white text-lg font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                <li><Link to="/docs" className="hover:text-white transition-colors">Documentation</Link></li>
                <li><Link to="/support" className="hover:text-white transition-colors">Support</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white text-lg font-semibold mb-4">Connect</h4>
              <div className="flex space-x-4">
                <a href="https://twitter.com" className="hover:text-white transition-colors">
                  <Twitter size={24} />
                </a>
                <a href="https://linkedin.com" className="hover:text-white transition-colors">
                  <Linkedin size={24} />
                </a>
                <a href="https://github.com" className="hover:text-white transition-colors">
                  <Github size={24} />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-sm">© 2024 AntiResume. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
    // </Router>
  );
}

export default App;