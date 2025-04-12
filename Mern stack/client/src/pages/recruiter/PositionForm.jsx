import React, { useState, useEffect } from "react";
import axiosInstance from "../../api/axios.jsx";
import {
  BriefcaseIcon,
  DocumentTextIcon,
  LinkIcon,
  BuildingOfficeIcon,
} from "@heroicons/react/24/outline";

const PositionForm = () => {
  const [companies, setCompanies] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    sampleWork: "",
    companyId: "",
  });
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axiosInstance.get("recruiter/company", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCompanies(res.data);
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    };
    fetchCompanies();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axiosInstance.post("recruiter/position", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      alert("Error creating position");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-white">
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <BriefcaseIcon className="w-8 h-8" />
              Create New Position
            </h1>
            <p className="mt-2 opacity-90">
              Define your ideal candidate requirements
            </p>
          </div>

          {/* Form Content */}
          <div className="grid md:grid-cols-2 gap-8 p-8">
            {/* Form Section */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Position Title
                  </label>
                  <div className="relative">
                    <input
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="Senior Software Engineer"
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                    <BriefcaseIcon className="w-5 h-5 absolute left-3 top-3.5 text-gray-400" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Position Description
                  </label>
                  <div className="relative">
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Describe the position responsibilities and requirements..."
                      rows="4"
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                    <DocumentTextIcon className="w-5 h-5 absolute left-3 top-3.5 text-gray-400" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sample Work URL
                  </label>
                  <div className="relative">
                    <input
                      name="sampleWork"
                      value={formData.sampleWork}
                      onChange={handleChange}
                      placeholder="https://example.com/sample-work"
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                    <LinkIcon className="w-5 h-5 absolute left-3 top-3.5 text-gray-400" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Associated Company
                  </label>
                  <div className="relative">
                    <select
                      name="companyId"
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent appearance-none"
                      value={formData.companyId}
                    >
                      <option value="">Select Company</option>
                      {companies.map((company) => (
                        <option key={company._id} value={company._id}>
                          {company.name}
                        </option>
                      ))}
                    </select>
                    <BuildingOfficeIcon className="w-5 h-5 absolute left-3 top-3.5 text-gray-400" />
                    <svg
                      className="w-5 h-5 absolute right-3 top-3.5 text-gray-400 pointer-events-none"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
              >
                Create Position
              </button>

              {showSuccess && (
                <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-lg flex items-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Position created successfully!
                </div>
              )}
            </form>

            {/* Preview Section */}
            <div className="bg-gray-50 p-6 rounded-lg border border-dashed border-gray-200">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <BriefcaseIcon className="w-5 h-5 text-gray-500" />
                Position Preview
              </h3>

              {formData.title && (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                      <BriefcaseIcon className="w-5 h-5 text-indigo-600" />
                    </div>
                    <h2 className="text-xl font-semibold">{formData.title}</h2>
                  </div>

                  {formData.description && (
                    <div className="mt-2">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">
                        Description
                      </h4>
                      <p className="text-gray-600 text-sm">
                        {formData.description}
                      </p>
                    </div>
                  )}

                  {formData.sampleWork && (
                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">
                        Sample Work
                      </h4>
                      <a
                        href={formData.sampleWork}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 hover:underline flex items-center gap-1"
                      >
                        <LinkIcon className="w-4 h-4" />
                        View Sample Work
                      </a>
                    </div>
                  )}

                  {formData.companyId && (
                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">
                        Associated Company
                      </h4>
                      <div className="flex items-center gap-2">
                        <BuildingOfficeIcon className="w-5 h-5 text-gray-500" />
                        <span className="text-gray-600">
                          {
                            companies.find((c) => c._id === formData.companyId)
                              ?.name
                          }
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {!formData.title && (
                <p className="text-gray-400 text-sm">
                  Start typing to see a preview of the position...
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PositionForm;
