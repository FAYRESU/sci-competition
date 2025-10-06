import React from "react";
import { useAuthContext } from "../context/AuthContext";

const UserProfile = () => {
  const { logout } = useAuthContext();
  const handleLogOut = () => {
    logout();
  };

  return (
    <div className="dropdown dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-ghost btn-circle avatar hover:ring-2 hover:ring-pink-400 transition"
      >
        <div className="w-10 rounded-full">
          <img
            alt="User Avatar"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
          />
        </div>
      </div>

      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-gradient-to-b from-pink-50 via-white to-red-50 rounded-box z-50 mt-3 w-52 p-2 shadow-lg border border-pink-200"
      >
        <li>
          <a
            href="/profile"
            className="justify-between text-red-600 hover:bg-pink-100 hover:text-pink-700 rounded"
          >
            Profile
            <span className="badge badge-sm bg-pink-300 text-red-600">New</span>
          </a>
        </li>
        <li>
          <a className="text-red-600 hover:bg-pink-100 hover:text-pink-700 rounded">
            Settings
          </a>
        </li>
        <li>
          <a
            onClick={handleLogOut}
            className="text-red-600 hover:bg-pink-200 hover:text-red-700 rounded cursor-pointer"
          >
            Logout
          </a>
        </li>
      </ul>
    </div>
  );
};

export default UserProfile;
