import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import UserContextProvider from "./UserContextProvider";
import LoginComp from "./LoginComp";
import RegisterComp from "./RegisterComp";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="">
      <UserContextProvider>
        {/* <LoginComp></LoginComp> */}
        <RegisterComp />
      </UserContextProvider>
    </div>
  );
}

export default App;
