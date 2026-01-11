import React, { useEffect, useState } from "react";

const StatsBar = () => {
  const accentLightBlue = "#3B82F6";

  const [stats, setStats] = useState({
    students: 0,
    teachers: 0,
    courses: 0,
    successRate: 97,
  });

  // 🔹 Fetch stats from backend
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("https://poizdedgebackend.onrender.com/api/stats");
        const data = await res.json();

        if (data.success && data.stats) {
          setStats({
            students: data.stats.totalEnrollments || 0,
            teachers: data.stats.totalInstructors || 2,
            courses: data.stats.totalCourses || 0,
            successRate: 97,
          });
        }
      } catch (err) {
        console.error("Error fetching stats:", err);
      }
    };

    fetchStats();
  }, []);

  // 🔹 Rounded "+" formatter (used only where needed)
  const formatRounded = (num) => {
    if (num <= 0) return "0";
    if (num < 10) return `${num}`; // no plus for single digit

    const digits = Math.floor(Math.log10(num));
    const base = Math.pow(10, digits);
    const rounded = Math.floor(num / base) * base;

    return `${rounded}+`;
  };

  // 🔹 CountUp animation
  const CountUp = ({ end, disablePlus = false, suffix = "" }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      let start = 0;
      const duration = 1500;
      const increment = end / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          clearInterval(timer);
          setCount(end);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }, [end]);

    return (
      <p
        className="text-3xl font-extrabold mb-1"
        style={{ color: accentLightBlue }}
      >
        {disablePlus ? `${count}${suffix}` : formatRounded(count)}
      </p>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 bg-white">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center border-b border-gray-200 pb-10">
        
        <div>
          <CountUp end={stats.students} />
          <p className="text-gray-600 text-sm">Students Enrolled</p>
        </div>

        <div>
          <CountUp end={stats.teachers} />
          <p className="text-gray-600 text-sm">Expert Teachers</p>
        </div>

        <div>
          <CountUp end={stats.courses} />
          <p className="text-gray-600 text-sm">Courses Available</p>
        </div>

        {/* ✅ SUCCESS RATE — NO PLUS */}
        <div>
          <CountUp end={stats.successRate} disablePlus suffix="%" />
          <p className="text-gray-600 text-sm">Success Rate</p>
        </div>

      </div>
    </div>
  );
};

export default StatsBar;
