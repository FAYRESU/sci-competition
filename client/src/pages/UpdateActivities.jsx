import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import ActivitiesService from "../services/activity.sevice";
import Swal from "sweetalert2";

const Update = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [activity, setActivity] = useState({
    name: "",
    description: "",
    type: "",
    level: "",
    team_size: 1,
    date: "",
    location: "",
    reg_open: "",
    reg_close: "",
    contact_name: "",
    contact_phone: "",
    contact_email: "",
    status: "draft",
  });

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const res = await ActivitiesService.getActivitiesById(id);
        if (res.status === 200) setActivity(res.data);
        else
          Swal.fire({
            title: "Activity Not Found",
            icon: "error",
            text: `No activity found with ID: ${id}`,
          });
      } catch (err) {
        Swal.fire({
          title: "Error fetching activity",
          icon: "error",
          text: err.message,
        });
      }
    };
    fetchActivity();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setActivity({ ...activity, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await ActivitiesService.UpdateActivities(id, activity);
      if (res.status === 200) {
        Swal.fire({
          title: "Activity Updated",
          icon: "success",
          text: "Successfully updated activity.",
        }).then(() => navigate("/"));
      }
    } catch (err) {
      Swal.fire({
        title: "Update Failed",
        icon: "error",
        text: err.message,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-white to-red-50 px-4 pt-24">
      <div className="card w-full max-w-3xl shadow-2xl bg-white rounded-3xl border border-pink-200 p-10">
        <h1 className="text-3xl font-extrabold text-center text-red-600 mb-2">
          ✏️ แก้ไขกิจกรรม
        </h1>
        <p className="text-center text-gray-500 mb-8">
          ปรับปรุงข้อมูลกิจกรรมให้ครบถ้วน
        </p>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Name */}
          <div className="form-control">
            <label className="label font-semibold text-red-600">ชื่อกิจกรรม</label>
            <input
              type="text"
              name="name"
              placeholder="ชื่อกิจกรรม"
              className="input input-bordered rounded-xl focus:ring-2 focus:ring-pink-400 transition-shadow duration-300 shadow-sm"
              value={activity.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Description */}
          <div className="form-control">
            <label className="label font-semibold text-red-600">รายละเอียดกิจกรรม</label>
            <textarea
              name="description"
              placeholder="รายละเอียด"
              className="textarea textarea-bordered rounded-xl focus:ring-2 focus:ring-pink-400 transition-shadow duration-300 shadow-sm"
              value={activity.description}
              onChange={handleChange}
              required
            />
          </div>

          {/* Type & Level */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label font-semibold text-red-600">ประเภทกิจกรรม</label>
              <input
                type="text"
                name="type"
                className="input input-bordered rounded-xl focus:ring-2 focus:ring-pink-400 transition-shadow duration-300 shadow-sm"
                value={activity.type}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-control">
              <label className="label font-semibold text-red-600">ระดับ</label>
              <input
                type="text"
                name="level"
                className="input input-bordered rounded-xl focus:ring-2 focus:ring-pink-400 transition-shadow duration-300 shadow-sm"
                value={activity.level}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Team & Date */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label font-semibold text-red-600">จำนวนสมาชิกต่อทีม</label>
              <input
                type="number"
                name="team_size"
                min={1}
                className="input input-bordered rounded-xl focus:ring-2 focus:ring-pink-400 transition-shadow duration-300 shadow-sm"
                value={activity.team_size}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-control">
              <label className="label font-semibold text-red-600">วันที่แข่งขัน</label>
              <input
                type="date"
                name="date"
                className="input input-bordered rounded-xl focus:ring-2 focus:ring-pink-400 transition-shadow duration-300 shadow-sm"
                value={activity.date}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Location */}
          <div className="form-control">
            <label className="label font-semibold text-red-600">สถานที่จัดกิจกรรม</label>
            <input
              type="text"
              name="location"
              className="input input-bordered rounded-xl focus:ring-2 focus:ring-pink-400 transition-shadow duration-300 shadow-sm"
              value={activity.location}
              onChange={handleChange}
              required
            />
          </div>

          {/* Registration */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label font-semibold text-red-600">เปิดรับสมัคร</label>
              <input
                type="datetime-local"
                name="reg_open"
                className="input input-bordered rounded-xl focus:ring-2 focus:ring-pink-400 transition-shadow duration-300 shadow-sm"
                value={activity.reg_open}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-control">
              <label className="label font-semibold text-red-600">ปิดรับสมัคร</label>
              <input
                type="datetime-local"
                name="reg_close"
                className="input input-bordered rounded-xl focus:ring-2 focus:ring-pink-400 transition-shadow duration-300 shadow-sm"
                value={activity.reg_close}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Contact */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="form-control">
              <label className="label font-semibold text-red-600">ผู้ติดต่อ</label>
              <input
                type="text"
                name="contact_name"
                className="input input-bordered rounded-xl focus:ring-2 focus:ring-pink-400 transition-shadow duration-300 shadow-sm"
                value={activity.contact_name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-control">
              <label className="label font-semibold text-red-600">เบอร์โทร</label>
              <input
                type="text"
                name="contact_phone"
                className="input input-bordered rounded-xl focus:ring-2 focus:ring-pink-400 transition-shadow duration-300 shadow-sm"
                value={activity.contact_phone}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-control">
              <label className="label font-semibold text-red-600">อีเมล</label>
              <input
                type="email"
                name="contact_email"
                className="input input-bordered rounded-xl focus:ring-2 focus:ring-pink-400 transition-shadow duration-300 shadow-sm"
                value={activity.contact_email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-center gap-4 mt-6">
            <button
              type="submit"
              className="btn w-32 bg-red-500 hover:bg-pink-400 text-white font-bold rounded-xl shadow-lg transition-transform transform hover:scale-105"
            >
              ✅ แก้ไข
            </button>
            <button
              type="button"
              className="btn w-32 btn-outline btn-error rounded-xl shadow-lg hover:scale-105 transition-transform"
              onClick={() => navigate("/")}
            >
              ❌ ยกเลิก
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Update;
