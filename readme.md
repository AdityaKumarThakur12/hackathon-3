# 🚀 Anti-Resume Job Platform

> *Redefining hiring for the bold, the brilliant, and the underestimated.*

This isn't just another job portal. It's a **rebellion** against resumes, keywords, and hiring biases. Candidates prove themselves through **real-world challenges**, and companies post **real tasks**, not vague HR fluff.

No more keyword-stuffed resumes. No more guessing culture fits. No more hidden salaries. This is **hiring reimagined**.

---

## 🧠 Platform Variants

We built **two powerful versions** of the Anti-Resume Job Platform to test the limits of modern tech stacks. Both share the same bold philosophy, but differ under the hood:

### 🔥 Version 1: Firebase-Powered

- Built for speed and simplicity using **Firebase**.
- Features real-time DB, Auth, and AI integrations.
- Ideal for rapid prototyping, instant deploys, and zero backend headaches.

### 🛠️ Version 2: Full-Stack MERN

- Custom built using the **MERN stack**: MongoDB, Express, React, Node.js.
- Offers deep control over APIs, database logic, and scalable backend features.
- Perfect for complex workflows, enterprise control, and granular user roles.

---

## 🔧 Tech Stack Comparison

| Feature                    | Firebase Version                                     | MERN Version                                      |
|---------------------------|------------------------------------------------------|--------------------------------------------------|
| Frontend                  | React 19, Vite, Tailwind CSS, Framer Motion         | React, Vite, Tailwind CSS                        |
| Routing                   | React Router 7                                       | React Router DOM                                 |
| Authentication            | Firebase Auth                                       | JWT                                               |
| Database                  | Firebase Realtime DB                                | MongoDB (Mongoose)                               |
| Backend                   | Firebase Functions                                  | Node.js, Express                                  |
| AI                        | Gemini AI + GitHub API + Octokit                    | Gemini AI + GitHub API                           |
| Styling                   | Tailwind + Framer Motion                            | Tailwind CSS                                      |

---

## 🔍 Core Features

- 🎯 **Skill-based Challenges** – No resumes. Just prove yourself with tasks.
- 🤖 **AI Matching** – Matches based on skills, not keywords.
- 🕵️ **Blind Hiring** – Anonymous first impressions to reduce bias.
- 💸 **Transparent Offers** – Salary and company culture shown upfront.
- 🔁 **Feedback Loop** – Post-hire feedback trains the AI.
- 🔍 **GitHub AI Review** – Analyze your GitHub to get real insights.

---

## 📁 Firebase Version Structure

```
src/
├── assets/
├── components/
│   ├── ChatBot/
│   ├── githubAI/
│   └── ui/
├── contexts/
├── firebaseConfig/
├── lib/
├── pages/
├── styles/
├── utils/
├── App.jsx
├── Home.jsx
└── main.jsx
```

### 🔥 Firebase Highlights
- Zero-config hosting
- Realtime data sync
- Rapid auth integration

---

## 📁 MERN Version Structure

### Backend
```
backend/
 ┣ models/
 ┣ routes/
 ┣ controllers/
 ┣ middleware/
 ┣ server.js
 ┗ .env
```

### Frontend
```
src/
 ┣ api/
 ┣ assets/
 ┣ auth/
 ┣ components/
 ┣ pages/
 ┗ main.jsx
```

### 🛠 MERN Highlights
- Fine-tuned control over endpoints
- Robust auth with JWT
- Cleanly separated recruiter & interviewee roles

---

## 🧪 Role-Based Functionality

### Recruiter
- Create & manage companies, positions, and challenges
- Review candidate submissions
- Post transparent job listings

### Interviewee
- Get challenges, not buzzword filters
- Solve real-world tasks
- Get AI-powered GitHub feedback

---

## 🛠 How to Run

### Firebase Version
```bash
git clone https://github.com/your-repo/firebase-anti-resume
cd firebase-anti-resume
npm install
npm run dev
```

### MERN Version
```bash
git clone https://github.com/your-repo/mern-anti-resume
cd backend
npm install
npm run dev

# In another terminal
cd frontend
npm install
npm run dev
```

---

## 🌐 Contribute
This project is community-first. Got wild ideas? Open a PR. Let’s break the mold.

---

## 📜 License
MIT. Built for rebels.

> Made with ❤️, caffeine, and no patience for corporate nonsense.