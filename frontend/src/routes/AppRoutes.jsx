import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import EditStudent from "../pages/EditStudent";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/edit/:id" element={<EditStudent />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;