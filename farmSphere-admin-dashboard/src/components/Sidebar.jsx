

// import { Home, Users, Leaf, Tractor, Wallet, ShoppingCart, Wrench } from "lucide-react";
// import { Link } from "react-router-dom";

// export default function Sidebar() {
//   return (
//     <aside className="w-64 bg-white shadow-lg p-5 space-y-6">
//       <h1 className="text-2xl font-bold">FarmSphere</h1>
//       <nav className="space-y-3 text-gray-600">
//         <Link to="/admin"><p className="flex gap-2"><Home /> Dashboard</p></Link>
//         <Link to="/admin/users"><p className="flex gap-2"><Users /> Users</p></Link>
//         <Link to="/admin/estates"><p className="flex gap-2"><Leaf /> Estates</p></Link>
//         <Link to="/admin/crops"><p className="flex gap-2"><Tractor /> Crops</p></Link>
//         <Link to="/admin/tools"><p className="flex gap-2"><Wrench /> Tools</p></Link>
//         <Link to="/admin/investments"><p className="flex gap-2"><Wallet /> Investments</p></Link>
//         <Link to="/admin/marketplace"><p className="flex gap-2"><ShoppingCart /> Marketplace</p></Link>
//       </nav>
//     </aside>
//   );
// }



import { Home, Users, Leaf, Tractor, Wallet, ShoppingCart, Wrench } from "lucide-react";
import { NavLink } from "react-router-dom";

const navItems = [
  { name: "Dashboard", icon: Home, path: "/admin" },
  { name: "Users", icon: Users, path: "/admin/users" },
  { name: "Estates", icon: Leaf, path: "/admin/estates" },
  { name: "Crop Production", icon: Tractor, path: "/admin/crops" },
  { name: "Tools & Resources", icon: Wrench, path: "/admin/tools" },
  { name: "Investments", icon: Wallet, path: "/admin/investments" },
  { name: "Marketplace", icon: ShoppingCart, path: "/admin/marketplace" },
];

export default function Sidebar() {
  return (
    <aside className="w-72 bg-white border-r flex flex-col justify-between">
      {/* Top Section */}
      <div>
        {/* Logo */}
        <div className="p-6 border-b">
          <h1 className="text-2xl font-bold tracking-tight">FarmSphere</h1>
          <p className="text-sm text-gray-500">Admin Panel</p>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {navItems.map((item) => (
          <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all
                ${isActive
                  ? "bg-black text-white shadow"
                  : "text-gray-600 hover:bg-gray-100"}`
              }
            >
              <item.icon size={18} />
              {item.name}
            </NavLink>
          ))}
        </nav>
      </div>
      {/* Bottom Section */}
      <div className="p-4 border-t">
        <div className="bg-gray-100 rounded-xl p-3">
          <p className="text-sm font-medium">Admin</p>
          <p className="text-xs text-gray-500">admin@farmsphere.com</p>
        </div>
      </div>
    </aside>
  );
}
