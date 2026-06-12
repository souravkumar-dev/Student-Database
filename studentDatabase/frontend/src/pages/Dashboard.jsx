import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
// import CountUp from "react-countup";
import CountUpModule from "react-countup";

import { Users, GraduationCap, BookOpen, Database } from "lucide-react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"];

const Dashboard = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await API.get("/students");
      setStudents(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const totalStudents = students.length;

  const courseData = students.reduce((acc, student) => {
    const course = student.course || "Unknown";

    const found = acc.find((item) => item.name === course);

    if (found) {
      found.students += 1;
    } else {
      acc.push({
        name: course,
        students: 1,
      });
    }

    return acc;
  }, []);

  const semesterData = students.reduce((acc, student) => {
    const semester = student.semester || "N/A";

    const found = acc.find((item) => item.semester === semester);

    if (found) {
      found.students += 1;
    } else {
      acc.push({
        semester,
        students: 1,
      });
    }

    return acc;
  }, []);

  const CountUp = CountUpModule.default;

  return (
    <>

      <div className="flex bg-slate-100 min-h-screen">
        <Sidebar />
     <div className="flex-1">
      <Navbar />
        <div className="flex-1 p-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Dashboard Overview</h1>
            <p className="text-gray-500">Student Analytics & Management</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mb-8">

            {/* Students */}
            <div className="bg-white p-6 rounded-2xl shadow flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Students</p>
                <h1 className="text-4xl font-bold text-blue-600">
                  {totalStudents}
                </h1>
              </div>

              <div className="bg-blue-100 p-4 rounded-full">
                <Users size={32} className="text-blue-600" />
              </div>
            </div>

            {/* Courses */}
            <div className="bg-white p-6 rounded-2xl shadow flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Courses</p>
                <h1 className="text-4xl font-bold text-green-600">
                  {courseData.length}
                </h1>
              </div>

              <div className="bg-green-100 p-4 rounded-full">
                <BookOpen size={32} className="text-green-600" />
              </div>
            </div>

            {/* Semesters */}
            <div className="bg-white p-6 rounded-2xl shadow flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Semesters</p>
                <h1 className="text-4xl font-bold text-orange-500">
                  {semesterData.length}
                </h1>
              </div>

              <div className="bg-orange-100 p-4 rounded-full">
                <GraduationCap size={32} className="text-orange-500" />
              </div>
            </div>

            {/* Database */}
            <div className="bg-white p-6 rounded-2xl shadow flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Database Status</p>
                <h1 className="text-2xl font-bold text-green-600">Active</h1>
              </div>

              <div className="bg-green-100 p-4 rounded-full">
                <Database size={32} className="text-green-600" />
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-2xl shadow">
              <h2 className="text-xl font-semibold mb-4">
                Students By Semester
              </h2>

              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={semesterData}>
                  <XAxis dataKey="semester" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="students" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow">
              <h2 className="text-xl font-semibold mb-4">
                Course Distribution
              </h2>

              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={courseData}
                    dataKey="students"
                    nameKey="name"
                    outerRadius={100}
                    label
                  >
                    {courseData.map((_, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white mt-8 rounded-2xl shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Students</h2>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3">Name</th>
                    <th className="text-left py-3">Email</th>
                    <th className="text-left py-3">Course</th>
                    <th className="text-left py-3">Semester</th>
                  </tr>
                </thead>

                <tbody>
                  {students.slice(0, 5).map((student) => (
                    <tr key={student._id} className="border-b">
                      <td className="py-3">{student.name}</td>

                      <td className="py-3">{student.email}</td>

                      <td className="py-3">{student.course}</td>

                      <td className="py-3">{student.semester}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default Dashboard;
