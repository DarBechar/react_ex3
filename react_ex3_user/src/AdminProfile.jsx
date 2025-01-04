import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContextProvider";

export default function AdminProfile() {
  const { setUser2edit, setIsAdmin } = useContext(UserContext);
  const navigate = useNavigate();
  const [localUsers, setLocalUsers] = useState([]);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
    setLocalUsers(storedUsers);
  }, []);

  const handleUpdate = (userId) => {
    const user2Update = localUsers.find((user) => user.id === userId);
    setUser2edit(user2Update);
    console.log(user2Update);
    navigate("/edit");
  };
  const handleDeleteUser = (userId) => {
    const updatedUsers = localUsers.filter((user) => user.id !== userId);
    setLocalUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  return (
    <div className="absolute top-0 left-0 w-full min-h-screen bg-gradient-to-br from-amber-700 to-amber-400">
      <div className="bg-gradient-to-tl from-purple-900 to-purple-800 p-4 flex justify-between items-center shadow-lg">
        <h2 className="text-xl font-bold text-white">Admin Dashboard</h2>
        <button
          onClick={() => {
            sessionStorage.clear();
            setIsAdmin(false);
            navigate("/login");
          }}
          className="text-white hover:text-gray-200"
        >
          Logout
        </button>
      </div>

      <div className="flex min-h-full flex-1 flex-col px-6 py-12 lg:px-8">
        <div className="bg-gray-200 rounded-lg shadow-md p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-gray-300">
                  <th className="py-3 px-4 text-left">Photo</th>
                  <th className="py-3 px-4 text-left">Username</th>
                  <th className="py-3 px-4 text-left">Name</th>
                  <th className="py-3 px-4 text-left">Email</th>
                  <th className="py-3 px-4 text-left">Birth Date</th>
                  <th className="py-3 px-4 text-left">Address</th>
                  <th className="py-3 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {localUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-gray-200 hover:bg-gray-100"
                  >
                    <td className="py-3 px-4">
                      <img
                        src={user.picture}
                        alt={user.username}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    </td>
                    <td className="py-3 px-4">{user.username}</td>
                    <td className="py-3 px-4">
                      {user.firstName} {user.lastName}
                    </td>
                    <td className="py-3 px-4">{user.email}</td>
                    <td className="py-3 px-4">{user.dateOfBirth}</td>
                    <td className="py-3 px-4">
                      {user.street} {user.houseNumber}, {user.city}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleUpdate(user.id)}
                          className="flex justify-center rounded-md bg-purple-950 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-purple-800"
                        >
                          Update
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="flex justify-center rounded-md bg-purple-950 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-purple-800"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
