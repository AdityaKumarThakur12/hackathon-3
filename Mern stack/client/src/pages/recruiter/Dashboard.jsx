import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../api/axios";
import {
  BuildingOfficeIcon,
  BriefcaseIcon,
  PuzzlePieceIcon,
  DocumentTextIcon,
  FolderOpenIcon,
} from "@heroicons/react/24/outline";

export default function RecruiterDashboard() {
  const [submissions, setSubmissions] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [positions, setPositions] = useState([]);
  const [challenges, setChallenges] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [subs, comps, pos, chal] = await Promise.all([
          axios.get("/recruiter/submissions"),
          axios.get("/recruiter/companies"),
          axios.get("/recruiter/positions"),
          axios.get("/recruiter/challenges"),
        ]);
        setSubmissions(subs.data);
        setCompanies(comps.data);
        setPositions(pos.data);
        setChallenges(chal.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Talent Hub
          </h2>
          <p className="text-gray-600 mt-2">AI-Powered Recruitment Dashboard</p>
        </div>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {[
            {
              to: "/recruiter/company",
              text: "Add Company",
              icon: BuildingOfficeIcon,
              color: "from-indigo-500 to-blue-500",
            },
            {
              to: "/recruiter/position",
              text: "Add Position",
              icon: BriefcaseIcon,
              color: "from-purple-500 to-fuchsia-500",
            },
            {
              to: "/recruiter/challenge",
              text: "Create Challenge",
              icon: PuzzlePieceIcon,
              color: "from-pink-500 to-rose-500",
            },
            {
              to: "/recruiter/question",
              text: "Add Question",
              icon: DocumentTextIcon,
              color: "from-blue-500 to-cyan-500",
            },
            {
              to: "/recruiter/submissions",
              text: "Review Submissions",
              icon: FolderOpenIcon,
              color: "from-gray-500 to-slate-600",
            },
          ].map((action, idx) => (
            <Link
              key={idx}
              to={action.to}
              className={`group bg-white p-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 border border-gray-200/50`}
            >
              <div
                className={`w-12 h-12 rounded-lg mb-3 bg-gradient-to-br ${action.color} flex items-center justify-center`}
              >
                <action.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors">
                {action.text}
              </h3>
            </Link>
          ))}
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Companies Section */}
          <SectionCard
            title="Companies"
            count={companies.length}
            color="indigo"
          >
            <ul className="space-y-2">
              {companies.map((company) => (
                <ListItem
                  key={company._id}
                  to={`/recruiter/company/${company._id}`}
                  text={company.name}
                  meta={`${company.positions?.length || 0} positions`}
                  icon={BuildingOfficeIcon}
                />
              ))}
            </ul>
          </SectionCard>

          {/* Positions Section */}
          <SectionCard
            title="Positions"
            count={positions.length}
            color="purple"
          >
            <ul className="space-y-2">
              {positions.map((position) => (
                <ListItem
                  key={position._id}
                  to={`/recruiter/position/${position._id}`}
                  text={position.title}
                  meta={`${position.applicants || 0} applicants`}
                  icon={BriefcaseIcon}
                />
              ))}
            </ul>
          </SectionCard>

          {/* Challenges Section */}
          <SectionCard
            title="Challenges"
            count={challenges.length}
            color="pink"
          >
            <ul className="space-y-2">
              {challenges.map((challenge) => (
                <ListItem
                  key={challenge._id}
                  to={`/recruiter/challenge/${challenge._id}`}
                  text={challenge.title}
                  meta={`${challenge.submissions || 0} submissions`}
                  icon={PuzzlePieceIcon}
                />
              ))}
            </ul>
          </SectionCard>

          {/* Recent Submissions Section */}
          <SectionCard
            title="Recent Submissions"
            count={submissions.length}
            color="blue"
          >
            <div className="space-y-3">
              {submissions.map((s) => (
                <div
                  key={s._id}
                  className="group bg-white p-4 rounded-lg border border-gray-200 hover:border-indigo-200 transition-all"
                >
                  <Link to={`/recruiter/submission/${s._id}`} className="block">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                            <span className="text-sm font-medium text-indigo-600">
                              {s.interviewee.name[0]}
                            </span>
                          </div>
                          <h4 className="font-medium text-gray-800 group-hover:text-indigo-600">
                            {s.interviewee.name}
                          </h4>
                        </div>
                        <p className="text-sm text-gray-600 ml-10">
                          {s.challenge.title}
                        </p>
                      </div>
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                          statusColors[s.status]
                        }`}
                      >
                        {s.status}
                      </span>
                    </div>
                    <div className="mt-2 flex items-center justify-between text-xs text-gray-500 ml-10">
                      <span>{new Date(s.createdAt).toLocaleDateString()}</span>
                      <span>Score: {s.score || "—"}</span>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}

// Helper Components
const SectionCard = ({ title, count, children, color = "indigo" }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-200/50">
    <div className="p-5 border-b border-gray-200/50 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <span
          className={`bg-${color}-100 text-${color}-800 px-2 py-1 rounded-full text-xs font-medium`}
        >
          {count}
        </span>
      </div>
      <Link
        to={`/recruiter/${title.toLowerCase()}`}
        className="text-indigo-600 hover:text-indigo-800 text-sm"
      >
        View all →
      </Link>
    </div>
    <div className="p-4">{children}</div>
  </div>
);

const ListItem = ({ to, text, meta, icon: Icon }) => (
  <li>
    <Link
      to={to}
      className="group flex items-center gap-3 p-3 rounded-lg hover:bg-indigo-50 transition-colors"
    >
      <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center">
        <Icon className="w-4 h-4 text-indigo-600" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-800 truncate">{text}</p>
        <p className="text-xs text-gray-500">{meta}</p>
      </div>
    </Link>
  </li>
);

const statusColors = {
  pending: "bg-amber-100 text-amber-800",
  approved: "bg-emerald-100 text-emerald-800",
  rejected: "bg-red-100 text-red-800",
  reviewed: "bg-blue-100 text-blue-800",
};
