import path from "path";
import express from 'express';
import { fileURLToPath } from 'url';
import multer from "multer";
import { dirname } from 'path';
import cors from 'cors';
import mongoose from "mongoose";


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(express.static('public'));

const storage = multer.diskStorage({
  destination: path.join(__dirname, "uploads"),   // ✅ safe path
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });


app.use(cors({
  origin: 'http://localhost:5173' // your Vue dev server
}));

mongoose.connect("mongodb://127.0.0.1:27017/portalDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch(err => console.error("❌ MongoDB connection error:", err));

const studentSchema = new mongoose.Schema({
  studentID: String,
  firstName: String,
  lastName: String,
  section: String,
  file: String
});

const adminSchema = new mongoose.Schema({
  adminID: String,
  firstName: String,
  lastName: String,
  department: String,
  file: String
});

const Student = mongoose.model("Student", studentSchema);
const Admin = mongoose.model("Admin", adminSchema);


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/pages/home.html');
});
app.get('/studentForm', (req, res) => {
  res.sendFile(__dirname + '/pages/studentForm.html');
});
app.get('/adminForm', (req, res) => {
  res.sendFile(__dirname + '/pages/adminForm.html');
});

// GET all students
app.get("/getStudent", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET all admins
app.get("/getAdmin", async (req, res) => {
  try {
    const admins = await Admin.find();
    res.json(admins);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CREATE student
app.post("/uploadStudent", upload.single("file"), async (req, res) => {
  try {
    const { studentID, firstName, lastName, section } = req.body;
    const newStudent = new Student({
      studentID,
      firstName,
      lastName,
      section,
      file: req.file ? `/uploads/${req.file.filename}` : null
    });
    await newStudent.save();
    console.log("✅ Student saved:", newStudent);
    res.json({ message: "✅ Student saved with file!", student: newStudent });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CREATE admin
app.post("/uploadAdmin", upload.single("file"), async (req, res) => {
  try {
    const { adminID, firstName, lastName, department } = req.body;
    const newAdmin = new Admin({
      adminID,
      firstName,
      lastName,
      department,
      file: req.file ? `/uploads/${req.file.filename}` : null
    });
    await newAdmin.save();
    console.log("✅ Admin saved:", newAdmin);
    res.json({ message: "✅ Admin saved with file!", admin: newAdmin });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE student
app.put("/students/:id", async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // return updated doc
    );
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE student
app.delete("/students/:id", async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: "Student deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// UPDATE admin
app.put("/admins/:id", async (req, res) => {
  try {
    const admin = await Admin.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // return updated document
    );
    res.json(admin);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE admin
app.delete("/admins/:id", async (req, res) => {
  try {
    await Admin.findByIdAndDelete(req.params.id);
    res.json({ message: "Admin deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


const server = app.listen(5000, () => {
  const port = server.address().port;
  console.log(`server running at http://localhost:${port}`);
});
