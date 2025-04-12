import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

const faqs = [
  {
    question: "Why no resumes?",
    answer:
      "Because talent isn't a PDF. We believe skills shown in real challenges say way more than buzzwords and formatting tricks.",
  },
  {
    question: "How are candidates matched to jobs?",
    answer:
      "We use AI to match people based on their performance in real-world tasks, not on what school they went to or what titles they've held.",
  },
  {
    question: "How do companies post challenges?",
    answer:
      "Companies create real project samples — things that reflect actual work. Candidates complete these to showcase their skills.",
  },
  {
    question: "What makes this platform bias-free?",
    answer:
      "We remove identifiers like name, school, photo — initial matching is done blind so only skills speak.",
  },
  {
    question: "How does the feedback loop work?",
    answer:
      "After hiring, companies provide feedback which helps us improve the matching algorithm over time — for both sides.",
  },
];

const FAQItem = ({ faq, isOpen, onClick }) => (
  <div
    className="border border-zinc-700 rounded-2xl mb-4 overflow-hidden shadow-md bg-zinc-900/80 hover:shadow-xl transition duration-300"
  >
    <button
      onClick={onClick}
      className="flex items-center justify-between w-full px-6 py-4 text-left text-white font-semibold text-lg"
    >
      {faq.question}
      <motion.span
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <ChevronDown size={20} />
      </motion.span>
    </button>

    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          key="content"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="px-6 pb-4 text-sm text-zinc-300"
        >
          {faq.answer}
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) =>
    setOpenIndex(openIndex === index ? null : index);

  return (
    <>
    <div className="bg-black">
    <Navbar/>
    </div>
    <div className="max-w-3xl mx-auto mt-16 p-6 text-white">
      <h1 className="text-4xl font-bold text-center mb-10 text-white drop-shadow">
        Frequently Asked Questions
      </h1>

      {faqs.map((faq, index) => (
        <FAQItem
          key={index}
          faq={faq}
          isOpen={openIndex === index}
          onClick={() => toggleFAQ(index)}
        />
      ))}
    </div>
    <Footer/>
    </>
  );
};

export default FAQPage;
