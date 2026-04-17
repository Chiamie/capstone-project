// export default function EstatesPage() {
//   return <h1 className="text-2xl font-bold">Estates Management</h1>;
// }


import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const mockEstates = [
  { id: 1, name: "Green Valley Estate", location: "Kaduna", size: "50 hectares", status: "Active" },
  { id: 2, name: "Sunrise Farm", location: "Oyo", size: "30 hectares", status: "Inactive" },
];

export default function EstatesPage() {
  const [estates, setEstates] = useState(mockEstates);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({ name: "", location: "", size: "" });

  const filtered = estates.filter((e) =>
    e.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleCreate = () => {
    if (!form.name || !form.location || !form.size) return;
    const newEstate = {
      id: Date.now(),
      ...form,
      status: "Active",
    };
    setEstates((prev) => [newEstate, ...prev]);
    setForm({ name: "", location: "", size: "" });
  };
  const handleToggleStatus = (id) => {
    setEstates((prev) =>
      prev.map((e) =>
        e.id === id
          ? { ...e, status: e.status === "Active" ? "Inactive" : "Active" }
          : e
      )
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Estates Management</h1>
      </div>

      {/* Create Estate */}
      <div className="bg-white p-4 rounded-xl shadow flex gap-3">
        <Input
          placeholder="Estate Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <Input
          placeholder="Location"
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
        />
        <Input
          placeholder="Size (e.g. 50 hectares)"
          value={form.size}
          onChange={(e) => setForm({ ...form, size: e.target.value })}
        />
        <Button onClick={handleCreate}>Add Estate</Button>
      </div>

      {/* Search */}
      <Input
        placeholder="Search estates..."
        className="w-72"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Table */}
      <div className="bg-white rounded-xl shadow">
        <Table><TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((estate) => (
              <TableRow key={estate.id}>
                <TableCell>{estate.name}</TableCell>
                <TableCell>{estate.location}</TableCell>
                <TableCell>{estate.size}</TableCell>
                <TableCell>{estate.status}</TableCell>
                <TableCell>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleToggleStatus(estate.id)}
                  >
                    {estate.status === "Active" ? "Deactivate" : "Activate"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}