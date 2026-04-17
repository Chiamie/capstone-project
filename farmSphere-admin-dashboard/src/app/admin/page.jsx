

import StatCard from "../../components/StatCard.jsx";
import { Users, Leaf, Tractor, Wallet } from "lucide-react";

export default function Dashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Overview</h1>

      <div className="grid grid-cols-4 gap-4">
        <StatCard icon={<Users />} title="Users" value="1,200" />
        <StatCard icon={<Leaf />} title="Estates" value="30" />
        <StatCard icon={<Tractor />} title="Crops" value="120" />
        <StatCard icon={<Wallet />} title="Revenue" value="₦5M" />
      </div>
    </div>
  );

}


