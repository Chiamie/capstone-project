
import Sidebar from "../../components/Sidebar.jsx";
import Header from "../../components/Header.jsx";
import { Outlet } from "react-router-dom";

export default function AdminLayout({children}) {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-6 overflow-y-auto">{children}
          <Outlet />
        </main>
      </div>
    </div>
  );
}


// import Sidebar from "@/components/admin/Sidebar";
// import Header from "@/components/admin/Header";

// export default function AdminLayout({ children }) {
//   return (
//     <div className="flex h-screen bg-gray-50">
//       <Sidebar />
//       <div className="flex-1 flex flex-col">
//         <Header />
//         <main className="p-6 overflow-y-auto">{children}</main>
//       </div>
//     </div>
//   );
// }