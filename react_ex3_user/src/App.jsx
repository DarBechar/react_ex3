import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./UserContextProvider";
import LoginComp from "./LoginComp";
import RegisterComp from "./RegisterComp";
import ProfileComp from "./ProfileComp";
import EditProfileComp from "./EditDetailsComp";
import AdminProfile from "./AdminProfile";

function App() {
  const { isEditing } = useContext(UserContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginComp />} />
        <Route path="/register" element={<RegisterComp />} />
        <Route path="/profile" element={<ProfileComp />} />
        <Route path="/edit" element={<EditProfileComp />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
        <Route path="/admin" element={<AdminProfile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
