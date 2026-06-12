import Student from "../models/Student.js";

export const createStudent = async (req, res) => {
  const student = await Student.create(req.body);

  res.status(201).json(student);
};

export const getStudents = async (req, res) => {
  const students = await Student.find();
  res.json(students);
};

export const getStudentById = async (req, res) => {
  const student = await Student.findById(req.params.id);
  res.json(student);
};
export const updateStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!student) return res.status(404).json({ message: "Student not found" });

    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: "Server not found" });
  }
};

export const deleteStudent = async (req, res) => {
  const student = await Student.findByIdAndDelete(req.params.id, req);
  if (!student) return res.status(404).json({ message: "Student Not Found" });

  res.json({ message: "Student Deleted" });
};

export const searchStudent = async (req, res) => {
  try {
    const keyword = req.query.keyword;

    const students = await Student.find({
      $or: [
        {
          name: {
            $regex: keyword,
            $options: "i",
          },
        },
        {
          email: {
            $regex: keyword,
            $options: "i",
          },
        },
        {
          rollNumber: {
            $regex: keyword,
            $options: "i",
          },
        },
      ],
    });

    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
