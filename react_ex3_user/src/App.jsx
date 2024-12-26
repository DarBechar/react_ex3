import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import UserContextProvider from "./UserContextProvider";
import LoginComp from "./LoginComp";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <UserContextProvider>
        <LoginComp></LoginComp>
      </UserContextProvider>
    </>
  );
}

export default App;
