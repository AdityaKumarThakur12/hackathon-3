import React, { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission — plug into Firebase, EmailJS, Formspree, etc.
    console.log("Submitted: ", formData);
    alert("We'll hit you back soon. Stay tuned! 🔥");
  };

  return (
    <>
    <div className="bg-black shadow-2xl">
    <Navbar/>
    </div>
    <div className="min-h-screen bg-zinc-950 text-white px-6 py-16 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-2xl bg-zinc-900/80 p-10 rounded-3xl shadow-lg border border-zinc-700"
      >
        <h2 className="text-4xl font-bold mb-6 text-center drop-shadow">
          Let's Connect
        </h2>
        <p className="text-center text-zinc-400 mb-10">
          Got questions? Feedback? Collab ideas?  
          Drop a line. We’re building the future of hiring, together.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <FloatingLabelInput
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <FloatingLabelInput
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            type="email"
          />
          <FloatingLabelInput
            label="Message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            textarea
          />

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full py-3 px-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-pink-600 hover:to-yellow-500 transition-colors rounded-xl text-white font-semibold text-lg shadow-xl"
          >
            Send it 💌
          </motion.button>
        </form>
      </motion.div>
    </div>
    <Footer/>
    </>
  );
};

// Floating label input component
const FloatingLabelInput = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  textarea = false,
}) => {
  return (
    <div className="relative">
      {textarea ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          required
          rows={5}
          className="w-full bg-transparent border-b border-zinc-500 text-white px-2 pt-6 pb-2 placeholder-transparent focus:outline-none focus:border-pink-500 peer"
          placeholder={label}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          required
          className="w-full bg-transparent border-b border-zinc-500 text-white px-2 pt-6 pb-2 placeholder-transparent focus:outline-none focus:border-pink-500 peer"
          placeholder={label}
        />
      )}
      <label
        htmlFor={name}
        className="absolute left-2 top-1 text-sm text-zinc-400 transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-base peer-placeholder-shown:text-zinc-500 peer-focus:top-1 peer-focus:text-sm peer-focus:text-pink-400"
      >
        {label}
      </label>
    </div>
  );
};

export default ContactPage;
