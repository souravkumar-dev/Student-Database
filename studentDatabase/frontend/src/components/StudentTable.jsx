import { Link } from "react-router-dom";

const StudentTable = ({
  students,
  handleDelete,
}) => {
  return (
    <table className="w-full border">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Roll</th>
          <th>Course</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {students.map((student) => (
          <tr key={student._id}>
            <td>{student.name}</td>
            <td>{student.email}</td>
            <td>{student.rollNumber}</td>
            <td>{student.course}</td>

            <td>
              <Link
                to={`/edit-student/${student._id}`}
                className="bg-blue-500 text-white px-2 py-1 mr-2"
              >
                Edit
              </Link>

              <button
                onClick={() =>
                  handleDelete(student._id)
                }
                className="bg-red-500 text-white px-2 py-1"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default StudentTable;