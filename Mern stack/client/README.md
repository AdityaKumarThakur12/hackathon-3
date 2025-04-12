# Anti-Resume Platform – Frontend (React)

This is the frontend codebase for the **Anti-Resume Job Platform** built with **React.js**, **React Router**, and **Tailwind CSS**. It supports separate dashboards and functionality for **interviewees** and **recruiters**.

---

## 📁 Project Structure

```
src
┣ api
┃ ┗ axios.jsx             # Axios instance with base configuration
┣ assets
┃ ┗ react.svg             # Static assets
┣ auth
┃ ┗ AuthContext.jsx       # Auth provider for managing auth state
┣ components
┃ ┗ PrivateRoute.jsx      # Protected route component
┣ pages
┃ ┣ interviewee
┃ ┃ ┣ ChallengePage.jsx   # View & attempt challenges
┃ ┃ ┣ Dashboard.jsx       # Interviewee dashboard
┃ ┃ ┗ Login.jsx           # Login page for interviewees
┃ ┣ recruiter
┃ ┃ ┣ ChallengeDetails.jsx# View specific challenge with questions
┃ ┃ ┣ ChallengeForm.jsx   # Create/edit a challenge
┃ ┃ ┣ CompanyDetails.jsx  # View company details
┃ ┃ ┣ CompanyForm.jsx     # Create/edit a company
┃ ┃ ┣ Dashboard.jsx       # Recruiter dashboard
┃ ┃ ┣ Login.jsx           # Login page for recruiters
┃ ┃ ┣ PositionDetails.jsx # View a job position
┃ ┃ ┣ PositionForm.jsx    # Create/edit a position
┃ ┃ ┣ QuestionForm.jsx    # Add questions to a challenge
┃ ┃ ┗ SubmissionsReview.jsx # Review candidate submissions
┃ ┣ HomePage.jsx          # Landing/home page
┃ ┗ Signup.jsx            # Common signup page
┣ App.css                 # Global styles
┣ App.jsx                 # Root app component with routing
┣ index.css               # Tailwind base styles
┗ main.jsx                # App entry point
```

---

## 🚀 Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Run development server
```bash
npm run dev
```

### 3. Build for production
```bash
npm run build
```

---

## 🌐 Routing Overview
- `/signup`: Common signup for all users
- `/recruiter/login`: Recruiter login
- `/recruiter/dashboard`: Recruiter dashboard & management
- `/interviewee/login`: Interviewee login
- `/interviewee/dashboard`: Interviewee dashboard

---

## 🧩 Dependencies
- **React 19**
- **React Router v7**
- **Axios** – API requests
- **Tailwind CSS** – Styling

---

## 🔐 Auth & Protected Routes
- `AuthContext.jsx` handles user context and JWT-based login states.
- `PrivateRoute.jsx` restricts access to dashboard routes unless authenticated.

---

## 📦 API Handling
- `axios.jsx` provides a configured instance to make authenticated requests to the backend.

---

## 📋 Notes
- Tailwind config and ESLint rules are already set up.
- Make sure the backend is running for API routes to work.
- Check `.env` file for API base URL configuration if needed.

---

Feel free to customize the UI and add more components or logic based on your project requirements!

