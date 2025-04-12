"use client";
import React from "react";
import { motion } from "framer-motion";
import { LampContainer } from "./ui/lamp";

export function LampDemo() {
  return (
    <LampContainer className="relative pt-30 ">
      <div className="absolute inset-0 bg-gradient-to-br from-[#2f2f2f] via-[#1a1a1a] to-[#000000] opacity-40 z-0" />
      <div className="relative h-96 pt-30 z-10 text-center px-4">
        <motion.h1
          initial={{ opacity: 0.5, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="mt-8 bg-gradient-to-br from-yellow-300 via-white to-pink-500 py-4 bg-clip-text text-4xl md:text-7xl font-extrabold tracking-tight text-transparent"
        >
          Ditch the Resume,<br /> Prove Your Skills.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.6,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="text-white text-lg md:text-2xl font-medium mt-4"
        >
          We’re here to make you a <span className="text-yellow-400">professional</span> — <br />
          one challenge at a time.
        </motion.p>

        {/* ✅ New Content Starts Here */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 1,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="text-white/80 text-base md:text-lg mt-6"
        >
          Whether you're a self-taught dev or a career switcher, this is your proving ground.  
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 1.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="text-white/80 text-base md:text-lg mt-2"
        >
          Real-world tasks. Honest feedback. Zero gatekeeping.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 1.6,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="text-yellow-400 text-sm md:text-base font-semibold mt-6"
        >
          ✨ Your skills are the resume. Let them speak.
        </motion.p>
        {/* ✅ New Content Ends Here */}
      </div>
    </LampContainer>
  );
}
