import React, { useState } from 'react';
import { Search } from 'lucide-react';

const subjects = [
  "Clinical Research",
  "Pharmacovigilance",
  "Clinical Data Management",
  "Regulatory Affairs",
  "Clinical SAS Programming"
];

const App = () => {
  const [selectedSubject, setSelectedSubject] = useState("");
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState([]);

  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 3000);
  };

  const handleFilterChange = (type, value) => {
    if (type === 'subject') {
      setSelectedSubject(value);
      console.log(`Filter changed: Subject set to ${value}`);
    }
  };

  // 🔥 REAL BACKEND CALL
  const handleSearchSafe = async () => {
    if (!selectedSubject) {
      showMessage("Please select a Subject/Program to search.");
      return;
    }

    try {
      setLoading(true);
      showMessage(`Searching for courses in: ${selectedSubject}`);

      const response = await fetch(
        `https://poizdedgebackend.onrender.com/api/courses/search?query=${selectedSubject}`
      );

      const data = await response.json();

      if (data.success) {
        setCourses(data.results);
      } else {
        showMessage("Error fetching courses");
      }
    } catch (error) {
      showMessage("Server unreachable. Check backend.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 p-4 flex items-start justify-center pt-10 font-sans">
      <div className="w-full max-w-4xl">

        <h1 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
          Course Discovery
        </h1>

        {/* Filter Bar */}
        <div className="filter-bar-container bg-white shadow-xl rounded-2xl p-6 border border-gray-100">
          <div className="filter-bar-content flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-4 w-full">

            <span className="text-lg font-semibold text-indigo-700 min-w-max">
              Find Your Perfect Course:
            </span>

            <select
              className="filter-dropdown flex-grow appearance-none bg-gray-50 border border-gray-300 text-gray-700 py-3 my-3 mx-3 px-4 pr-8 rounded-xl leading-tight focus:outline-none focus:bg-white focus:border-indigo-500 transition duration-150 shadow-inner w-full md:w-auto"
              onChange={(e) => handleFilterChange('subject', e.target.value)}
              value={selectedSubject}
            >
              <option value="" disabled>Filter by Subject/Program</option>
              {subjects.map(subject => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>

            <button
              className="filter-button bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-[1.02] flex items-center justify-center space-x-2 w-full md:w-auto min-w-[120px]"
              onClick={handleSearchSafe}
            >
              <Search size={18} />
              <span>Search</span>
            </button>
          </div>
        </div>

        {/* Loading Spinner */}
        {loading && (
          <div className="mt-6 text-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="text-indigo-600 mt-2 font-medium">Searching...</p>
          </div>
        )}

        {/* Search Results */}
        {!loading && courses.length > 0 && (
          <div className="mt-8 bg-white p-6 rounded-xl shadow-lg border">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Results Found ({courses.length})
            </h2>

            <ul className="space-y-4">
              {courses.map((course) => (
                <li
                  key={course._id}
                  className="p-4 bg-gray-50 rounded-lg border hover:shadow-md transition"
                >
                  <h3 className="text-lg font-semibold text-indigo-700">
                    {course.title}
                  </h3>
                  <p className="text-gray-600">{course.category}</p>
                  <p className="text-sm text-gray-500 mt-1">{course.description}</p>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* No Results */}
        {!loading && courses.length === 0 && selectedSubject && (
          <p className="text-center mt-8 text-gray-500 font-medium">
            No courses found for "{selectedSubject}"
          </p>
        )}

        {/* Toast Message */}
        {message && (
          <div className="fixed bottom-5 right-5 p-4 bg-indigo-500 text-white rounded-xl shadow-2xl transition-opacity duration-500 z-50 font-medium">
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
