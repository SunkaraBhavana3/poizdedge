import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';

const App = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [hasSearched, setHasSearched] = useState(false); // track if search happened

  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 3000);
  };

  // Fetch all courses from backend
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const res = await fetch('https://poizdedgebackend.onrender.com/api/course');
        const data = await res.json();
        setCourses(data); // assuming API returns array of courses
      } catch (err) {
        console.error(err);
        showMessage('Failed to fetch courses');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleSearch = () => {
    setHasSearched(true);

    if (!selectedCourse) {
      showMessage('Please select a course to search.');
      setFilteredCourses([]);
      return;
    }

    const results = courses.filter(
      (c) => c.title.toLowerCase() === selectedCourse.toLowerCase()
    );

    setFilteredCourses(results);

    if (results.length === 0) showMessage('No courses found');
  };

  return (
    <div className="bg-gray-50 p-4 flex items-start justify-center pt-10 font-sans">
      <div className="w-full max-w-4xl">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
          Course Discovery
        </h1>

        {/* Filter Bar */}
        <div className="filter-bar-container bg-white shadow-xl rounded-2xl p-6 border border-gray-100">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-4 w-full">

            <span className="text-lg font-semibold text-indigo-700 min-w-max">
              Find Your Perfect Course:
            </span>

            <select
              className="flex-grow appearance-none bg-gray-50 border border-gray-300 text-gray-700 py-3 my-3 mx-3 px-4 pr-8 rounded-xl leading-tight focus:outline-none focus:bg-white focus:border-indigo-500 transition duration-150 shadow-inner w-full md:w-auto"
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
            >
              <option value="" disabled>Select a Course</option>
              {courses.map((course) => (
                <option key={course.courseId} value={course.title}>{course.title}</option>
              ))}
            </select>

            <button
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-[1.02] flex items-center justify-center space-x-2 w-full md:w-auto min-w-[120px]"
              onClick={handleSearch}
            >
              <Search size={18} />
              <span>Search</span>
            </button>

          </div>
        </div>

        {/* Search Results */}
        {!loading && hasSearched && filteredCourses.length > 0 && (
          <div className="mt-8 bg-white p-6 rounded-xl shadow-lg border">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Results Found ({filteredCourses.length})
            </h2>
            <ul className="space-y-4">
              {filteredCourses.map((course) => (
                <li
                  key={course.courseId}
                  className="p-4 bg-gray-50 rounded-lg border hover:shadow-md transition"
                >
                  <h3 className="text-lg font-semibold text-indigo-700">{course.title}</h3>
                  <p className="text-gray-600">{course.category}</p>
                  <p className="text-sm text-gray-500 mt-1">{course.description}</p>
                  <div className="flex gap-2 mt-2">
                    <Link
                      to={`/enrollment/${course.courseId}`}
                      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                    >
                      Enroll Now
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* No results */}
        {!loading && hasSearched && filteredCourses.length === 0 && selectedCourse && (
          <p className="text-center mt-8 text-gray-500 font-medium">
            No courses found for "{selectedCourse}"
          </p>
        )}

        {/* Toast message */}
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
