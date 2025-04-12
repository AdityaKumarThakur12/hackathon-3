# 🚀 Anti-Resume Job Platform

> *Redefining hiring for the bold, the brilliant, and the underestimated.*

This isn't just another job portal. It's a **rebellion** against resumes, keywords, and hiring biases. Candidates prove themselves through **real-world challenges**, and companies post **real tasks**, not vague HR fluff.

No more keyword-stuffed resumes. No more guessing culture fits. No more hidden salaries. This is **hiring reimagined**.

---

## 🧠 Core Features

- 🎯 **Skill-based Challenges** – Candidates apply by solving tasks, not uploading PDFs.
- 🤖 **AI Matching** – Uses Gemini AI to match talent based on **skill, not buzzwords**.
- 🕵️ **Blind Matching** – Keeps things anonymous at first to cut out bias.
- 💸 **Transparent Offers** – Companies share **salaries and culture upfront**.
- 🔁 **Post-Hire Feedback Loop** – Feedback trains the AI for smarter future matches.
- 🔍 **GitHub AI Review** – Analyze GitHub activity to auto-generate strengths and improvement tips.

---

## 🧱 Tech Stack

| Frontend        | Backend         | AI & Tools        | Styling         |
|----------------|------------------|-------------------|-----------------|
| React 19       | Firebase         | Gemini AI (Google) | Tailwind CSS    |
| React Router 7 | Firebase Auth/DB | GitHub API        | Framer Motion   |
| Vite           | Axios            | Octokit           | Tailwind Merge  |

---

## 📁 Project Structure (src)

```
src/
├── assets/
│   └── react.svg
├── components/
│   ├── 3dmarqueeEffect.jsx
│   ├── aireviewModal.jsx
│   ├── allSubmission.jsx
│   ├── boxEffect.jsx
│   ├── candidateDashboard.jsx
│   ├── cards.jsx
│   ├── carousel.jsx
│   ├── challangeCard.jsx
│   ├── ChatBot/
│   │   └── chatbot.jsx
│   ├── dashboard.jsx
│   ├── footer.jsx
│   ├── githubAI/
│   │   ├── aifeedback.jsx
│   │   ├── inputForm.jsx
│   │   └── userStat.jsx
│   ├── lampEffect.jsx
│   ├── navbar.jsx
│   ├── postChallange.jsx
│   ├── recruiterDashboard.jsx
│   ├── submissionModal.jsx
│   └── ui/
│       ├── 3d-marque.jsx
│       ├── bg-box.jsx
│       └── lamp.jsx
├── contexts/
│   └── authContext.jsx
├── firebaseConfig/
│   └── firebase.js
├── lib/
│   ├── gemini.js
│   └── utils.js
├── pages/
│   ├── contact.jsx
│   ├── faq.jsx
│   ├── githubReview.jsx
│   ├── jobs.jsx
│   ├── login.jsx
│   └── signup.jsx
├── styles/
│   ├── carousel.css
│   ├── chatBot.css
│   └── chatMessage.css
├── utils/
│   ├── geminiAPi.jsx
│   ├── githubApi.jsx
│   └── ProtectedRoute.jsx
├── App.css
├── App.jsx
├── Home.jsx
├── index.css
└── main.jsx
```

---

## 📦 Dependencies

```json
"dependencies": {
  "@google/generative-ai": "^0.24.0",
  "@tailwindcss/vite": "^4.1.3",
  "axios": "^1.8.4",
  "clsx": "^2.1.1",
  "firebase": "^11.6.0",
  "framer-motion": "^12.6.5",
  "i": "^0.3.7",
  "lucide": "^0.487.0",
  "lucide-react": "^0.487.0",
  "motion": "^12.6.5",
  "npm": "^11.3.0",
  "octokit": "^4.1.3",
  "prismjs": "^1.30.0",
  "react": "^19.1.0",
  "react-dom": "^19.0.0",
  "react-hot-toast": "^2.5.2",
  "react-icons": "^5.5.0",
  "react-router-dom": "^7.5.0",
  "react-speech-recognition": "^4.0.0",
  "regenerator-runtime": "^0.14.1",
  "swiper": "^11.2.6",
  "tailwind-merge": "^3.2.0",
  "tailwindcss": "^4.1.3"
}
```

---

## 🛠 How to Run

```bash
git clone https://github.com/your-repo/anti-resume-platform
cd anti-resume-platform
npm install
npm run dev
```

---

## 🙌 Contribute

This project is community-first. PRs welcome. Ideas even more welcome. If you’ve got something wild to add — let’s talk.

---

## 📜 License

MIT. Free for all rebels.

---

> Made with ❤️, caffeine, and way too many late nights.

