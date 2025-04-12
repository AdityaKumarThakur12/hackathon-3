# Anti-Resume Job Platform - Backend

## 🚀 Overview
This backend powers the **Anti-Resume Job Platform**, a revolutionary hiring system that focuses on skill-based assessments and blind hiring rather than traditional resumes. It facilitates:

- Candidate skill-based challenges instead of resumes
- AI-based matching (future integration)
- Real-world tasks instead of generic JDs
- Bias-free, blind initial matching
- Transparent salary and culture metrics
- Feedback loops post-hiring to improve matches

---

## 🧠 Tech Stack
- **Node.js** with **Express**
- **MongoDB** with **Mongoose**
- **JWT** for Authentication
- **bcryptjs** for Password Hashing
- **dotenv**, **cors**, **validator** for utilities and validation

---

## 🗂️ Project Structure
```
server.js                # Main backend file
.env                     # Environment variables (Mongo URI, JWT Secret)
```

---

## 📦 Models (MongoDB)
- **User**: name, email, hashed password, role (recruiter/interviewee)
- **Company**: name, description, cultureMetrics, salaryTransparency, recruiter (User ref)
- **Position**: title, description, sampleWork, company (Company ref), challenges[]
- **Challenge**: title, description, difficulty, position (Position ref), questions[]
- **Question**: questionText, type (mcq/coding/written), options[], correctAnswer, score
- **Submission**: interviewee (User), challenge (Challenge), position (Position), answers[], score, feedback, status
- **ResumeReview**: resumeUrl, feedback, rating, interviewee (User), reviewedBy (User)

---

## 🔐 Authentication
- **Register** `/api/auth/register`
- **Login** `/api/auth/login`

Authenticated using JWT and role-based access control middleware.

---

## 🧑‍💼 Recruiter APIs
### Companies
- Create: `POST /api/recruiter/company`
- Get All: `GET /api/recruiter/companies`
- Get One: `GET /api/recruiter/companies/:id`

### Positions
- Create: `POST /api/recruiter/position`
- Get All: `GET /api/recruiter/positions`
- Get One: `GET /api/recruiter/positions/:id`

### Challenges
- Create: `POST /api/recruiter/challenge`
- Get All: `GET /api/recruiter/challenges`
- Get One: `GET /api/recruiter/challenges/:id`

### Questions
- Add One: `POST /api/recruiter/question`
- Add Multiple: `POST /api/recruiter/questions/bulk`

### Submissions
- Get All: `GET /api/recruiter/submissions`

### Resume Reviews
- Post Feedback: `POST /api/recruiter/resume-review`

---

## 🛡️ Middleware
- **authMiddleware(role)**: Verifies JWT token and restricts access by user role (recruiter or interviewee)

---

## 🛠️ Setup Instructions
1. Clone the repo:
```bash
git clone <repo-url>
cd anti-resume-backend
```
2. Install dependencies:
```bash
npm install
```
3. Create a `.env` file:
```env
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
```
4. Start the server:
```bash
node server.js
```

---

## ✅ Future Enhancements
- AI-based smart matching engine
- Interviewee-side APIs
- Admin panel
- Notifications & messaging
- WebSocket for real-time interactions

---

## 📬 Contact
For issues or contributions, feel free to raise a pull request or open an issue!

---

Made with 💡 to fix the broken hiring system.

