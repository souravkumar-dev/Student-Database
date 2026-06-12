// import { useState, useContext } from "react";
// import axios from "axios";
// import { AuthContext } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";

// const AddStudent = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     rollNumber: "",
//     course: "",
//     semester: "",
//   });

//   const { token } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]:
//         e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     await axios.post(
//       "http://localhost:5000/api/students",
//       formData,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );

//     navigate("/students");
//   };

//   return (
//     <div className="max-w-lg mx-auto mt-10 bg-white p-6 rounded shadow">
//       <h2 className="text-2xl font-bold mb-5">
//         Add Student
//       </h2>

//       <form onSubmit={handleSubmit}>
//         <input
//           name="name"
//           placeholder="Name"
//           className="border p-2 w-full mb-3"
//           onChange={handleChange}
//         />

//         <input
//           name="email"
//           placeholder="Email"
//           className="border p-2 w-full mb-3"
//           onChange={handleChange}
//         />

//         <input
//           name="rollNumber"
//           placeholder="Roll Number"
//           className="border p-2 w-full mb-3"
//           onChange={handleChange}
//         />

//         <input
//           name="course"
//           placeholder="Course"
//           className="border p-2 w-full mb-3"
//           onChange={handleChange}
//         />

//         <input
//           name="semester"
//           placeholder="Semester"
//           className="border p-2 w-full mb-3"
//           onChange={handleChange}
//         />

//         <button className="bg-green-600 text-white px-5 py-2 rounded">
//           Add Student
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddStudent;

//-------------------------------------------

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import API from "../services/api";
import toast from "react-hot-toast";

const AddStudent = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rollNumber: "",
    course: "",
    semester: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // await API.post("/students", formData);

    // navigate("/students");

    try {
      await API.post("/students", formData);

      toast.success("Student Added Successfully");

      navigate("/students");
    } catch {
      toast.error("Failed to Add Student");
    }
  };

  return (
    <>
      <div className="flex bg-slate-100 min-h-screen">
        <Sidebar />
        <div className="flex-1">
          <Navbar />
          <div className="flex-1 p-6">
            <div className="mb-6">
              <h1 className="text-3xl font-bold">Add Student</h1>

              <p className="text-gray-500">Create a new student record</p>
            </div>

            <div className="bg-white rounded-2xl shadow p-8 max-w-4xl">
              <form
                onSubmit={handleSubmit}
                className="grid md:grid-cols-2 gap-5"
              >
                <div>
                  <label className="block mb-2 font-medium">Student Name</label>

                  <input
                    type="text"
                    name="name"
                    required
                    onChange={handleChange}
                    className="w-full border rounded-lg p-3"
                  />
                </div>

                <div>
                  <label className="block mb-2 font-medium">Email</label>

                  <input
                    type="email"
                    name="email"
                    required
                    onChange={handleChange}
                    className="w-full border rounded-lg p-3"
                  />
                </div>

                <div>
                  <label className="block mb-2 font-medium">Roll Number</label>

                  <input
                    type="text"
                    name="rollNumber"
                    required
                    onChange={handleChange}
                    className="w-full border rounded-lg p-3"
                  />
                </div>

                <div>
                  <label className="block mb-2 font-medium">Course</label>

                  <input
                    type="text"
                    name="course"
                    required
                    onChange={handleChange}
                    className="w-full border rounded-lg p-3"
                  />
                </div>

                <div>
                  <label className="block mb-2 font-medium">Semester</label>

                  <input
                    type="number"
                    name="semester"
                    required
                    onChange={handleChange}
                    className="w-full border rounded-lg p-3"
                  />
                </div>

                <div className="md:col-span-2">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-8 py-3 rounded-xl shadow hover:bg-blue-700"
                  >
                    Add Student
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddStudent;
