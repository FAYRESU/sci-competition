import React, { useEffect, useState } from "react";
import { Link } from "react-router";

const News = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const res = await fetch("/db.json"); //เอามาจากไฟล์ db.json ที่อยู่โฟล์เดอร์ server และ client
        const data = await res.json();
        setActivities(data); 
      } catch (error) {
        console.error("Error fetching activities:", error);
      }
    };

    fetchActivities();
  }, []);

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("th-TH", { year: "numeric", month: "long", day: "numeric" });
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <h1 className="text-3xl font-extrabold text-red-600 text-center mb-8">
        📰 ข่าวสารกิจกรรม
      </h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="card bg-white shadow-lg rounded-2xl overflow-hidden hover:scale-105 transition-transform duration-300"
          >
            <div className="p-4">
              <h2 className="text-xl font-bold text-red-600 mb-2">
                {activity.name}
              </h2>
              <p className="text-gray-600 text-sm mb-2">{activity.description}</p>
              <div className="flex justify-between items-center text-gray-400 text-xs">
                <span>📅 {formatDate(activity.date)}</span>
                <span>👤 {activity.contact_name}</span>
              </div>
              <Link
                to={`/activities/${activity.id}`}
                className="inline-block mt-3 text-red-500 hover:text-pink-400 font-semibold"
              >
                อ่านต่อ...
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;
