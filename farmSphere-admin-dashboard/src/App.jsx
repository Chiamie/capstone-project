import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./app/admin/page.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}