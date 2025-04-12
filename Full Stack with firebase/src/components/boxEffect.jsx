"use client";
import React from "react";
import { Boxes } from "./ui/bg-box";
import { cn } from "../lib/utils";
import { useNavigate } from "react-router-dom";

export function BackgroundBoxesDemo() {
    const navigate = useNavigate();
    return (
        <div className="h-[32rem] relative w-full overflow-hidden bg-slate-900 flex flex-col items-center justify-center rounded-lg px-6">
            {/* Animated overlay */}
            <div className="absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
            <Boxes />

            {/* Main content */}
            <h1 className={cn("md:text-5xl text-3xl font-extrabold text-center leading-snug relative z-20 bg-clip-text text-transparent bg-gradient-to-r from-sky-400 via-indigo-400 to-purple-500 animate-gradient")}>
                We Dont't hire <span className="text-white drop-shadow-md">Titles</span> <br className="hidden md:block" />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 animate-gradient-fast">
                    We hire <span className="underline decoration-wavy decoration-2 underline-offset-4">Proof</span>.
                </span>
            </h1>
            <p className="text-center mt-4 text-neutral-300 relative z-20 max-w-2xl text-base md:text-lg">
                Tired of empty titles and outdated job portals? Let your skills do the talking. Real tasks, real proof, real you.
            </p>

            {/* CTA */}
            <button onClick={()=> navigate('/challenges')} className="mt-6 px-6 py-3 cursor-pointer text-white font-semibold text-sm md:text-base rounded-full bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-500 shadow-md hover:shadow-xl transition-all duration-300 z-20">
                Take Your First Challenge
            </button>
        </div>
    );
}
