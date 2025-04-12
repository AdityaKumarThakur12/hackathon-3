"use client";
import { cn } from "../lib/utils";

export function CardDemo() {
    return (
        <div className="w-full px-4 py-10 bg-gradient-to-br from-[#1a1a2e] to-black">
            <h2 className="text-3xl md:text-5xl font-extrabold text-center leading-snug bg-clip-text text-transparent bg-gradient-to-r from-sky-400 via-indigo-400 to-purple-500 animate-gradient mb-10">
                Explore Our <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 animate-gradient-fast">
                    Features 
                </span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* CARD 1 */}
                <div className="w-full border border-gray-500 rounded-2xl">
                    <div
                        className={cn(
                            "group cursor-pointer overflow-hidden relative card h-96 rounded-md shadow-xl flex flex-col justify-end p-4 border border-neutral-800",
                            "bg-[url(https://bsmedia.business-standard.com/_media/bs/img/article/2024-09/29/full/1727598515-5448.jpg)] bg-cover bg-center",
                            "before:bg-[url(https://media.giphy.com/media/qgQUggAC3Pfv687qPC/giphy.gif)] before:fixed before:inset-0 before:opacity-0 before:z-[-1]",
                            "hover:bg-[url(https://media.giphy.com/media/qgQUggAC3Pfv687qPC/giphy.gif)]",
                            "hover:after:content-[''] hover:after:absolute hover:after:inset-0 hover:after:bg-black hover:after:opacity-50",
                            "transition-all duration-500 rounded-2xl"
                        )}
                    >
                        <div className="text relative z-50">
                            <h1 className="font-bold text-xl md:text-2xl text-white">
                                Skill Challenges
                            </h1>
                            <p className="text-white text-sm mt-3">
                                No more resumes. Solve real-world tasks to prove your skills in development, design, and beyond.
                            </p>
                        </div>
                    </div>
                </div>

                {/* CARD 2 */}
                <div className="w-full border border-gray-500 rounded-2xl">
                    <div
                        className={cn(
                            "group cursor-pointer overflow-hidden relative card h-96 rounded-md shadow-xl flex flex-col justify-end p-4 border border-neutral-800",
                            "bg-[url(https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80)] bg-cover",
                            "before:bg-[url(https://media.giphy.com/media/qgQUggAC3Pfv687qPC/giphy.gif)] before:fixed before:inset-0 before:opacity-0 before:z-[-1]",
                            "hover:bg-[url(https://media.giphy.com/media/qgQUggAC3Pfv687qPC/giphy.gif)]",
                            "hover:after:content-[''] hover:after:absolute hover:after:inset-0 hover:after:bg-black hover:after:opacity-50",
                            "transition-all duration-500 rounded-2xl"
                        )}
                    >
                        <div className="text relative z-50">
                            <h1 className="font-bold text-xl md:text-2xl text-white">
                                AI-Powered Feedback
                            </h1>
                            <p className="text-white text-sm mt-3">
                                Our Gemini AI gives instant, personalized feedback to help you level up — fast.
                            </p>
                        </div>
                    </div>
                </div>

                {/* CARD 3 */}
                <div className="w-full border border-gray-500 rounded-2xl">
                    <div
                        className={cn(
                            "group cursor-pointer overflow-hidden relative card h-96 rounded-md shadow-xl flex flex-col justify-end p-4 border border-neutral-800",
                            "bg-[url(https://www.theforage.com/blog/wp-content/uploads/2022/09/tech-companies.jpg)] bg-cover bg-center",
                            "before:bg-[url(https://media.giphy.com/media/qgQUggAC3Pfv687qPC/giphy.gif)] before:fixed before:inset-0 before:opacity-0 before:z-[-1]",
                            "hover:bg-[url(https://media.giphy.com/media/qgQUggAC3Pfv687qPC/giphy.gif)]",
                            "hover:after:content-[''] hover:after:absolute hover:after:inset-0 hover:after:bg-black hover:after:opacity-50",
                            "transition-all duration-500 rounded-2xl"
                        )}
                    >
                        <div className="text relative z-50">
                            <h1 className="font-bold text-xl md:text-2xl text-white">
                                Personalized Roadmaps
                            </h1>
                            <p className="text-white text-sm mt-3">
                                Based on your challenge performance, we build custom learning paths that adapt to *you*.
                            </p>
                        </div>
                    </div>
                </div>

                {/* CARD 4 */}
                <div className="w-full border border-gray-500 rounded-2xl">
                    <div
                        className={cn(
                            "group cursor-pointer overflow-hidden relative card h-96 rounded-md shadow-xl flex flex-col justify-end p-4 border border-neutral-800",
                            "bg-[url(https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80)] bg-cover",
                            "before:bg-[url(https://media.giphy.com/media/qgQUggAC3Pfv687qPC/giphy.gif)] before:fixed before:inset-0 before:opacity-0 before:z-[-1]",
                            "hover:bg-[url(https://media.giphy.com/media/qgQUggAC3Pfv687qPC/giphy.gif)]",
                            "hover:after:content-[''] hover:after:absolute hover:after:inset-0 hover:after:bg-black hover:after:opacity-50",
                            "transition-all duration-500 rounded-2xl"
                        )}
                    >
                        <div className="text relative z-50">
                            <h1 className="font-bold text-xl md:text-2xl text-white">
                                Challenge Leaderboard
                            </h1>
                            <p className="text-white text-sm mt-3">
                                See where you stand. Compete with the best. Climb the leaderboard by solving harder tasks.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
