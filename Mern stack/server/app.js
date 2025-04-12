// server.js
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const app = express();
const validator = require("validator");

dotenv.config();
app.use(cors());
app.use(express.json());

// ======================== DB CONNECTION ========================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// =========================== MODELS ===========================
const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: String,
    role: { type: String, enum: ["recruiter", "interviewee"] },
  },
  { timestamps: true }
);
const User = model("User", userSchema);

const companySchema = new Schema(
  {
    name: String,
    description: String,
    cultureMetrics: String,
    salaryTransparency: Boolean,
    recruiter: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);
const Company = model("Company", companySchema);

const positionSchema = new Schema(
  {
    title: String,
    description: String,
    sampleWork: String,
    company: { type: Schema.Types.ObjectId, ref: "Company" },
    challenges: [{ type: Schema.Types.ObjectId, ref: "Challenge" }],
  },
  { timestamps: true }
);
const Position = model("Position", positionSchema);

const challengeSchema = new Schema(
  {
    title: String,
    description: String,
    difficulty: String,
    questions: [{ type: Schema.Types.ObjectId, ref: "Question" }],
    position: { type: Schema.Types.ObjectId, ref: "Position" },
  },
  { timestamps: true }
);
const Challenge = model("Challenge", challengeSchema);

const questionSchema = new Schema({
  questionText: String,
  type: { type: String, enum: ["mcq", "coding", "written"] },
  options: [String],
  correctAnswer: String,
  score: Number,
});
const Question = model("Question", questionSchema);

// 🛠️ ADDED position field to allow population
const submissionSchema = new Schema(
  {
    interviewee: { type: Schema.Types.ObjectId, ref: "User" },
    challenge: { type: Schema.Types.ObjectId, ref: "Challenge" },
    position: { type: Schema.Types.ObjectId, ref: "Position" }, // ✅ Added line
    answers: [String],
    score: Number,
    feedback: String,
    status: {
      type: String,
      enum: ["pending", "selected", "rejected", "on hold"],
      default: "pending",
    },
  },
  { timestamps: true }
);
const Submission = model("Submission", submissionSchema);

const resumeReviewSchema = new Schema(
  {
    resumeUrl: String,
    feedback: String,
    rating: Number,
    interviewee: { type: Schema.Types.ObjectId, ref: "User" },
    reviewedBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const ResumeReview = model("ResumeReview", resumeReviewSchema);

// ======================== MIDDLEWARE ========================
function authMiddleware(role) {
  return (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ msg: "No token provided" });
    try {
      const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
      if (decoded.role !== role)
        return res.status(403).json({ msg: "Unauthorized" });
      req.user = decoded;
      next();
    } catch (err) {
      res.status(401).json({ msg: "Invalid token" });
    }
  };
}

// ======================== ROUTES ========================

// Auth
app.post("/api/auth/register", async (req, res) => {
  const { name, email, password, role } = req.body;
  if (!name) {
    return res.status(400).json({ message: "Please provide a name" });
  } else if (!email) {
    return res.status(400).json({ message: "Please provide an email" });
  } else if (!password) {
    return res.status(400).json({ message: "Please provide a password" });
  } else if (!role) {
    return res.status(400).json({ message: "Please provide a role" });
  }
  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "Password must be at least 6 characters" });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({ message: "Please provide a valid email" });
  }
  const existing = await User.findOne({ email });
  if (existing) {
    return res.status(400).json({ message: "Email already exists" });
  }
  const hashed = await bcrypt.hash(password, 10);
  const user = new User({ name, email, password: hashed, role });
  try {
    await user.save();
    res.json({ msg: "Registered successfully" });
  } catch (err) {
    res.status(400).json({ msg: "User already exists" });
  }
});

app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ msg: "User not found" });
  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ msg: "Invalid credentials" });
  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
  res.json({ token });
});

// Recruiter routes
app.post(
  "/api/recruiter/company",
  authMiddleware("recruiter"),
  async (req, res) => {
    const { name, description, cultureMetrics, salaryTransparency } = req.body;
    const company = new Company({
      name,
      description,
      cultureMetrics,
      salaryTransparency,
      recruiter: req.user.id,
    });
    await company.save();
    res.json(company);
  }
);

app.get(
  "/api/recruiter/companies",
  authMiddleware("recruiter"),
  async (req, res) => {
    try {
      const recruiterId = req.user.id;
      const companies = await Company.find({ recruiter: recruiterId });
      res.json(companies);
    } catch (err) {
      console.error("Error fetching companies:", err);
      res.status(500).json({ message: "Failed to fetch companies" });
    }
  }
);

app.get("/api/recruiter/companies/:id", async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) return res.status(404).json({ error: "Company not found" });
    res.json(company);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/api/recruiter/positions/:id", async (req, res) => {
  try {
    const position = await Position.findById(req.params.id).populate("company"); // Optional: if you want to show company details
    if (!position) return res.status(404).json({ error: "Position not found" });
    res.json(position);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Keep only this one version
app.get(
  "/api/recruiter/challenges",
  authMiddleware("recruiter"),
  async (req, res) => {
    try {
      const companies = await Company.find({ recruiter: req.user.id });
      const companyIds = companies.map((c) => c._id);

      const positions = await Position.find({ company: { $in: companyIds } });
      const positionIds = positions.map((p) => p._id);

      const challenges = await Challenge.find({
        position: { $in: positionIds },
      });
      // ✅ no .populate("questions") needed here unless required on frontend
      res.json(challenges);
    } catch (err) {
      console.error("Error fetching challenges:", err);
      res.status(500).json({ msg: "Error fetching challenges" });
    }
  }
);

app.get("/api/recruiter/challenges/:id", async (req, res) => {
  try {
    const challenge = await Challenge.findById(req.params.id)
      .populate("position")
      .populate("questions");
    if (!challenge)
      return res.status(404).json({ error: "Challenge not found" });
    res.json(challenge);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

app.post(
  "/api/recruiter/position",
  authMiddleware("recruiter"),
  async (req, res) => {
    const { title, description, sampleWork, companyId } = req.body;
    const position = new Position({
      title,
      description,
      sampleWork,
      company: companyId,
    });
    await position.save();
    res.json(position);
  }
);

app.get(
  "/api/recruiter/company",
  authMiddleware("recruiter"),
  async (req, res) => {
    try {
      const companies = await Company.find({ recruiter: req.user.id });
      res.json(companies);
    } catch (err) {
      res.status(500).json({ msg: "Error fetching companies" });
    }
  }
);

app.post(
  "/api/recruiter/challenge",
  authMiddleware("recruiter"),
  async (req, res) => {
    try {
      const { title, description, difficulty, positionId } = req.body;

      // Create the new challenge
      const challenge = new Challenge({
        title,
        description,
        difficulty,
        position: positionId,
      });

      await challenge.save();

      // Push challenge ID to the corresponding position
      await Position.findByIdAndUpdate(positionId, {
        $push: { challenges: challenge._id },
      });

      res.json(challenge);
    } catch (err) {
      console.error("Error creating challenge:", err);
      res.status(500).json({ error: "Failed to create challenge" });
    }
  }
);

app.get(
  "/api/recruiter/positions",
  authMiddleware("recruiter"),
  async (req, res) => {
    try {
      const recruiterId = req.user.id; // ✅ FIX: Get logged-in recruiter ID

      // Step 1: Find companies created by this recruiter
      const companyIds = await Company.find({
        recruiter: recruiterId,
      }).distinct("_id");

      // Step 2: Find positions under those companies
      const positions = await Position.find({
        company: { $in: companyIds },
      }).populate("company");

      res.json(positions);
    } catch (err) {
      console.error("Error fetching recruiter-specific positions:", err);
      res.status(500).json({ msg: "Failed to fetch positions" });
    }
  }
);

// Recruiter gives feedback
app.post(
  "/api/recruiter/resume-review",
  authMiddleware("recruiter"),
  async (req, res) => {
    const { resumeUrl, feedback, rating, intervieweeId } = req.body;
    const review = new ResumeReview({
      resumeUrl,
      feedback,
      rating,
      interviewee: intervieweeId,
      reviewedBy: req.user.id,
    });
    await review.save();
    res.json(review);
  }
);

app.post(
  "/api/recruiter/question",
  authMiddleware("recruiter"),
  async (req, res) => {
    const { questionText, type, options, correctAnswer, score, challengeId } =
      req.body;
    const question = new Question({
      questionText,
      type,
      options,
      correctAnswer,
      score,
    });
    await question.save();
    await Challenge.findByIdAndUpdate(challengeId, {
      $push: { questions: question._id },
    });
    res.json(question);
  }
);

app.post(
  "/api/recruiter/questions/bulk",
  authMiddleware("recruiter"),
  async (req, res) => {
    try {
      const { challengeId, questions } = req.body;

      if (!challengeId || !Array.isArray(questions)) {
        return res.status(400).json({ msg: "Invalid data" });
      }

      const insertedQuestions = await Question.insertMany(questions);

      const questionIds = insertedQuestions.map((q) => q._id);
      await Challenge.findByIdAndUpdate(challengeId, {
        $push: { questions: { $each: questionIds } },
      });

      res.json({ msg: "Questions created", questions: insertedQuestions });
    } catch (err) {
      console.error("Bulk question creation failed:", err);
      res.status(500).json({ msg: "Server error during bulk insert" });
    }
  }
);

app.get(
  "/api/recruiter/position",
  authMiddleware("recruiter"),
  async (req, res) => {
    const companies = await Company.find({ recruiter: req.user.id });
    const positions = await Position.find({
      company: { $in: companies.map((c) => c._id) },
    }).populate("company");
    res.json(positions);
  }
);

app.get(
  "/api/recruiter/submissions",
  authMiddleware("recruiter"),
  async (req, res) => {
    try {
      const recruiterId = req.user.id;

      // Step 1: Get all company IDs owned by this recruiter
      const companyIds = await Company.find({
        recruiter: recruiterId,
      }).distinct("_id");

      // Step 2: Get all position IDs under those companies
      const positionIds = await Position.find({
        company: { $in: companyIds },
      }).distinct("_id");

      // Step 3: Get all challenge IDs under those positions
      const challengeIds = await Challenge.find({
        position: { $in: positionIds },
      }).distinct("_id");

      // Step 4: Fetch only submissions tied to those challenges
      const submissions = await Submission.find({
        challenge: { $in: challengeIds },
      })

        .populate({
          path: "interviewee",
          select: "name email",
        })
        .populate({
          path: "challenge",
          populate: { path: "position", select: "title company" },
        })
        .populate({
          path: "position",
          populate: { path: "company", select: "name" },
        });

      res.json(submissions);
    } catch (err) {
      console.error("Error fetching recruiter-specific submissions:", err);
      res.status(500).json({ msg: "Failed to fetch submissions" });
    }
  }
);

app.patch(
  "/api/recruiter/submission/:id",
  authMiddleware("recruiter"),
  async (req, res) => {
    const { status, feedback } = req.body;
    const updated = await Submission.findByIdAndUpdate(
      req.params.id,
      { status, feedback },
      { new: true }
    );
    res.json(updated);
  }
);

// Update submission status (select/reject)
app.put(
  "/api/recruiter/submission/:id",
  authMiddleware("recruiter"),
  async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    console.log("Body received for status update:", req.body);

    if (!["selected", "rejected", "on hold"].includes(status)) {
      return res.status(400).json({ msg: "Invalid status value" });
    }

    try {
      const updated = await Submission.findByIdAndUpdate(
        id,
        { status },
        { new: true }
      ).populate("interviewee challenge position");

      if (!updated)
        return res.status(404).json({ msg: "Submission not found" });

      res.json(updated);
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: "Server error" });
    }
  }
);

// Interviewee routes

app.get(
  "/api/interviewee/positions",
  authMiddleware("interviewee"),
  async (req, res) => {
    const positions = await Position.find()
      .populate("company")
      .populate("challenges");
    res.json(positions);
  }
);

app.get(
  "/api/interviewee/resume-reviews",
  authMiddleware("interviewee"),
  async (req, res) => {
    const reviews = await ResumeReview.find({
      interviewee: req.user.id,
    }).populate("reviewedBy");
    res.json(reviews);
  }
);

app.get(
  "/api/interviewee/submission/:challengeId",
  authMiddleware("interviewee"),
  async (req, res) => {
    const submission = await Submission.findOne({
      interviewee: req.user.id,
      challenge: req.params.challengeId,
    });
    res.json(submission);
  }
);

app.get(
  "/api/recruiter/questions",
  authMiddleware("recruiter"),
  async (req, res) => {
    try {
      const questions = await Question.find({});
      res.json(questions);
    } catch (err) {
      res.status(500).json({ msg: "Error fetching questions" });
    }
  }
);

app.get(
  "/api/interviewee/challenge/:id",
  authMiddleware("interviewee"),
  async (req, res) => {
    const { id } = req.params;

    // ✅ Validate ObjectId before querying
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid Challenge ID" });
    }

    try {
      const challenge = await Challenge.findById(id).populate("questions");

      if (!challenge) {
        return res.status(404).json({ error: "Challenge not found" });
      }

      res.json(challenge);
    } catch (err) {
      console.error("Error fetching challenge:", err);
      res.status(500).json({ error: "Server error" });
    }
  }
);

app.post(
  "/api/interviewee/submit",
  authMiddleware("interviewee"),
  async (req, res) => {
    const { challengeId, positionId, answers, score } = req.body;

    const submission = new Submission({
      interviewee: req.user.id,
      challenge: challengeId,
      position: positionId, // ✅ added field
      answers,
      score,
    });

    await submission.save();
    res.json(submission);
  }
);

app.get(
  "/api/interviewee/submissions",
  authMiddleware("interviewee"),
  async (req, res) => {
    const submissions = await Submission.find({
      interviewee: req.user.id,
    }).populate("challenge");
    res.json(submissions);
  }
);

// GET interviewee's submission results
// ================= INTERVIEWEE: View Own Submissions (Results) =================
app.get(
  "/api/interviewee/results",
  authMiddleware("interviewee"),
  async (req, res) => {
    try {
      const intervieweeId = req.user.id;

      const submissions = await Submission.find({ interviewee: intervieweeId })
        .populate({
          path: "challenge",
          populate: {
            path: "position",
            populate: {
              path: "company",
              select: "name",
            },
            select: "title",
          },
          select: "title",
        })
        .populate({
          path: "position",
          populate: {
            path: "company",
            select: "name",
          },
          select: "title",
        });

      const resultData = submissions.map((sub) => ({
        challengeTitle: sub.challenge?.title || "N/A",
        positionTitle:
          sub.position?.title || sub.challenge?.position?.title || "N/A",
        companyName:
          sub.position?.company?.name ||
          sub.challenge?.position?.company?.name ||
          "N/A",
        score: sub.score,
        status: sub.status,
        feedback: sub.feedback,
        submittedAt: sub.createdAt,
      }));

      res.json(resultData);
    } catch (err) {
      console.error("Error fetching results for interviewee:", err);
      res.status(500).json({ msg: "Error fetching results" });
    }
  }
);

// ======================== SERVER ========================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
