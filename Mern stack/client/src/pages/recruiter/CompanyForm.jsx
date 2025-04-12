import React, { useState } from "react";
import axiosInstance from "../../api/axios.jsx";
import {
  BuildingOfficeIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline";

const CompanyForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    cultureMetrics: "",
    salaryTransparency: false,
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axiosInstance.post("recruiter/company", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      alert("Error creating company");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-white">
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <BuildingOfficeIcon className="w-8 h-8" />
              Build Your Company Profile
            </h1>
            <p className="mt-2 opacity-90">
              Showcase your company's unique culture and values
            </p>
          </div>

          {/* Form Content */}
          <div className="grid md:grid-cols-2 gap-8 p-8">
            {/* Form Section */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company Name
                  </label>
                  <div className="relative">
                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Google"
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                    <BuildingOfficeIcon className="w-5 h-5 absolute left-3 top-3.5 text-gray-400" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe your company..."
                    rows="4"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Culture Metrics (comma separated)
                  </label>
                  <div className="relative">
                    <input
                      name="cultureMetrics"
                      value={formData.cultureMetrics}
                      onChange={handleChange}
                      placeholder="Innovation, Diversity, Sustainability"
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                    <ChartBarIcon className="w-5 h-5 absolute left-3 top-3.5 text-gray-400" />
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="salaryTransparency"
                      className="sr-only peer"
                      checked={formData.salaryTransparency}
                      onChange={handleChange}
                    />
                    <div className="w-11 h-6 bg-gray-300 rounded-full peer-checked:bg-indigo-600 transition-colors duration-300">
                      <div
                        className={`absolute top-[2px] left-[2px] w-5 h-5 bg-white rounded-full shadow-sm transform transition-transform duration-300 ${
                          formData.salaryTransparency
                            ? "translate-x-5"
                            : "translate-x-0"
                        }`}
                      />
                    </div>
                    <span className="ml-3 text-sm text-gray-700 flex items-center gap-1">
                      <CurrencyDollarIcon className="w-5 h-5 text-gray-500" />
                      Salary Transparency
                    </span>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
              >
                Create Company Profile
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
                  Company profile created successfully!
                </div>
              )}
            </form>

            {/* Preview Section */}
            <div className="bg-gray-50 p-6 rounded-lg border border-dashed border-gray-200">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <BuildingOfficeIcon className="w-5 h-5 text-gray-500" />
                Profile Preview
              </h3>

              {formData.name && (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                      <span className="text-indigo-600 font-bold text-xl">
                        {formData.name[0]}
                      </span>
                    </div>
                    <h2 className="text-xl font-semibold">{formData.name}</h2>
                  </div>

                  {formData.description && (
                    <p className="text-gray-600 text-sm">
                      {formData.description}
                    </p>
                  )}

                  {formData.cultureMetrics && (
                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">
                        Culture Metrics
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {formData.cultureMetrics
                          .split(",")
                          .map((metric, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-indigo-100 text-indigo-700 text-sm rounded-full"
                            >
                              {metric.trim()}
                            </span>
                          ))}
                      </div>
                    </div>
                  )}

                  {formData.salaryTransparency && (
                    <div className="mt-4 flex items-center gap-2 text-sm text-green-600">
                      <CurrencyDollarIcon className="w-5 h-5" />
                      Salary Transparency Enabled
                    </div>
                  )}
                </div>
              )}

              {!formData.name && (
                <p className="text-gray-400 text-sm">
                  Start typing to see a preview of your company profile...
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyForm;
