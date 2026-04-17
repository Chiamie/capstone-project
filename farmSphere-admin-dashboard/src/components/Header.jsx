
import { Input } from "@/components/ui/input";

export default function Header() {
  return (
    <div className="flex justify-between items-center p-4 bg-white shadow">
      <h2 className="text-xl font-semibold">Admin Panel</h2>
      <Input placeholder="Search..." className="w-64" />
    </div>
  );
}

