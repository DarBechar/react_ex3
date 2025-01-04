import { useState } from "react";
import { createContext } from "react";

export const UserContext = createContext();

export default function UserContextProvider(props) {
  const [isEditing, setIsEditing] = useState(false);
  const [activeUser, setActiveUser] = useState(null);
  const [user2edit, setUser2edit] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [users, setusers] = useState([
    {
      id: 1,
      firstName: "Admin",
      lastName: "Admin",
      email: "admin@admin.co.il",
      username: "admin",
      password: "ad12343211ad",
      dateOfBirth: "12/12/2012",

      picture:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4XD7_BX8gEe9eGvr0FktdJ5dYmgxtBDXE9WQN7cwOTea2FNJ-5ls3ckVvZKg4ApJTF3o&usqp=CAU",

      city: "Yavne",
      street: "yavne street",
      houseNumber: "17",
    },
    {
      id: 2,
      firstName: "Dar",
      lastName: "Bechar",
      email: "Dar@gmail.com",
      username: "DarBe",
      password: "Dar123!",
      dateOfBirth: "12/12/2012",

      picture:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4XD7_BX8gEe9eGvr0FktdJ5dYmgxtBDXE9WQN7cwOTea2FNJ-5ls3ckVvZKg4ApJTF3o&usqp=CAU",

      city: "Olesh",
      street: "נוף שדות",
      houseNumber: "8",
    },
  ]);

  const AddUser = (user) => {
    let newUser = [
      ...users,
      {
        id: users.length + 1,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        username: user.username,
        password: user.password,
        dateOfBirth: user.dateOfBirth,
        picture: user.picture,
        city: user.city,
        street: user.street,
        houseNumber: user.houseNumber,
      },
    ];
    setusers(newUser);
    localStorage.setItem("users", JSON.stringify(newUser));
  };

  const EditUser = (user) => {
    const tempUsers = users.filter((u) => u.id !== user.id);
    let newUsersList = [...tempUsers, user];
    sessionStorage.clear();
    sessionStorage.setItem("activeUser", JSON.stringify(user));
    setusers(newUsersList);
    localStorage.clear();
    localStorage.setItem("users", JSON.stringify(newUsersList));
  };

  const removeUser = (userId) => {
    setusers(users.filter((u) => u.id !== userId));
  };

  return (
    <UserContext.Provider
      value={{
        users,
        AddUser,
        setusers,
        setIsEditing,
        isEditing,
        activeUser,
        setActiveUser,
        EditUser,
        setUser2edit,
        user2edit,
        isAdmin,
        setIsAdmin,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}
