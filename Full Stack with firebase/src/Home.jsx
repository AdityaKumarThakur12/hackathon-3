import Navbar from './components/navbar';
import Carousel from './components/carousel';
import { useState, useEffect } from 'react';
import { LampDemo } from './components/lampEffect';
import { CardDemo } from './components/cards';
import { BackgroundBoxesDemo } from './components/boxEffect';
import Footer from './components/footer';
import ChatBotToggle from './components/ChatBot/chatBot';
import { useNavigate } from 'react-router-dom';
import './App.css'

const images = [
  { url: 'https://www.transparentpng.com/download/man/M8cqJS-handsome-man-png-transparent-handsome-man-png-images.png' },
  { url: 'https://www.transparentpng.com/thumb/groom/model-suit-groom-png-transparent-images--24.png' },
  { url: 'https://www.transparentpng.com/thumb/groom/groom-suit-png-transparent-9.png' },
  { url: 'https://www.transparentpng.com/thumb/groom/groom-png-transparent-image--3.png' },
  { url: 'https://www.transparentpng.com/thumb/groom/model-suit-groom-png-transparent-images--24.png' },
  { url: 'https://www.transparentpng.com/thumb/groom/groom-suit-png-transparent-9.png' },
  { url: 'https://www.transparentpng.com/thumb/groom/groom-png-transparent-image--3.png' },
  { url: 'https://www.transparentpng.com/thumb/groom/groom-suit-png-transparent-9.png' },
];

const colorMap = {
  'bg-gradient-to-br from-[#2b2d42] to-black': '#2b2d42',
  'bg-gradient-to-br from-[#4b3f72] to-black': '#4b3f72',
  'bg-gradient-to-br from-[#5e503f] to-black': '#5e503f',
  'bg-gradient-to-br from-[#4a5759] to-black': '#4a5759',
  'bg-gradient-to-br from-[#1a1a2e] to-black': '#1a1a2e',
  'bg-gradient-to-br from-[#1e3d59] to-black': '#1e3d59',
  'bg-gradient-to-br from-black via-[#1a1a2e] to-black': '#1a1a2e',
};

function Home() {
  const [bgColorClass, setBgColorClass] = useState('bg-[#2b2d42]');
  const navigate = useNavigate();

  useEffect(() => {
    const hex = colorMap[bgColorClass] || '#000';
    document.body.style.transition = 'background-color 0.6s ease';
    document.body.style.backgroundColor = hex;
  }, [bgColorClass]);

  return (
    <>
      <Navbar />

      {/* 🎨 Cursive Line Pattern with Shadow + Moving Light */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <svg
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          viewBox="0 0 1440 320"
        >
          <defs>
            {/* Shadow filter */}
            <filter id="lineShadow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#000" floodOpacity="0.3" />
            </filter>

            {/* Gradient stroke with animation */}
            <linearGradient id="glowGradient">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
              <stop offset="50%" stopColor="#ffffff" stopOpacity="0.7">
                <animate attributeName="offset" values="0%;100%;0%" dur="4s" repeatCount="indefinite" />
              </stop>
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>
          </defs>

          <path
            fill="none"
            stroke="url(#glowGradient)"
            strokeWidth="2"
            d="M0,160 C360,0 1080,320 1440,160"
            filter="url(#lineShadow)"
          />
          <path
            fill="none"
            stroke="url(#glowGradient)"
            strokeWidth="2"
            d="M0,240 C360,80 1080,400 1440,240"
            filter="url(#lineShadow)"
          />
        </svg>
      </div>


      {/* main section */}
      <main className="flex-grow flex flex-col items-center justify-center px-2 pb-2 text-white relative">
        <div className="text-center">
          <p className="text-sm mb-2">The Future of Hiring · 2025</p>
          <h1 className="text-3xl sm:text-2xl md:text-5xl font-extrabold text-center leading-snug relative z-20 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-600 animate-gradient">
            Where <span className="text-white drop-shadow-md">Skills </span>
            Speak Louder Than <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-orange-500 to-rose-500 animate-gradient-fast">
              Resumes Ever Could
            </span>
          </h1>
          <p className="text-sm mb-3 text-white/80">
            A bold new platform where challenges replace CVs, and real work defines real talent.
          </p>

          {/* BUTTONS */}
          <div className="mt-3 flex flex-row sm:flex-row gap-3 justify-center items-center">
            <button
              onClick={() => navigate('/dashboard')}
              className="text-sm px-3 py-1.5 sm:text-base sm:px-5 sm:py-2 bg-white text-gray-900 cursor-pointer rounded-full font-medium hover:bg-opacity-90 transition-all duration-200 shadow-md"
            >
              Explore the Platform 🛫
            </button>

            <button
              onClick={() => navigate('/github-review')}
              className="text-sm px-3 py-1.5 sm:text-base sm:px-5 sm:py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white cursor-pointer rounded-full font-medium hover:brightness-110 transition-all duration-200 shadow-lg"
            >
              Review My GitHub 👨‍💻
            </button>
          </div>


          <p className="text-base font-medium text-white mt-4">
            Turning passion into <span className="text-yellow-400">proof</span> — one challenge at a time.
          </p>
        </div>
      </main>




      <Carousel
        images={images}
        onSlideChange={(bgColor) => setBgColorClass(bgColor)}
      />

      <LampDemo />

      <CardDemo />
      <BackgroundBoxesDemo />


      <Footer />
      <ChatBotToggle/>

    </>
  );
}

export default Home;
