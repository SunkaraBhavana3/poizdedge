import React, { useEffect, useState } from "react";

const StatsBar = () => {
  const accentLightBlue = "#3B82F6";

  const [stats, setStats] = useState({
    students: 0,
    teachers: 0,
    courses: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("https://poizdedgebackend.onrender.com/api/stats");
        const data = await res.json();

        if (data.success && data.stats) {
          setStats({
            students: data.stats.totalEnrollments || 0,
            teachers: data.stats.totalInstructors || 5,
            courses: data.stats.totalCourses || 0,
          });
        }
      } catch (err) {
        console.error("Error fetching stats:", err);
      }
    };
    fetchStats();
  }, []);

  const formatRounded = (num) => {
    if (num <= 0) return "0";
    if (num < 10) return `${num}`;
    const digits = Math.floor(Math.log10(num));
    const base = Math.pow(10, digits);
    const rounded = Math.floor(num / base) * base;
    return `${rounded}+`;
  };

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
      <p className="text-3xl md:text-4xl font-extrabold mb-1" style={{ color: accentLightBlue }}>
        {disablePlus ? `${count}${suffix}` : formatRounded(count)}
      </p>
    );
  };

  return (
    <div className="w-full bg-white py-12">
      {/* 🔹 Container: centered horizontally with max-width */}
      <div className="max-w-7xl mx-auto px-6">
        {/* 🔹 Flex/Grid: Centered items with a clean divider */}
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 lg:gap-24 text-center">
          
          <div className="flex flex-col items-center min-w-[120px]">
            <CountUp end={stats.students} />
            <p className="text-gray-500 font-medium text-sm uppercase tracking-wider">Students Enrolled</p>
          </div>

          <div className="flex flex-col items-center min-w-[120px]">
            <CountUp end={stats.teachers} />
            <p className="text-gray-500 font-medium text-sm uppercase tracking-wider">Expert Teachers</p>
          </div>

          <div className="flex flex-col items-center min-w-[120px]">
            <CountUp end={stats.courses} />
            <p className="text-gray-500 font-medium text-sm uppercase tracking-wider">Courses Available</p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default StatsBar;
