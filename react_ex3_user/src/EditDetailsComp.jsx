import { useContext, useState } from "react";
import { UserContext } from "./UserContextProvider";
import { Mail, User, Cake, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function EditDetailsComp() {
  const navigate = useNavigate();

  const {
    setUser2edit,
    user2edit,
    setIsEditing,
    activeUser,
    setActiveUser,
    EditUser,
    isAdmin
  } = useContext(UserContext);

  const [userData, setUserData] = useState({
    id: user2edit.id,
    firstName: user2edit.firstName,
    lastName: user2edit.lastName,
    email: user2edit.email,
    username: user2edit.username,
    dateOfBirth: new Date(user2edit.dateOfBirth).toISOString().split("T")[0],
    street: user2edit.street,
    houseNumber: user2edit.houseNumber,
    city: user2edit.city,
    picture: user2edit.picture,
  });

  const handleInputChange = (identifier, value) => {
    setUserData((prev) => ({
      ...prev,
      [identifier]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserData((prev) => ({
          ...prev,
          picture: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    EditUser(userData);
    if (isAdmin) {
      navigate("/admin");
    } else {
      setActiveUser(userData);
      navigate("/profile");
    }
  };

  return (
    <div className="absolute top-0 left-0 w-full min-h-screen bg-gradient-to-br from-amber-700 to-amber-400 flex flex-col items-center justify-center">
      <h2 className="text-3xl font-bold text-gray-100 mb-8">Edit Profile</h2>
      <div className="max-w-3xl bg-gray-200 rounded-lg shadow-md p-8">
        <div className="flex gap-8">
          <div className="flex-grow space-y-6 text-left">
            <h1 className="text-2xl font-bold text-black mb-4">
              {userData.username}
            </h1>
            <div className="text-black space-y-4">
              <h2 className="font-semibold mb-2">Personal Information</h2>
              <div>
                <User className="inline w-5 h-5 mr-2" />
                <input
                  type="text"
                  value={userData.firstName}
                  onChange={(e) =>
                    handleInputChange("firstName", e.target.value)
                  }
                  className="rounded-md px-2 py-1 mr-2"
                  placeholder="First Name"
                />
                <input
                  type="text"
                  value={userData.lastName}
                  onChange={(e) =>
                    handleInputChange("lastName", e.target.value)
                  }
                  className="rounded-md px-2 py-1"
                  placeholder="Last Name"
                />
              </div>
              <div>
                <Mail className="inline w-5 h-5 mr-2" />
                <input
                  type="email"
                  value={userData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="rounded-md px-2 py-1 w-64"
                  placeholder="Email"
                />
              </div>
              <div>
                <Cake className="inline w-5 h-5 mr-2" />
                <input
                  type="date"
                  value={userData.dateOfBirth}
                  onChange={(e) =>
                    handleInputChange("dateOfBirth", e.target.value)
                  }
                  className="rounded-md px-2 py-1"
                />
              </div>
              <div className="flex items-center">
                <Home className="inline w-5 h-5 mr-2" />
                <input
                  type="text"
                  value={userData.street}
                  onChange={(e) => handleInputChange("street", e.target.value)}
                  className="rounded-md px-2 py-1 mr-2"
                  placeholder="Street"
                />
                <input
                  type="text"
                  value={userData.houseNumber}
                  onChange={(e) =>
                    handleInputChange("houseNumber", e.target.value)
                  }
                  className="rounded-md px-2 py-1 w-16 mr-2"
                  placeholder="No."
                />
                <input
                  type="text"
                  value={userData.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                  className="rounded-md px-2 py-1"
                  placeholder="City"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <button
                onClick={handleSave}
                className="flex w-full justify-center rounded-md bg-purple-950 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-purple-800"
              >
                Save Changes
              </button>
              <button
                onClick={() => {
                  isAdmin ? navigate("/admin") : navigate("/profile");
                }}
                className="flex w-full justify-center rounded-md bg-purple-950 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-purple-800"
              >
                Cancel
              </button>
            </div>
          </div>
          <div className="flex-shrink-0 space-y-4">
            {userData.picture && (
              <img
                src={userData.picture}
                alt="Profile"
                className="w-48 h-48 rounded-full object-cover"
              />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-purple-950 file:text-white hover:file:bg-purple-800"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
