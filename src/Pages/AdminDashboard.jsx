import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const token = localStorage.getItem("token");
  const api = axios.create({
    baseURL: process.env.REACT_APP_API_BASE || "https://poizdedgebackend.onrender.com",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });

  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [courses, setCourses] = useState([]);

  // Course form
  const [courseForm, setCourseForm] = useState({
    title: "",
    lecture: "",
    category: "",
    Subjects: "",
    duration: "",
    description: "",
    price: "",
    imageBase64: "",
  });

  // Module form
  const [moduleForm, setModuleForm] = useState({
    moduleTitle: "",
    moduleDescription: "",
  });

  // Topic form
  const [topicForm, setTopicForm] = useState({
    topicName: "",
    video: { url: "", uploadedFile: "" },
    materials: [{ content: "", fileUrl: "" }],
  });

  // Quiz form
  const [quizForm, setQuizForm] = useState({
    question: "",
    options: ["", "", "", ""],
    correctAnswer: "",
  });

  // ---------------- Helpers ----------------
  const notify = (msg) => window.alert(msg);

  const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  // ---------------- Fetch Courses ----------------
  const fetchCourses = async () => {
    setLoading(true);
    try {
      const res = await api.get("/api/course");
      setCourses(res.data);
      setIsAdmin(true); // For simplicity; replace with actual check
    } catch (err) {
      console.error(err);
      setIsAdmin(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // ---------------- Course Handlers ----------------
  const handleCourseChange = (e) =>
    setCourseForm({ ...courseForm, [e.target.name]: e.target.value });

  const handleCourseImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const b64 = await fileToBase64(file);
    setCourseForm((f) => ({ ...f, imageBase64: b64 }));
  };

  const handleAddCourse = async (e) => {
    e.preventDefault();
    try {
      await api.post("/api/course/add", courseForm);
      notify("Course added!");
      fetchCourses();
      setCourseForm({
        title: "",
        lecture: "",
        category: "",
        Subjects: "",
        duration: "",
        description: "",
        price: "",
        imageBase64: "",
      });
    } catch (err) {
      console.error(err);
      notify("Failed to add course");
    }
  };

  // ---------------- Module Handlers ----------------
  const handleModuleChange = (e) =>
    setModuleForm({ ...moduleForm, [e.target.name]: e.target.value });

  const handleAddModule = async (courseId) => {
    try {
      await api.post(`/api/course/${courseId}/module/add`, moduleForm);
      notify("Module added!");
      fetchCourses();
      setModuleForm({ moduleTitle: "", moduleDescription: "" });
    } catch (err) {
      console.error(err);
      notify("Failed to add module");
    }
  };

  // ---------------- Topic Handlers ----------------
  const handleTopicChange = (e) =>
    setTopicForm({ ...topicForm, [e.target.name]: e.target.value });

  const handleTopicVideoUrlChange = (e) =>
    setTopicForm({
      ...topicForm,
      video: { ...topicForm.video, url: e.target.value },
    });

  const handleTopicVideoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const b64 = await fileToBase64(file);
    setTopicForm({ ...topicForm, video: { ...topicForm.video, uploadedFile: b64 } });
  };

  const handleTopicMaterialChange = (e, index) => {
    const newMaterials = [...topicForm.materials];
    newMaterials[index].content = e.target.value;
    setTopicForm({ ...topicForm, materials: newMaterials });
  };

  const handleTopicMaterialUpload = async (e, index) => {
    const file = e.target.files[0];
    if (!file) return;
    const b64 = await fileToBase64(file);
    const newMaterials = [...topicForm.materials];
    newMaterials[index].fileUrl = b64;
    setTopicForm({ ...topicForm, materials: newMaterials });
  };

  const handleAddTopic = async (courseId, moduleId) => {
    try {
      await api.post(`/api/course/${courseId}/module/${moduleId}/topic/add`, topicForm);
      notify("Topic added!");
      fetchCourses();
      setTopicForm({
        topicName: "",
        video: { url: "", uploadedFile: "" },
        materials: [{ content: "", fileUrl: "" }],
      });
    } catch (err) {
      console.error(err);
      notify("Failed to add topic");
    }
  };

  // ---------------- Quiz Handlers ----------------
  const handleQuizChange = (e, idx) => {
    const newOptions = [...quizForm.options];
    newOptions[idx] = e.target.value;
    setQuizForm({ ...quizForm, options: newOptions });
  };

  const handleAddQuiz = async (courseId, moduleId) => {
    try {
      await api.post(`/api/course/${courseId}/module/${moduleId}/quiz/add`, quizForm);
      notify("Quiz added!");
      fetchCourses();
      setQuizForm({ question: "", options: ["", "", "", ""], correctAnswer: "" });
    } catch (err) {
      console.error(err);
      notify("Failed to add quiz");
    }
  };

  if (loading) return <div className="p-10 text-center">Loading…</div>;
  if (!isAdmin)
    return <div className="p-10 text-center text-red-600 font-bold">Access Denied</div>;

  return (
    <div className="container p-6">
      <h1 className="text-3xl mb-6">Admin Dashboard</h1>

      {/* Add Course */}
      <div className="card p-4 mb-6">
        <h2>Add Course</h2>
        <form onSubmit={handleAddCourse}>
          <input
            className="form-control mb-2"
            placeholder="Title"
            name="title"
            value={courseForm.title}
            onChange={handleCourseChange}
          />
          <input
            className="form-control mb-2"
            placeholder="Lecture"
            name="lecture"
            value={courseForm.lecture}
            onChange={handleCourseChange}
          />
          <input
            className="form-control mb-2"
            placeholder="Category"
            name="category"
            value={courseForm.category}
            onChange={handleCourseChange}
          />
          <input
            className="form-control mb-2"
            placeholder="Subjects"
            name="Subjects"
            value={courseForm.Subjects}
            onChange={handleCourseChange}
          />
          <input
            className="form-control mb-2"
            placeholder="Duration"
            name="duration"
            value={courseForm.duration}
            onChange={handleCourseChange}
          />
          <textarea
            className="form-control mb-2"
            placeholder="Description"
            name="description"
            value={courseForm.description}
            onChange={handleCourseChange}
          />
          <input
            className="form-control mb-2"
            placeholder="Price"
            name="price"
            value={courseForm.price}
            onChange={handleCourseChange}
          />
          <input type="file" className="mb-2" accept="image/*" onChange={handleCourseImage} />
          <button className="btn btn-primary">Add Course</button>
        </form>
      </div>

      {/* Courses List */}
      {courses.map((course) => (
        <div key={course._id} className="card p-3 mb-4">
          <h3>{course.title}</h3>
          <p>{course.description}</p>
          <img src={course.imageBase64} alt="" style={{ width: 120, height: 80 }} />

          {/* Add Module */}
          <div className="mt-2">
            <h5>Add Module</h5>
            <input
              className="form-control mb-1"
              placeholder="Module Title"
              name="moduleTitle"
              value={moduleForm.moduleTitle}
              onChange={handleModuleChange}
            />
            <textarea
              className="form-control mb-1"
              placeholder="Module Description"
              name="moduleDescription"
              value={moduleForm.moduleDescription}
              onChange={handleModuleChange}
            />
            <button className="btn btn-secondary mb-2" onClick={() => handleAddModule(course.courseId)}>
              Add Module
            </button>
          </div>

          {/* Modules List */}
          {course.modules.map((mod) => (
            <div key={mod.moduleId} className="border p-2 mb-2">
              <strong>Module: {mod.moduleTitle}</strong>
              <p>{mod.moduleDescription}</p>

              {/* Add Topic */}
              <div className="mb-2">
                <h6>Add Topic</h6>
                <input
                  className="form-control mb-1"
                  placeholder="Topic Name"
                  name="topicName"
                  value={topicForm.topicName}
                  onChange={handleTopicChange}
                />
                <input
                  className="form-control mb-1"
                  placeholder="Video URL"
                  value={topicForm.video.url}
                  onChange={handleTopicVideoUrlChange}
                />
                <input type="file" className="mb-1" onChange={handleTopicVideoUpload} />
                {topicForm.materials.map((mat, idx) => (
                  <div key={idx}>
                    <textarea
                      className="form-control mb-1"
                      placeholder="Material content"
                      value={mat.content}
                      onChange={(e) => handleTopicMaterialChange(e, idx)}
                    />
                    <input type="file" className="mb-1" onChange={(e) => handleTopicMaterialUpload(e, idx)} />
                  </div>
                ))}
                <button className="btn btn-sm btn-info" onClick={() => handleAddTopic(course.courseId, mod.moduleId)}>
                  Add Topic
                </button>
              </div>

              {/* Add Quiz */}
              <div className="mb-2">
                <h6>Add Quiz</h6>
                <input
                  className="form-control mb-1"
                  placeholder="Question"
                  value={quizForm.question}
                  onChange={(e) => setQuizForm({ ...quizForm, question: e.target.value })}
                />
                {quizForm.options.map((opt, idx) => (
                  <input
                    key={idx}
                    className="form-control mb-1"
                    placeholder={`Option ${idx + 1}`}
                    value={opt}
                    onChange={(e) => handleQuizChange(e, idx)}
                  />
                ))}
                <input
                  className="form-control mb-1"
                  placeholder="Correct Answer"
                  value={quizForm.correctAnswer}
                  onChange={(e) => setQuizForm({ ...quizForm, correctAnswer: e.target.value })}
                />
                <button className="btn btn-sm btn-success" onClick={() => handleAddQuiz(course.courseId, mod.moduleId)}>
                  Add Quiz
                </button>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default AdminDashboard;
