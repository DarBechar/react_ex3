import { useNavigate } from "react-router-dom";

import { useContext, useState } from "react";

import { UserContext } from "./UserContextProvider";

import { Mail, User, Cake, Home } from "lucide-react";

export default function ProfileComp() {
  const navigate = useNavigate();
  const { setUser2edit, setIsEditing, activeUser, setActiveUser } =
    useContext(UserContext);

  const handleLogout = () => {
    sessionStorage.clear();
    setActiveUser(null);
    navigate("/login");
  };

  const handleEdit = () => {
    setUser2edit(activeUser);
    navigate("/edit");
  };

  const handlePlay = () => {
    window.open("https://www.nytimes.com/games/wordle/index.html", "_blank");
  };

  return (
    <div className="absolute top-0 left-0 w-full min-h-screen bg-gradient-to-br from-amber-700 to-amber-400 flex flex-col items-center justify-center">
      <h2 className="text-3xl font-bold text-gray-100 mb-8">User Profile</h2>
      <div className="max-w-3xl bg-gray-200 rounded-lg shadow-md p-8">
        <div className="flex gap-8">
          <div className="flex-grow space-y-6 text-left">
            <h1 className="text-2xl font-bold text-black mb-4">
              {activeUser.username}
            </h1>

            <div className="text-black">
              <h2 className="font-semibold mb-2">Personal Information</h2>
              <p>
                {" "}
                <User className="inline w-5 h-5 mr-2" />
                {activeUser.firstName} {activeUser.lastName}
              </p>
              <p>
                <Mail className="inline w-5 h-5 mr-2" /> {activeUser.email}
              </p>
              <p>
                <Cake className="inline w-5 h-5 mr-2" />{" "}
                {activeUser.dateOfBirth}
              </p>
              <p>
                <Home className="inline w-5 h-5 mr-2" /> {activeUser.street}{" "}
                {activeUser.houseNumber}, {activeUser.city}
              </p>
            </div>

            <div className="flex gap-4">
              <button
                className="flex w-full justify-center rounded-md bg-purple-950 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-purple-800 "
                onClick={handlePlay}
              >
                Play
              </button>
              <button
                className="flex w-full justify-center rounded-md bg-purple-950 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-purple-800 "
                onClick={handleEdit}
              >
                Edit
              </button>
              <button
                className="flex w-full justify-center rounded-md bg-purple-950 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-purple-800"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>

          <div className="flex-shrink-0">
            {activeUser.picture && (
              <img
                src={activeUser.picture}
                alt="Profile"
                className="w-48 h-48 rounded-full object-cover"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
