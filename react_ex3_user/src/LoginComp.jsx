import { useNavigate } from "react-router-dom";

import { useContext } from "react";
import React, { useState } from "react";
import { UserContext } from "./UserContextProvider";

import SuccessPopup from "./SuccessPopup";

import Logo from "./assets/Logo.png";

export default function LoginComp(props) {
  const navigate = useNavigate();

  const { users, setActiveUser, setIsAdmin } = useContext(UserContext);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [userNotExists, setUserNotExists] = useState(false);
  const [wrongPassword, setWrongPassword] = useState(false);
  const [login, setlogin] = useState(false);

  function handleInputChange(identifier, value) {
    setUserNotExists(false);
    setWrongPassword(false);
    if (identifier === "username") {
      setUserName(value);
    }
    if (identifier === "password") {
      setPassword(value);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const foundUser = users.find((user) => user.username === userName);

    if (!foundUser) {
      setUserNotExists(true);
      return;
    }
    if (foundUser.password !== password) {
      setWrongPassword(true);
      return;
    }
    if (
      foundUser.username === "admin" &&
      foundUser.password === "ad12343211ad"
    ) {
      sessionStorage.setItem("activeUser", JSON.stringify(foundUser));
      setIsAdmin(true);
      navigate("/admin");
      return;
    } else {
      sessionStorage.setItem("activeUser", JSON.stringify(foundUser));
      setActiveUser(foundUser);
      setlogin(true);
    }
  };

  return (
    <div className="absolute top-0 left-0 w-full min-h-screen bg-gradient-to-br from-amber-700 to-amber-400">
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-32 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img alt="Logo" src={Logo} className="mx-auto h-20 w-auto" />
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="bg-gray-200 p-8 rounded-lg shadow-md">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="username"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Username
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    autoComplete="username"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    onChange={(event) =>
                      handleInputChange("username", event.target.value)
                    }
                  />
                  {userNotExists && (
                    <p className="mt-1 text-sm text-red-500">
                      Username not found.
                    </p>
                  )}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    autoComplete="current-password"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    onChange={(event) =>
                      handleInputChange("password", event.target.value)
                    }
                  />
                  {wrongPassword && (
                    <p className="mt-1 text-sm text-red-500">
                      Incorrect Password.
                    </p>
                  )}
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-purple-950 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-purple-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
              </div>
            </form>
            {login && (
              <SuccessPopup msg="." btn="Go to profile" nav="/profile" />
            )}

            <p className="mt-10 text-center text-sm/6 text-gray-500">
              Not a member?{" "}
              <a
                onClick={() => navigate("/register")}
                className="font-semibold text-purple-950 hover:text-purple-800 cursor-pointer"
              >
                Sign Up Here
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
