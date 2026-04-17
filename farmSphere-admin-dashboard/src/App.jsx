import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Layout
import AdminLayout from "./app/admin/layout";

// Pages
import Dashboard from "./app/admin/page";
import Users from "./app/admin/users/page";
import Estates from "./app/admin/estates/page";
import Crops from "./app/admin/crops/page";
import Investments from "./app/admin/investments/page";
import Marketplace from "./app/admin/marketplace/page";
import Tools from "./app/admin/tools/page";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect root → admin dashboard */}
        <Route path="/" element={<Navigate to="/admin" />} />

        {/* Admin Layout Wrapper */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="estates" element={<Estates />} />
          <Route path="crops" element={<Crops />} />
          <Route path="investments" element={<Investments />} />
          <Route path="marketplace" element={<Marketplace />} />
          <Route path="tools" element={<Tools />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;