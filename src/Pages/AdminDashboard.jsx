// src/components/AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const COURSE_API = "https://poizdedgebackend.onrender.com/api/course";
const DEMO_API   = "https://poizdedgebackend.onrender.com/api/demo";

const AdminDashboard = () => {
  const token = localStorage.getItem("token");

  const courseApi = axios.create({
    baseURL: COURSE_API,
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });

  const demoApi = axios.create({
    baseURL: DEMO_API,
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });

  // ── Shared states ────────────────────────────────────────────────
  const [loading, setLoading]             = useState(true);
  const [courses, setCourses]             = useState([]);
  const [demos,   setDemos]               = useState([]);
  const [activeAdd, setActiveAdd]         = useState(null); // {courseId, moduleId, type: "topic"|"quiz"}

  // ── Course states ────────────────────────────────────────────────
  const emptyCourse = {
    title: "", lecture: "", category: "", Subjects: "",
    duration: "", description: "", price: "", imageBase64: ""
  };
  const [courseForm, setCourseForm]       = useState(emptyCourse);
  const [editingCourseId, setEditingCourseId] = useState(null);

  // ── Module states ────────────────────────────────────────────────
  const emptyModule = { moduleTitle: "", moduleDescription: "" };
  const [moduleForm, setModuleForm]       = useState(emptyModule);
  const [editingModule, setEditingModule] = useState(null);

  // ── Topic states ─────────────────────────────────────────────────
  const emptyTopic = {
    topicName: "",
    video: { url: "", uploadedFile: "" },
    materials: [{ content: "", fileUrl: "" }]
  };
  const [topicForm, setTopicForm]         = useState(emptyTopic);
  const [editingTopic, setEditingTopic]   = useState(null);

  // ── Quiz states ──────────────────────────────────────────────────
  const emptyQuiz = { question: "", options: ["","","",""], correctAnswer: "" };
  const [quizForm, setQuizForm]           = useState(emptyQuiz);
  const [editingQuiz, setEditingQuiz]     = useState(null);

  // ── Demo states ──────────────────────────────────────────────────
  const emptyDemo = { name: "", demoTime: "" };
  const [demoForm, setDemoForm]           = useState(emptyDemo);
  const [editingDemoId, setEditingDemoId] = useState(null);

  const notify = (msg) => window.alert(msg);

  const fileToBase64 = (file) =>
    new Promise((res, rej) => {
      const reader = new FileReader();
      reader.onload  = () => res(reader.result);
      reader.onerror = rej;
      reader.readAsDataURL(file);
    });

  // ── Data fetching ────────────────────────────────────────────────
  const loadCourses = async () => {
    try {
      const res = await courseApi.get("/");
      setCourses(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error(err);
      notify("Cannot load courses");
    }
  };

  const loadDemos = async () => {
    try {
      const res = await demoApi.get("/");
      setDemos(res.data || []);
    } catch (err) {
      console.error(err);
      notify("Cannot load demos");
    }
  };

  useEffect(() => {
    Promise.all([loadCourses(), loadDemos()]).finally(() => setLoading(false));
  }, []);

  // ──────────────────────────────────────────────
  // COURSE CRUD
  // ──────────────────────────────────────────────

  const handleCourseChange = (e) => {
    const { name, value } = e.target;
    setCourseForm(p => ({ ...p, [name]: value }));
  };

  const handleCourseImage = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const b64 = await fileToBase64(file);
      setCourseForm(p => ({ ...p, imageBase64: b64 }));
    } catch {
      notify("Image read failed");
    }
  };

  const saveCourse = async (e) => {
    e.preventDefault();
    try {
      if (editingCourseId) {
        await courseApi.put(`/${editingCourseId}`, courseForm);
        notify("Course updated");
      } else {
        await courseApi.post("/add", courseForm);
        notify("Course created");
      }
      setCourseForm(emptyCourse);
      setEditingCourseId(null);
      loadCourses();
    } catch (err) {
      notify(err.response?.data?.message || "Course save failed");
    }
  };

  const editCourse = (c) => {
    setCourseForm({ ...c });
    setEditingCourseId(c.courseId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const deleteCourse = async (id) => {
    if (!window.confirm("Delete course?")) return;
    try {
      await courseApi.delete(`/${id}`);
      notify("Course deleted");
      loadCourses();
    } catch {
      notify("Delete failed");
    }
  };

  // ──────────────────────────────────────────────
  // MODULE CRUD
  // ──────────────────────────────────────────────

  const handleModuleChange = (e) => {
    const { name, value } = e.target;
    setModuleForm(p => ({ ...p, [name]: value }));
  };

  const addModule = async (courseId) => {
    try {
      await courseApi.post(`/${courseId}/module/add`, moduleForm);
      notify("Module added");
      setModuleForm(emptyModule);
      loadCourses();
    } catch (err) {
      notify(err.response?.data?.message || "Module add failed");
    }
  };

  const editModule = (courseId, mod) => {
    setModuleForm({
      moduleTitle: mod.moduleTitle,
      moduleDescription: mod.moduleDescription
    });
    setEditingModule({ courseId, moduleId: mod.moduleId });
  };

  const saveModule = async () => {
    if (!editingModule) return;
    try {
      await courseApi.put(
        `/${editingModule.courseId}/module/${editingModule.moduleId}`,
        moduleForm
      );
      notify("Module updated");
      setEditingModule(null);
      setModuleForm(emptyModule);
      loadCourses();
    } catch (err) {
      notify(err.response?.data?.message || "Module update failed");
    }
  };

  const deleteModule = async (courseId, moduleId) => {
    if (!window.confirm("Delete module?")) return;
    try {
      await courseApi.delete(`/${courseId}/module/${moduleId}`);
      notify("Module deleted");
      loadCourses();
    } catch {
      notify("Module delete failed");
    }
  };

  // ──────────────────────────────────────────────
  // TOPIC CRUD
  // ──────────────────────────────────────────────

  const handleTopicChange = (e) => {
    const { name, value } = e.target;
    setTopicForm(p => ({ ...p, [name]: value }));
  };

  const handleTopicVideoUrl = (e) => {
    setTopicForm(p => ({
      ...p,
      video: { ...p.video, url: e.target.value }
    }));
  };

  const handleTopicVideoFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const b64 = await fileToBase64(file);
      setTopicForm(p => ({
        ...p,
        video: { ...p.video, uploadedFile: b64 }
      }));
    } catch {
      notify("Video upload failed");
    }
  };

  const addTopic = async (courseId, moduleId) => {
    try {
      await courseApi.post(`/${courseId}/module/${moduleId}/topic/add`, topicForm);
      notify("Topic added");
      setTopicForm(emptyTopic);
      setActiveAdd(null);
      loadCourses();
    } catch (err) {
      notify(err.response?.data?.message || "Topic add failed");
    }
  };

  const editTopic = (courseId, moduleId, topic) => {
    setTopicForm({ ...topic });
    setEditingTopic({ courseId, moduleId, topicId: topic.topicId });
    window.scrollTo(0, 0);
  };

  const saveTopic = async () => {
    if (!editingTopic) return;
    try {
      await courseApi.put(
        `/${editingTopic.courseId}/module/${editingTopic.moduleId}/topic/${editingTopic.topicId}`,
        topicForm
      );
      notify("Topic updated");
      setEditingTopic(null);
      setTopicForm(emptyTopic);
      loadCourses();
    } catch (err) {
      notify(err.response?.data?.message || "Topic update failed");
    }
  };

  const deleteTopic = async (courseId, moduleId, topicId) => {
    if (!window.confirm("Delete topic?")) return;
    try {
      await courseApi.delete(`/${courseId}/module/${moduleId}/topic/${topicId}`);
      notify("Topic deleted");
      loadCourses();
    } catch {
      notify("Topic delete failed");
    }
  };

  // ──────────────────────────────────────────────
  // QUIZ CRUD
  // ──────────────────────────────────────────────

  const handleQuizQuestion = (e) => {
    setQuizForm(p => ({ ...p, question: e.target.value }));
  };

  const handleQuizOption = (idx, value) => {
    setQuizForm(p => {
      const opts = [...p.options];
      opts[idx] = value;
      return { ...p, options: opts };
    });
  };

  const handleQuizCorrect = (e) => {
    setQuizForm(p => ({ ...p, correctAnswer: e.target.value }));
  };

  const addQuiz = async (courseId, moduleId) => {
    try {
      await courseApi.post(`/${courseId}/module/${moduleId}/quiz/add`, quizForm);
      notify("Quiz added");
      setQuizForm(emptyQuiz);
      setActiveAdd(null);
      loadCourses();
    } catch (err) {
      notify(err.response?.data?.message || "Quiz add failed");
    }
  };

  const editQuiz = (courseId, moduleId, q) => {
    setQuizForm({ ...q });
    setEditingQuiz({ courseId, moduleId, quizId: q._id });
    window.scrollTo(0, 0);
  };

  const saveQuiz = async () => {
    if (!editingQuiz) return;
    try {
      await courseApi.put(
        `/${editingQuiz.courseId}/module/${editingQuiz.moduleId}/quiz/${editingQuiz.quizId}`,
        quizForm
      );
      notify("Quiz updated");
      setEditingQuiz(null);
      setQuizForm(emptyQuiz);
      loadCourses();
    } catch (err) {
      notify(err.response?.data?.message || "Quiz update failed");
    }
  };

  const deleteQuiz = async (courseId, moduleId, quizId) => {
    if (!window.confirm("Delete quiz?")) return;
    try {
      await courseApi.delete(`/${courseId}/module/${moduleId}/quiz/${quizId}`);
      notify("Quiz deleted");
      loadCourses();
    } catch {
      notify("Quiz delete failed");
    }
  };

  // ──────────────────────────────────────────────
  // DEMO CRUD
  // ──────────────────────────────────────────────

  const handleDemoChange = (e) => {
    const { name, value } = e.target;
    setDemoForm(p => ({ ...p, [name]: value }));
  };

  const saveDemo = async (e) => {
    e.preventDefault();
    try {
      if (editingDemoId) {
        await demoApi.put(`/${editingDemoId}`, demoForm);
        notify("Demo updated");
      } else {
        await demoApi.post("/", demoForm);
        notify("Demo created");
      }
      setDemoForm(emptyDemo);
      setEditingDemoId(null);
      loadDemos();
    } catch (err) {
      notify(err.response?.data?.message || "Demo save failed");
    }
  };

  const editDemo = (d) => {
    setDemoForm({ name: d.name, demoTime: d.demoTime });
    setEditingDemoId(d._id);
  };

  const deleteDemo = async (id) => {
    if (!window.confirm("Delete demo?")) return;
    try {
      await demoApi.delete(`/${id}`);
      notify("Demo deleted");
      loadDemos();
    } catch {
      notify("Demo delete failed");
    }
  };

  if (loading) return <div className="p-12 text-center text-xl">Loading dashboard…</div>;

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <h1 className="text-4xl font-bold mb-10 text-center">Admin Dashboard</h1>

      {/* ── COURSE FORM ─────────────────────────────────────────────── */}
      <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
        <h2 className="text-2xl font-semibold mb-6">
          {editingCourseId ? "Edit Course" : "Add New Course"}
        </h2>
        <form onSubmit={saveCourse} className="grid gap-5 md:grid-cols-2">
          <input name="title" value={courseForm.title} onChange={handleCourseChange} placeholder="Title *" className="border p-3 rounded-lg" required />
          <input name="lecture" value={courseForm.lecture} onChange={handleCourseChange} placeholder="Instructor" className="border p-3 rounded-lg" required />
          <input name="category" value={courseForm.category} onChange={handleCourseChange} placeholder="Category" className="border p-3 rounded-lg" required />
          <input name="Subjects" value={courseForm.Subjects} onChange={handleCourseChange} placeholder="Subjects" className="border p-3 rounded-lg" required />
          <input name="duration" value={courseForm.duration} onChange={handleCourseChange} placeholder="Duration" className="border p-3 rounded-lg" required />
          <input name="price" type="number" value={courseForm.price} onChange={handleCourseChange} placeholder="Price (₹)" className="border p-3 rounded-lg" required />
          <textarea name="description" value={courseForm.description} onChange={handleCourseChange} placeholder="Description" className="border p-3 rounded-lg md:col-span-2" rows={4} required />
          <div className="md:col-span-2">
            <label className="block mb-2 font-medium">Cover Image</label>
            <input type="file" accept="image/*" onChange={handleCourseImage} className="mb-3" />
            {courseForm.imageBase64 && <img src={courseForm.imageBase64} alt="preview" className="max-h-48 rounded-lg object-cover" />}
          </div>
          <div className="md:col-span-2 flex gap-4">
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium">
              {editingCourseId ? "Update Course" : "Create Course"}
            </button>
            {editingCourseId && (
              <button type="button" className="bg-gray-500 hover:bg-gray-600 text-white px-8 py-3 rounded-lg font-medium" onClick={() => { setEditingCourseId(null); setCourseForm(emptyCourse); }}>
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* ── COURSES LIST ────────────────────────────────────────────── */}
      {courses.map(course => (
        <div key={course.courseId} className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold">{course.title}</h2>
              <p className="text-gray-600 mt-1">
                {course.lecture} • {course.category} • {course.Subjects} • ₹{course.price}
              </p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => editCourse(course)} className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded-lg">Edit</button>
              <button onClick={() => deleteCourse(course.courseId)} className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg">Delete</button>
            </div>
          </div>

          {/* Add / Edit Module */}
          <div className="bg-gray-50 p-5 rounded-lg mb-8">
            <h3 className="text-xl font-semibold mb-4">Modules</h3>
            <input
              value={moduleForm.moduleTitle}
              onChange={handleModuleChange}
              name="moduleTitle"
              placeholder="Module Title"
              className="border p-3 rounded-lg w-full mb-3"
            />
            <textarea
              value={moduleForm.moduleDescription}
              onChange={handleModuleChange}
              name="moduleDescription"
              placeholder="Module Description"
              className="border p-3 rounded-lg w-full mb-4"
              rows={2}
            />
            {editingModule ? (
              <div className="flex gap-4">
                <button onClick={saveModule} className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg">Save Module</button>
                <button onClick={() => setEditingModule(null)} className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg">Cancel</button>
              </div>
            ) : (
              <button onClick={() => addModule(course.courseId)} className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg">Add Module</button>
            )}
          </div>

          {/* Modules list */}
          {(course.modules || []).map(mod => (
            <div key={mod.moduleId} className="border rounded-lg p-6 mb-8 bg-gray-50">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h4 className="text-lg font-bold">{mod.moduleTitle}</h4>
                  <p className="text-gray-600">{mod.moduleDescription || "—"}</p>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => editModule(course.courseId, mod)} className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1.5 rounded text-sm">Edit</button>
                  <button onClick={() => deleteModule(course.courseId, mod.moduleId)} className="bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded text-sm">Delete</button>
                </div>
              </div>

              {/* Add Topic / Quiz buttons */}
              <div className="flex gap-4 mb-5">
                <button
                  onClick={() => setActiveAdd({ courseId: course.courseId, moduleId: mod.moduleId, type: "topic" })}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded"
                >
                  + Add Topic
                </button>
                <button
                  onClick={() => setActiveAdd({ courseId: course.courseId, moduleId: mod.moduleId, type: "quiz" })}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded"
                >
                  + Add Quiz
                </button>
              </div>

              {/* Add Topic form */}
              {activeAdd?.courseId === course.courseId && activeAdd?.moduleId === mod.moduleId && activeAdd?.type === "topic" && (
                <div className="bg-blue-50 p-6 rounded-lg border border-blue-200 mb-6">
                  <h5 className="font-bold mb-4">New Topic</h5>
                  <input value={topicForm.topicName} onChange={handleTopicChange} name="topicName" placeholder="Topic name *" className="border p-3 rounded w-full mb-3" />
                  <input value={topicForm.video.url} onChange={handleTopicVideoUrl} placeholder="YouTube URL (optional)" className="border p-3 rounded w-full mb-3" />
                  <div className="mb-4">
                    <label className="block text-sm mb-2">Video file (optional)</label>
                    <input type="file" accept="video/*" onChange={handleTopicVideoFile} />
                  </div>
                  <input
                    value={topicForm.materials[0]?.content || ""}
                    onChange={e => setTopicForm({...topicForm, materials: [{content: e.target.value, fileUrl: ""}]})}
                    placeholder="Material note / link"
                    className="border p-3 rounded w-full mb-4"
                  />
                  <div className="flex gap-4">
                    <button onClick={() => addTopic(course.courseId, mod.moduleId)} className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded">Save Topic</button>
                    <button onClick={() => setActiveAdd(null)} className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded">Cancel</button>
                  </div>
                </div>
              )}

              {/* Add Quiz form */}
              {activeAdd?.courseId === course.courseId && activeAdd?.moduleId === mod.moduleId && activeAdd?.type === "quiz" && (
                <div className="bg-purple-50 p-6 rounded-lg border border-purple-200 mb-6">
                  <h5 className="font-bold mb-4">New Quiz Question</h5>
                  <input value={quizForm.question} onChange={handleQuizQuestion} placeholder="Question *" className="border p-3 rounded w-full mb-3" />
                  {quizForm.options.map((opt, i) => (
                    <input
                      key={i}
                      value={opt}
                      onChange={e => handleQuizOption(i, e.target.value)}
                      placeholder={`Option ${i+1}`}
                      className="border p-3 rounded w-full mb-2"
                    />
                  ))}
                  <input
                    value={quizForm.correctAnswer}
                    onChange={handleQuizCorrect}
                    placeholder="Correct answer"
                    className="border p-3 rounded w-full mt-3 mb-4"
                  />
                  <div className="flex gap-4">
                    <button onClick={() => addQuiz(course.courseId, mod.moduleId)} className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded">Save Question</button>
                    <button onClick={() => setActiveAdd(null)} className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded">Cancel</button>
                  </div>
                </div>
              )}

              {/* Topics list */}
              <div className="mb-6">
                <h5 className="font-semibold mb-3">Topics</h5>
                {(mod.topics || []).map(t => (
                  <div key={t.topicId} className="bg-white border rounded p-4 mb-3">
                    <div className="flex justify-between">
                      <strong>{t.topicName}</strong>
                      <div className="flex gap-4">
                        <button onClick={() => editTopic(course.courseId, mod.moduleId, t)} className="text-blue-600 hover:underline">Edit</button>
                        <button onClick={() => deleteTopic(course.courseId, mod.moduleId, t.topicId)} className="text-red-600 hover:underline">Delete</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quizzes list */}
              <div>
                <h5 className="font-semibold mb-3">Quiz Questions</h5>
                {(mod.quiz || []).map(q => (
                  <div key={q._id} className="bg-white border rounded p-4 mb-3">
                    <div className="flex justify-between">
                      <strong>{q.question}</strong>
                      <div className="flex gap-4">
                        <button onClick={() => editQuiz(course.courseId, mod.moduleId, q)} className="text-blue-600 hover:underline">Edit</button>
                        <button onClick={() => deleteQuiz(course.courseId, mod.moduleId, q._id)} className="text-red-600 hover:underline">Delete</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}

      {/* ── DEMO SECTION ────────────────────────────────────────────── */}
      <div className="bg-white rounded-xl shadow-lg p-8 mt-12">
        <h2 className="text-2xl font-semibold mb-6 text-purple-700">Demo / Live Sessions</h2>

        <form onSubmit={saveDemo} className="grid gap-5 md:grid-cols-2 mb-10">
          <div>
            <label className="block text-sm font-medium mb-2">Demo Name *</label>
            <input name="name" value={demoForm.name} onChange={handleDemoChange} placeholder="e.g. Full-Stack Project Demo" className="border p-3 rounded-lg w-full" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Time Slot *</label>
            <input name="demoTime" value={demoForm.demoTime} onChange={handleDemoChange} placeholder="e.g. 4:00 PM – 6:00 PM" className="border p-3 rounded-lg w-full" required />
          </div>
          <div className="md:col-span-2 flex gap-4">
            <button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-medium">
              {editingDemoId ? "Update Demo" : "Add Demo"}
            </button>
            {editingDemoId && (
              <button type="button" className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-3 rounded-lg font-medium" onClick={() => { setEditingDemoId(null); setDemoForm(emptyDemo); }}>
                Cancel
              </button>
            )}
          </div>
        </form>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {demos.map(demo => (
            <div key={demo._id} className="border rounded-lg p-5 bg-gray-50">
              <h4 className="font-semibold text-lg mb-2">{demo.name}</h4>
              <p className="text-gray-700">Time: <strong>{demo.demoTime}</strong></p>
              <p className="text-sm text-gray-500 mt-3">
                Created {new Date(demo.createdAt).toLocaleDateString()}
              </p>
              <div className="mt-5 flex gap-4">
                <button onClick={() => editDemo(demo)} className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded text-sm">Edit</button>
                <button onClick={() => deleteDemo(demo._id)} className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded text-sm">Delete</button>
              </div>
            </div>
          ))}
        </div>

        {demos.length === 0 && (
          <p className="text-center text-gray-500 mt-8">No demo sessions added yet.</p>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;

