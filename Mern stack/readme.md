# 🧠 Anti-Resume Job Platform

A full-stack MERN (MongoDB, Express, React, Node.js) web platform designed to flip the script on traditional hiring by emphasizing skills over resumes.

## 🔧 Tech Stack

### Frontend
- React.js
- React Router DOM
- Axios
- Tailwind CSS
- Vite

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JSON Web Tokens (JWT)

## 📁 Project Structure

### Backend
```
backend/
 ┣ 📂models
 ┃ ┣ 📜Challenge.js
 ┃ ┣ 📜Company.js
 ┃ ┣ 📜Position.js
 ┃ ┣ 📜Question.js
 ┃ ┣ 📜Submission.js
 ┃ ┗ 📜User.js
 ┣ 📂routes
 ┃ ┣ 📜authRoutes.js
 ┃ ┣ 📜challengeRoutes.js
 ┃ ┣ 📜companyRoutes.js
 ┃ ┣ 📜positionRoutes.js
 ┃ ┣ 📜questionRoutes.js
 ┃ ┗ 📜submissionRoutes.js
 ┣ 📂controllers
 ┃ ┣ 📜authController.js
 ┃ ┣ 📜challengeController.js
 ┃ ┣ 📜companyController.js
 ┃ ┣ 📜positionController.js
 ┃ ┣ 📜questionController.js
 ┃ ┗ 📜submissionController.js
 ┣ 📂middleware
 ┃ ┗ 📜authMiddleware.js
 ┣ 📜server.js
 ┗ 📜.env
```

### Frontend
```
src/
 ┣ 📂api
 ┃ ┗ 📜axios.jsx
 ┣ 📂assets
 ┃ ┗ 📜react.svg
 ┣ 📂auth
 ┃ ┗ 📜AuthContext.jsx
 ┣ 📂components
 ┃ ┗ 📜PrivateRoute.jsx
 ┣ 📂pages
 ┃ ┣ 📂interviewee
 ┃ ┃ ┣ 📜ChallengePage.jsx
 ┃ ┃ ┣ 📜Dashboard.jsx
 ┃ ┃ ┗ 📜Login.jsx
 ┃ ┣ 📂recruiter
 ┃ ┃ ┣ 📜ChallengeDetails.jsx
 ┃ ┃ ┣ 📜ChallengeForm.jsx
 ┃ ┃ ┣ 📜CompanyDetails.jsx
 ┃ ┃ ┣ 📜CompanyForm.jsx
 ┃ ┃ ┣ 📜Dashboard.jsx
 ┃ ┃ ┣ 📜Login.jsx
 ┃ ┃ ┣ 📜PositionDetails.jsx
 ┃ ┃ ┣ 📜PositionForm.jsx
 ┃ ┃ ┣ 📜QuestionForm.jsx
 ┃ ┃ ┗ 📜SubmissionsReview.jsx
 ┃ ┣ 📜HomePage.jsx
 ┃ ┗ 📜Signup.jsx
 ┣ 📜App.css
 ┣ 📜App.jsx
 ┣ 📜index.css
 ┗ 📜main.jsx
```

## 👥 Roles

### Recruiter
- Login and signup
- Add/manage companies, positions, challenges, and questions
- Review candidate submissions

### Interviewee
- Signup and login
- Access dashboard with assigned challenges
- Submit answers for review

## 🛠 Features
- 🔐 JWT-based authentication
- 👨‍💼 Separate portals for recruiters and interviewees
- 📄 Skill-first challenges instead of resumes
- 📊 Recruiter dashboard to review and rate candidates

## 🚀 Getting Started

### Backend
```bash
cd backend
npm install
```env
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
```
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## 🌐 Contributing
Pull requests are welcome! Feel free to open issues for suggestions or bug reports.

## 📄 License
MIT License

