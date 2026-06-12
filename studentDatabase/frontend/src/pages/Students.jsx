import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import toast from "react-hot-toast";
import { Search } from "lucide-react";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    setLoading(true);
    const res = await API.get("/students");
    setStudents(res.data);
    setLoading(false);
  };

  const handleSearch = async () => {
    if (!keyword.trim()) {
      fetchStudents();
      return;
    }

    const res = await API.get(`/students/search?keyword=${keyword}`);

    setStudents(res.data);
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/students/${id}`);

      toast.success("Student Deleted");

      fetchStudents();
    } catch {
      toast.error("Failed to Delete");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600"></div>
      </div>
    );
  }

  return (
    <>
      <div className="flex bg-slate-100 min-h-screen">
        <Sidebar />
        <div className="flex-1">
          <Navbar />
          <div className="flex-1 p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-3xl font-bold">Students</h1>

                <p className="text-gray-500">Manage all students</p>
              </div>

              <Link
                to="/add-student"
                className="bg-blue-600 text-white px-5 py-3 rounded-xl shadow"
              >
                + Add Student
              </Link>
            </div>

            <div className="bg-white p-5 rounded-2xl shadow mb-6">
              <div className="flex gap-3">
                {/* <input
                type="text"
                placeholder="Search by name, email, roll number..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="flex-1 border rounded-lg px-4 py-3"
              /> */}

                <div className="relative">
                  <Search className="absolute left-3 top-3 text-gray-400" />

                  <input
                    type="text"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="Search students..."
                    className="w-full border rounded-lg p-3 pl-10"
                  />
                </div>

                <button
                  onClick={handleSearch}
                  className="bg-blue-600 text-white px-6 rounded-lg"
                >
                  Search
                </button>
              </div>
            </div>

            {/* ----------------------------------------- */}

            {students.length === 0 && (
              <div className="text-center py-10">
                <h3 className="text-xl font-semibold">No Students Found</h3>

                <p className="text-gray-500">Add your first student.</p>
              </div>
            )}

            {/* ------------------------------------------------------ */}

            <div className="bg-white rounded-2xl shadow overflow-hidden">
              <div className="p-5 border-b">
                <h2 className="font-semibold text-lg">
                  Total Students: {students.length}
                </h2>
              </div>

              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="p-4 text-left">Name</th>

                    <th className="p-4 text-left">Email</th>

                    <th className="p-4 text-left">Roll No</th>

                    <th className="p-4 text-left">Course</th>

                    <th className="p-4 text-left">Semester</th>

                    <th className="p-4 text-center">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {students.map((student) => (
                    <tr
                      key={student._id}
                      className="border-t hover:bg-slate-50"
                    >
                      {/* <td className="p-4">{student.name}</td> */}
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-600 rounded-full text-white flex items-center justify-center">
                            {student.name?.charAt(0).toUpperCase()}
                          </div>

                          <span>{student.name}</span>
                        </div>
                      </td>

                      <td className="p-4">{student.email}</td>

                      <td className="p-4">{student.rollNumber}</td>

                      <td className="p-4">{student.course}</td>

                      <td className="p-4">{student.semester}</td>

                      <td className="p-4 text-center">
                        <Link
                          to={`/edit-student/${student._id}`}
                          className="bg-green-600 text-white px-3 py-2 rounded-lg mr-2"
                        >
                          Edit
                        </Link>

                        <button
                          onClick={() => handleDelete(student._id)}
                          className="bg-red-600 text-white px-3 py-2 rounded-lg"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Students;
