import { useState } from "react";
import { createContext } from "react";

export const UserContext = createContext();

export default function UserContextProvider(props) {
  const [user, setuser] = useState([
    {
      id: 1,
      userName: "admin",
      password: "Admin1234!",
      picture:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4XD7_BX8gEe9eGvr0FktdJ5dYmgxtBDXE9WQN7cwOTea2FNJ-5ls3ckVvZKg4ApJTF3o&usqp=CAU",
      firstName: "Admin",
      lastName: "Admin",
      email: "admin@admin.co.il",
      birthDate: "12/12/2012",
      city: "Yavne",
      street: "yavne street",
      houseNum: "17",
    },
  ]);

  const AddUser = (
    userName,
    password,
    picture,
    firstName,
    lastName,
    email,
    birthDate,
    city,
    street,
    houseNum
  ) => {
    let newUser = [
      ...user,
      {
        userName,
        password,
        picture,
        firstName,
        lastName,
        email,
        birthDate,
        city,
        street,
        houseNum,
      },
    ];
    setuser(newUser);
  };

  return (
    <UserContext.Provider value={AddUser}>
      {props.children}
    </UserContext.Provider>
  );
}
