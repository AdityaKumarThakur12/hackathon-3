import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../api/axios";
import {
  BriefcaseIcon,
  DocumentTextIcon,
  LinkIcon,
  BuildingOfficeIcon,
  ClockIcon,
  ChartBarIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

export default function PositionDetails() {
  const { id } = useParams();
  const [position, setPosition] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`/recruiter/positions/${id}`)
      .then((res) => {
        setPosition(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load position details");
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
                <BriefcaseIcon className="w-10 h-10" />
              </div>
              <div>
                <h1 className="text-4xl font-bold">{position.title}</h1>
                <p className="mt-2 opacity-90">{position.description}</p>
              </div>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid md:grid-cols-2 gap-8 p-8">
            {/* Position Overview Card */}
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <DocumentTextIcon className="w-5 h-5" />
                Position Overview
              </h3>
              <dl className="space-y-4">
                <div className="flex items-start gap-3">
                  <LinkIcon className="w-5 h-5 mt-1 text-indigo-600" />
                  <div>
                    <dt className="text-gray-600">Sample Work</dt>
                    <dd className="mt-1">
                      <a
                        href={position.sampleWork}
                        className="text-indigo-600 hover:underline flex items-center gap-1"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Sample Work
                        <span aria-hidden="true">→</span>
                      </a>
                    </dd>
                  </div>
                </div>
              </dl>
            </div>

            {/* Company Card */}
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <BuildingOfficeIcon className="w-5 h-5" />
                Associated Company
              </h3>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                  {typeof position.company === "object" ? (
                    <span className="text-indigo-600 font-bold">
                      {position.company.name[0]}
                    </span>
                  ) : (
                    <BuildingOfficeIcon className="w-5 h-5 text-indigo-600" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-gray-800">
                    {typeof position.company === "object"
                      ? position.company.name
                      : "Company Details"}
                  </p>
                  <p className="text-sm text-gray-600">
                    {typeof position.company === "object" &&
                      position.company.description?.substring(0, 40) + "..."}
                  </p>
                </div>
              </div>
            </div>

            {/* Timeline Card */}
            <div className="md:col-span-2 bg-gray-50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <ClockIcon className="w-5 h-5" />
                Position Timeline
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Created</p>
                  <p className="font-medium text-gray-800">
                    {new Date(position.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Last Updated</p>
                  <p className="font-medium text-gray-800">
                    {new Date(position.updatedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid md:grid-cols-3 gap-4 p-8 pt-0">
            <div className="bg-indigo-100 p-6 rounded-xl text-center">
              <div className="text-3xl font-bold text-indigo-600">24</div>
              <div className="text-gray-600 mt-1">Active Candidates</div>
            </div>
            <div className="bg-purple-100 p-6 rounded-xl text-center">
              <div className="text-3xl font-bold text-purple-600">82%</div>
              <div className="text-gray-600 mt-1">Completion Rate</div>
            </div>
            <div className="bg-pink-100 p-6 rounded-xl text-center">
              <div className="text-3xl font-bold text-pink-600">48h</div>
              <div className="text-gray-600 mt-1">Avg. Hiring Time</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
