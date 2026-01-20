import React from "react";
import { useAuthContext } from "../context/AuthContext";
import UserProfile from "./UserProfile";

const NavBar = () => {
  const { user } = useAuthContext();

  const menuItems = [
    { name: "News", url: "/news" },
    { name: "Activities", url: "/activities" },
    { name: "Add new activity", url: "/add-activity" },
    { name: "About Us", url: "/" },
  ];

  return (
    <div className="navbar bg-gradient-to-r from-pink-50 via-white to-red-50 shadow-md px-4 py-2">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-pink-50 rounded-box mt-3 w-52 p-2 shadow-lg border border-pink-200"
          >
            {menuItems.map((item) => (
              <li key={item.name}>
                <a
                  href={item.url}
                  className="text-red-600 hover:text-pink-500 hover:bg-pink-100 rounded"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <a className="btn btn-ghost text-2xl text-red-600 font-extrabold" href="/">
          SCI Competition
        </a>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {menuItems.map((item) => (
            <li key={item.name}>
              <a
                href={item.url}
                className="text-red-600 font-semibold hover:text-pink-500"
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="navbar-end space-x-2">
        {user ? (
          <UserProfile />
        ) : (
          <div className="space-x-2">
            <a
              href="/register"
              className="btn btn-outline text-red-600 border-red-300 hover:bg-pink-200 hover:border-pink-300"
            >
              Register
            </a>
            <a
              href="/login"
              className="btn btn-outline text-pink-600 border-pink-300 hover:bg-red-200 hover:border-red-400"
            >
              Login
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
