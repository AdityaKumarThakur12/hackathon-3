import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../api/axios";
import {
  BuildingOfficeIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  ChartBarIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";

export default function CompanyDetails() {
  const { id } = useParams();
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`/recruiter/companies/${id}`)
      .then((res) => {
        setCompany(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load company details");
        setLoading(false);
      });
  }, [id]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500 flex items-center gap-2">
          <XCircleIcon className="w-6 h-6" />
          {error}
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-white">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-white/10 rounded-xl flex items-center justify-center">
                <span className="text-3xl font-bold">{company.name[0]}</span>
              </div>
              <div>
                <h1 className="text-4xl font-bold">{company.name}</h1>
                <p className="mt-2 opacity-90">{company.description}</p>
              </div>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid md:grid-cols-2 gap-8 p-8">
            {/* Company Info Card */}
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <BuildingOfficeIcon className="w-5 h-5" />
                Company Overview
              </h3>
              <dl className="space-y-4">
                <div className="flex justify-between items-center border-b pb-2">
                  <dt className="text-gray-600 flex items-center gap-2">
                    <CurrencyDollarIcon className="w-5 h-5" />
                    Salary Transparency
                  </dt>
                  <dd
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      company.salaryTransparency
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {company.salaryTransparency ? "Enabled" : "Disabled"}
                  </dd>
                </div>

                <div className="flex justify-between items-center border-b pb-2">
                  <dt className="text-gray-600 flex items-center gap-2">
                    <ClockIcon className="w-5 h-5" />
                    Created
                  </dt>
                  <dd className="text-gray-800">
                    {new Date(company.createdAt).toLocaleDateString()}
                  </dd>
                </div>

                <div className="flex justify-between items-center border-b pb-2">
                  <dt className="text-gray-600 flex items-center gap-2">
                    <ArrowPathIcon className="w-5 h-5" />
                    Last Updated
                  </dt>
                  <dd className="text-gray-800">
                    {new Date(company.updatedAt).toLocaleDateString()}
                  </dd>
                </div>
              </dl>
            </div>

            {/* Culture Metrics Card */}
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <UserGroupIcon className="w-5 h-5" />
                Culture DNA
              </h3>
              <div className="flex flex-wrap gap-2">
                {company.cultureMetrics.split(",").map((metric, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm"
                  >
                    {metric.trim()}
                  </span>
                ))}
              </div>
            </div>

            {/* Company Story */}
            <div className="md:col-span-2 bg-gray-50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <ChartBarIcon className="w-5 h-5" />
                Our Story
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {company.description}
              </p>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid md:grid-cols-3 gap-4 p-8 pt-0">
            <div className="bg-indigo-100 p-6 rounded-xl text-center">
              <div className="text-3xl font-bold text-indigo-600">24h</div>
              <div className="text-gray-600 mt-1">Avg. Response Time</div>
            </div>
            <div className="bg-purple-100 p-6 rounded-xl text-center">
              <div className="text-3xl font-bold text-purple-600">4.8★</div>
              <div className="text-gray-600 mt-1">Candidate Rating</div>
            </div>
            <div className="bg-pink-100 p-6 rounded-xl text-center">
              <div className="text-3xl font-bold text-pink-600">98%</div>
              <div className="text-gray-600 mt-1">Retention Rate</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
