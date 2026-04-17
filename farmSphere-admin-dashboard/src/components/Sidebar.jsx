

import { Home, Users, Leaf, Tractor, Wallet, ShoppingCart, Wrench } from "lucide-react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white shadow-lg p-5 space-y-6">
      <h1 className="text-2xl font-bold">FarmSphere</h1>
      <nav className="space-y-3 text-gray-600">
        <Link href="/admin"><p className="flex gap-2"><Home /> Dashboard</p></Link>
        <Link href="/admin/users"><p className="flex gap-2"><Users /> Users</p></Link>
        <Link href="/admin/estates"><p className="flex gap-2"><Leaf /> Estates</p></Link>
        <Link href="/admin/crops"><p className="flex gap-2"><Tractor /> Crops</p></Link>
        <Link href="/admin/tools"><p className="flex gap-2"><Wrench /> Tools</p></Link>
        <Link href="/admin/investments"><p className="flex gap-2"><Wallet /> Investments</p></Link>
        <Link href="/admin/marketplace"><p className="flex gap-2"><ShoppingCart /> Marketplace</p></Link>
      </nav>
    </aside>
  );
}