// src/components/AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

// Local backend base URL
const API_BASE = "http://localhost:5000/api/course";

const AdminDashboard = () => {
  const token = localStorage.getItem("token");
  const api = axios.create({
    baseURL: API_BASE,
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });

  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);

  // ---------------- COURSE STATE ----------------
  const emptyCourseForm = {
    title: "",
    lecture: "",
    category: "",
    Subjects: "",
    duration: "",
    description: "",
    price: "",
    imageBase64: "",
  };
  const [courseForm, setCourseForm] = useState(emptyCourseForm);
  const [editingCourseId, setEditingCourseId] = useState(null);

  // ---------------- MODULE STATE ----------------
  const emptyModuleForm = { moduleTitle: "", moduleDescription: "" };
  const [moduleForm, setModuleForm] = useState(emptyModuleForm);
  const [editingModule, setEditingModule] = useState(null);

  // ---------------- TOPIC STATE ----------------
  const emptyTopicForm = {
    topicName: "",
    video: { url: "", uploadedFile: "" },
    materials: [{ content: "", fileUrl: "" }],
  };
  const [topicForm, setTopicForm] = useState(emptyTopicForm);
  const [editingTopic, setEditingTopic] = useState(null);

  // ---------------- QUIZ STATE ----------------
  const emptyQuizForm = { question: "", options: ["", "", "", ""], correctAnswer: "" };
  const [quizForm, setQuizForm] = useState(emptyQuizForm);
  const [editingQuiz, setEditingQuiz] = useState(null);

  // ---------------- HELPERS ----------------
  const notify = (msg) => window.alert(msg);

  const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const res = await api.get("/");
      setCourses(Array.isArray(res.data) ? res.data : res.data?.data || []);
    } catch (err) {
      console.error(err);
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // ---------------- COURSE ACTIONS ----------------
  const handleCourseChange = (e) => {
    const { name, value } = e.target;
    setCourseForm((s) => ({ ...s, [name]: value }));
  };

  const handleCourseImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const b64 = await fileToBase64(file);
    setCourseForm((s) => ({ ...s, imageBase64: b64 }));
  };

  const handleAddCourse = async (e) => {
    e.preventDefault();
    try {
      await api.post("/add", courseForm);
      notify("Course added!");
      setCourseForm(emptyCourseForm);
      fetchCourses();
    } catch (err) {
      console.error(err);
      notify("Failed to add course");
    }
  };

  const startEditCourse = (course) => {
    setCourseForm({ ...course });
    setEditingCourseId(course.courseId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSaveCourseEdit = async (e) => {
    e.preventDefault();
    if (!editingCourseId) return notify("No course selected");
    try {
      await api.put(`/${editingCourseId}`, courseForm);
      notify("Course updated!");
      setEditingCourseId(null);
      setCourseForm(emptyCourseForm);
      fetchCourses();
    } catch (err) {
      console.error(err);
      notify("Failed to update course");
    }
  };

  const handleDeleteCourse = async (courseId) => {
    if (!window.confirm("Delete this course?")) return;
    try {
      await api.delete(`/${courseId}`);
      notify("Course deleted");
      fetchCourses();
    } catch (err) {
      console.error(err);
      notify("Failed to delete course");
    }
  };

  // ---------------- MODULE ACTIONS ----------------
  const handleModuleChange = (e) => {
    const { name, value } = e.target;
    setModuleForm((s) => ({ ...s, [name]: value }));
  };

  const handleAddModule = async (courseId) => {
    try {
      await api.post(`/${courseId}/module/add`, moduleForm);
      notify("Module added!");
      setModuleForm(emptyModuleForm);
      fetchCourses();
    } catch (err) {
      console.error(err);
      notify("Failed to add module");
    }
  };

  const startEditModule = (courseId, mod) => {
    setModuleForm({ moduleTitle: mod.moduleTitle, moduleDescription: mod.moduleDescription });
    setEditingModule({ courseId, moduleId: mod._id });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSaveModuleEdit = async () => {
    if (!editingModule) return notify("No module selected");
    try {
      await api.put(`/${editingModule.courseId}/module/${editingModule.moduleId}`, moduleForm);
      notify("Module updated!");
      setEditingModule(null);
      setModuleForm(emptyModuleForm);
      fetchCourses();
    } catch (err) {
      console.error(err);
      notify("Failed to update module");
    }
  };

  const handleDeleteModule = async (courseId, moduleId) => {
    if (!window.confirm("Delete this module?")) return;
    try {
      await api.delete(`/${courseId}/module/${moduleId}`);
      notify("Module deleted!");
      fetchCourses();
    } catch (err) {
      console.error(err);
      notify("Failed to delete module");
    }
  };

  // ---------------- TOPIC ACTIONS ----------------
  const handleTopicChange = (e) => {
    const { name, value } = e.target;
    setTopicForm((s) => ({ ...s, [name]: value }));
  };

  const handleTopicVideoUrlChange = (e) => setTopicForm((s) => ({ ...s, video: { ...s.video, url: e.target.value } }));

  const handleTopicVideoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const b64 = await fileToBase64(file);
    setTopicForm((s) => ({ ...s, video: { ...s.video, uploadedFile: b64 } }));
  };

  const handleAddTopic = async (courseId, moduleObj) => {
    const moduleIdForAdd = moduleObj._id;
    try {
      await api.post(`/${courseId}/module/${moduleIdForAdd}/topic/add`, topicForm);
      notify("Topic added!");
      setTopicForm(emptyTopicForm);
      fetchCourses();
    } catch (err) {
      console.error(err);
      notify("Failed to add topic");
    }
  };

  const startEditTopic = (courseId, moduleObj, topic) => {
    setTopicForm({ ...topic });
    setEditingTopic({ courseId, moduleId: moduleObj._id, topicId: topic._id });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSaveTopicEdit = async () => {
    if (!editingTopic) return notify("No topic selected");
    try {
      const courseRes = await api.get(`/${editingTopic.courseId}`);
      const course = courseRes.data;
      const modules = course.modules.map((m) => {
        if (m._id !== editingTopic.moduleId) return m;
        const topics = (m.topics || []).map((t) =>
          t._id === editingTopic.topicId ? { ...topicForm } : t
        );
        return { ...m, topics };
      });
      await api.put(`/${editingTopic.courseId}`, { modules });
      notify("Topic updated!");
      setEditingTopic(null);
      setTopicForm(emptyTopicForm);
      fetchCourses();
    } catch (err) {
      console.error(err);
      notify("Failed to update topic");
    }
  };

  const handleDeleteTopic = async (courseId, moduleObj, topicId) => {
    if (!window.confirm("Delete this topic?")) return;
    try {
      const courseRes = await api.get(`/${courseId}`);
      const course = courseRes.data;
      const modules = course.modules.map((m) => {
        if (m._id !== moduleObj._id) return m;
        const topics = (m.topics || []).filter((t) => t._id !== topicId);
        return { ...m, topics };
      });
      await api.put(`/${courseId}`, { modules });
      notify("Topic deleted!");
      fetchCourses();
    } catch (err) {
      console.error(err);
      notify("Failed to delete topic");
    }
  };

  // ---------------- QUIZ ACTIONS ----------------
  const handleQuizChange = (e, idx) => {
    const newOptions = [...quizForm.options];
    newOptions[idx] = e.target.value;
    setQuizForm((s) => ({ ...s, options: newOptions }));
  };

  const handleAddQuiz = async (courseId, moduleObj) => {
    const moduleIdForAdd = moduleObj._id;
    try {
      await api.post(`/${courseId}/module/${moduleIdForAdd}/quiz/add`, quizForm);
      notify("Quiz added!");
      setQuizForm(emptyQuizForm);
      fetchCourses();
    } catch (err) {
      console.error(err);
      notify("Failed to add quiz");
    }
  };

  const startEditQuiz = (courseId, moduleObj, quizObj) => {
    setQuizForm({ ...quizObj });
    setEditingQuiz({ courseId, moduleId: moduleObj._id, quizId: quizObj._id });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSaveQuizEdit = async () => {
    if (!editingQuiz) return notify("No quiz selected");
    try {
      const courseRes = await api.get(`/${editingQuiz.courseId}`);
      const course = courseRes.data;
      const modules = course.modules.map((m) => {
        if (m._id !== editingQuiz.moduleId) return m;
        const quizArr = (m.quiz || []).map((q) =>
          q._id === editingQuiz.quizId ? { ...quizForm } : q
        );
        return { ...m, quiz: quizArr };
      });
      await api.put(`/${editingQuiz.courseId}`, { modules });
      notify("Quiz updated!");
      setEditingQuiz(null);
      setQuizForm(emptyQuizForm);
      fetchCourses();
    } catch (err) {
      console.error(err);
      notify("Failed to update quiz");
    }
  };

  const handleDeleteQuiz = async (courseId, moduleObj, quizObj) => {
    if (!window.confirm("Delete this quiz?")) return;
    try {
      const courseRes = await api.get(`/${courseId}`);
      const course = courseRes.data;
      const modules = course.modules.map((m) => {
        if (m._id !== moduleObj._id) return m;
        const quizArr = (m.quiz || []).filter((q) => q._id !== quizObj._id);
        return { ...m, quiz: quizArr };
      });
      await api.put(`/${courseId}`, { modules });
      notify("Quiz deleted!");
      fetchCourses();
    } catch (err) {
      console.error(err);
      notify("Failed to delete quiz");
    }
  };

  // ---------------- RENDER ----------------
  if (loading) return <div className="p-10 text-center">Loading…</div>;

  return (
    <div className="container p-6">
      <h1 className="text-3xl mb-6">Admin Dashboard</h1>
      <div className="card p-4 mb-6">
        <h2>{editingCourseId ? "Edit Course" : "Add Course"}</h2>
        <form onSubmit={editingCourseId ? handleSaveCourseEdit : handleAddCourse}>
          <input className="form-control mb-2" placeholder="Title" name="title" value={courseForm.title} onChange={handleCourseChange} />
          <input className="form-control mb-2" placeholder="Lecture" name="lecture" value={courseForm.lecture} onChange={handleCourseChange} />
          <input className="form-control mb-2" placeholder="Category" name="category" value={courseForm.category} onChange={handleCourseChange} />
          <input className="form-control mb-2" placeholder="Subjects" name="Subjects" value={courseForm.Subjects} onChange={handleCourseChange} />
          <input className="form-control mb-2" placeholder="Duration" name="duration" value={courseForm.duration} onChange={handleCourseChange} />
          <textarea className="form-control mb-2" placeholder="Description" name="description" value={courseForm.description} onChange={handleCourseChange} />
          <input className="form-control mb-2" placeholder="Price" name="price" value={courseForm.price} onChange={handleCourseChange} />
          <input type="file" className="mb-2" accept="image/*" onChange={handleCourseImage} />
          <div className="flex gap-2">
            <button className="btn btn-primary" type="submit">{editingCourseId ? "Save Course" : "Add Course"}</button>
            {editingCourseId && <button type="button" className="btn btn-secondary" onClick={() => { setEditingCourseId(null); setCourseForm(emptyCourseForm); }}>Cancel</button>}
          </div>
        </form>
      </div>

      {/* Courses List */}
      {courses.map((course) => (
        <div key={course.courseId} className="card p-3 mb-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-semibold">{course.title}</h3>
              <p className="text-sm">Lecture: {course.lecture} | Category: {course.category} | Subjects: {course.Subjects}</p>
              <p className="text-sm">{course.description}</p>
              {course.imageBase64 && <img src={course.imageBase64} alt={course.title} style={{ width: 140, height: 90, objectFit: "cover", marginTop: 8 }} />}
            </div>
            <div className="flex gap-2">
              <button className="btn btn-warning btn-sm" onClick={() => startEditCourse(course)}>Edit</button>
              <button className="btn btn-danger btn-sm" onClick={() => handleDeleteCourse(course.courseId)}>Delete</button>
            </div>
          </div>

          {/* Modules */}
          <div className="mt-3 p-2 border rounded">
            <h5>Modules</h5>
            <input className="form-control mb-1" placeholder="Module Title" name="moduleTitle" value={moduleForm.moduleTitle} onChange={handleModuleChange} />
            <textarea className="form-control mb-1" placeholder="Module Description" name="moduleDescription" value={moduleForm.moduleDescription} onChange={handleModuleChange} />
            <div className="flex gap-2 mb-2">
              {editingModule && editingModule.courseId === course.courseId ? (
                <>
                  <button className="btn btn-primary btn-sm" onClick={handleSaveModuleEdit}>Save Module</button>
                  <button className="btn btn-secondary btn-sm" onClick={() => { setEditingModule(null); setModuleForm(emptyModuleForm); }}>Cancel</button>
                </>
              ) : (
                <button className="btn btn-success btn-sm" onClick={() => handleAddModule(course.courseId)}>Add Module</button>
              )}
            </div>

            {(course.modules || []).map((mod) => (
              <div key={mod.moduleId + mod._id} className="p-2 border rounded mb-2">
                <div className="flex justify-between">
                  <div>
                    <strong>{mod.moduleTitle}</strong>
                    <p className="text-sm">{mod.moduleDescription}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="btn btn-warning btn-sm" onClick={() => startEditModule(course.courseId, mod)}>Edit</button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDeleteModule(course.courseId, mod._id)}>Delete</button>
                  </div>
                </div>

                {/* Topics */}
                {(mod.topics || []).map((topic) => (
                  <div key={topic.topicId} className="p-2 border rounded mt-2">
                    <strong>{topic.topicName}</strong>
                    <div>Video: {topic.video?.url || topic.video?.uploadedFile ? "Uploaded" : "—"}</div>
                    <div>Materials: {topic.materials?.length || 0}</div>
                    <div className="flex gap-2 mt-1">
                      <button className="btn btn-warning btn-sm" onClick={() => startEditTopic(course.courseId, mod, topic)}>Edit</button>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDeleteTopic(course.courseId, mod, topic.topicId)}>Delete</button>
                    </div>
                  </div>
                ))}

                {/* Quizzes */}
                {(mod.quiz || []).map((q) => (
                  <div key={q._id || q.question} className="p-2 border rounded mt-2">
                    <strong>{q.question}</strong>
                    <div>Options: {q.options?.join(" | ")}</div>
                    <div>Correct Answer: {q.correctAnswer}</div>
                    <div className="flex gap-2 mt-1">
                      <button className="btn btn-warning btn-sm" onClick={() => startEditQuiz(course.courseId, mod, q)}>Edit</button>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDeleteQuiz(course.courseId, mod, q)}>Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      ))}

    </div>
  );
};

export default AdminDashboard;