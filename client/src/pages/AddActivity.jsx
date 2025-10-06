import { useState } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import ActivityService from "../services/activity.service";

const AddActivity = () => {
  const [activity, setActivity] = useState({
    name: "",
    description: "",
    type: "",
    level: "",
    team_size: 1,
    date: Date.now(),
    location: "",
    reg_open: Date.now(),
    reg_close: Date.now(),
    contact_name: "",
    contact_phone: "",
    contact_email: "",
    status: "draft",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setActivity({ ...activity, [name]: value });
  };

  const resetForm = () => {
    setActivity({
      name: "",
      description: "",
      type: "",
      level: "",
      team_size: 1,
      date: Date.now(),
      location: "",
      reg_open: Date.now(),
      reg_close: Date.now(),
      contact_name: "",
      contact_phone: "",
      contact_email: "",
      status: "draft",
    });
  };

  const handleSubmit = async () => {
    try {
      const newActivity = await ActivityService.createActivity(activity);
      if (newActivity.status === 201) {
        Swal.fire({
          title: "Add new activity",
          text: "Add new activity successfully!",
          icon: "success",
        }).then(() => {
          resetForm();
          navigate("/activities");
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Add new activity",
        text: error.message,
        icon: "error",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-red-50 flex flex-col items-center py-10 px-4">
      <h1 className="text-4xl font-extrabold text-red-600 mb-6">
        Add New Activity
      </h1>

      <div className="w-full max-w-lg space-y-4">
        {[
          { name: "name", placeholder: "Activity Name" },
          { name: "description", placeholder: "Description" },
          { name: "type", placeholder: "Type" },
          { name: "level", placeholder: "Level" },
          { name: "team_size", placeholder: "Team Size", type: "number" },
          { name: "date", placeholder: "Date", type: "date" },
          { name: "location", placeholder: "Location" },
          { name: "reg_open", placeholder: "Register Open Date", type: "date" },
          { name: "reg_close", placeholder: "Register Close Date", type: "date" },
          { name: "contact_name", placeholder: "Contact Name" },
          { name: "contact_phone", placeholder: "Phone Number" },
          { name: "contact_email", placeholder: "Email" },
          { name: "status", placeholder: "Status" },
        ].map((field) => (
          <label key={field.name} className="input-group w-full">
            <span className="bg-red-200 text-red-800 font-semibold">
              {field.placeholder}
            </span>
            <input
              type={field.type || "text"}
              placeholder={field.placeholder}
              name={field.name}
              value={activity[field.name]}
              onChange={handleChange}
              className="input input-bordered input-sm flex-grow focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400"
            />
          </label>
        ))}

        <button
          className="btn btn-outline btn-error w-full mt-4 hover:bg-pink-400 hover:text-white transition-colors"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default AddActivity;
