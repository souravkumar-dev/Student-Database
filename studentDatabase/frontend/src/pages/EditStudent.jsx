import {
    useState,
    useEffect,
    useContext,
  } from "react";
  
  import {
    useParams,
    useNavigate,
  } from "react-router-dom";
  
  import axios from "axios";
  import { AuthContext } from "../context/AuthContext";
  
  const EditStudent = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { token } = useContext(AuthContext);
  
    const [student, setStudent] =
      useState({
        name: "",
        email: "",
        rollNumber: "",
        course: "",
        semester: "",
      });
  
    useEffect(() => {
      fetchStudent();
    }, []);
  
    const fetchStudent = async () => {
      const res = await axios.get(
        `http://localhost:5000/api/students/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      setStudent(res.data);
    };
  
    const handleChange = (e) => {
      setStudent({
        ...student,
        [e.target.name]:
          e.target.value,
      });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      await axios.put(
        `http://localhost:5000/api/students/${id}`,
        student,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      navigate("/students");
    };
  
    return (
      <div className="max-w-lg mx-auto mt-10 bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-5">
          Edit Student
        </h2>
  
        <form onSubmit={handleSubmit}>
          <input
            name="name"
            value={student.name}
            onChange={handleChange}
            className="border p-2 w-full mb-3"
          />
  
          <input
            name="email"
            value={student.email}
            onChange={handleChange}
            className="border p-2 w-full mb-3"
          />
  
          <input
            name="rollNumber"
            value={student.rollNumber}
            onChange={handleChange}
            className="border p-2 w-full mb-3"
          />
  
          <input
            name="course"
            value={student.course}
            onChange={handleChange}
            className="border p-2 w-full mb-3"
          />
  
          <input
            name="semester"
            value={student.semester}
            onChange={handleChange}
            className="border p-2 w-full mb-3"
          />
  
          <button className="bg-blue-600 text-white px-5 py-2 rounded">
            Update Student
          </button>
        </form>
      </div>
    );
  };
  
  export default EditStudent;