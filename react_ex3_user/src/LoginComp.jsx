import { useContext } from "react";
import React, { useState } from "react";

import { UserContext } from "./UserContextProvider";
import { User, Lock, Mail, MapPin, Home, Calendar } from "lucide-react";

export default function LoginComp(props) {
  const { AddUser } = useContext(UserContext);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#6571E9] p-4">
      <div className="flex w-full max-w-5xl rounded-2xl bg-white shadow-2xl">
        {/* Left Side - Image */}
        <div className="hidden w-1/2 items-center justify-center bg-[#6571E9] p-12 lg:flex">
          <img
            src="/api/placeholder/400/320"
            alt="Nike Shoe"
            className="max-w-md transform hover:scale-105 transition-transform"
          />
        </div>

        {/* Right Side - Form */}
        <div className="w-full p-8 lg:w-1/2">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-gray-800">Create Account</h2>
          </div>

          <form className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <input
                type="text"
                placeholder="First Name"
                className="w-full rounded-lg border border-gray-200 p-3"
              />
              <input
                type="text"
                placeholder="Last Name"
                className="w-full rounded-lg border border-gray-200 p-3"
              />
            </div>

            <div className="relative">
              <User className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Username"
                className="w-full rounded-lg border border-gray-200 p-3 pl-10"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
              <input
                type="password"
                placeholder="Password"
                className="w-full rounded-lg border border-gray-200 p-3 pl-10"
              />
            </div>

            <div className="relative">
              <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
              <input
                type="email"
                placeholder="Email"
                className="w-full rounded-lg border border-gray-200 p-3 pl-10"
              />
            </div>

            <div className="relative">
              <Calendar className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
              <input
                type="date"
                className="w-full rounded-lg border border-gray-200 p-3 pl-10"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="relative">
                <MapPin className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="City"
                  className="w-full rounded-lg border border-gray-200 p-3 pl-10"
                />
              </div>
              <div className="relative">
                <Home className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Street"
                  className="w-full rounded-lg border border-gray-200 p-3 pl-10"
                />
              </div>
            </div>

            <input
              type="text"
              placeholder="House Number"
              className="w-full rounded-lg border border-gray-200 p-3"
            />
            <input
              type="file"
              accept="image/*"
              className="w-full rounded-lg border border-gray-200 p-3"
            />

            <button
              type="submit"
              className="w-full rounded-lg bg-[#6571E9] p-3 text-white hover:bg-[#4F5BD5]"
            >
              Create Account
            </button>

            <div className="mt-6 text-center">
              <span className="text-sm text-gray-600">
                Already have an account?{" "}
              </span>
              <a href="#" className="text-sm text-[#6571E9] hover:underline">
                Sign in
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
