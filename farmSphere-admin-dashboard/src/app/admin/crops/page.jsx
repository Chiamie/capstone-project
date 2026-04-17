

// export default function CropsPage() {
//   return <h1 className="text-2xl font-bold">Crop Production</h1>;
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

const mockCrops = [
  {
    id: 1,
    crop: "Maize",
    estate: "Green Valley Estate",
    stage: "Planting",
    season: "Wet Season",
    status: "Active",
  },
  {
    id: 2,
    crop: "Rice",
    estate: "Sunrise Farm",
    stage: "Harvest",
    season: "Dry Season",
    status: "Completed",
  },
];

export default function CropsPage() {
  const [crops, setCrops] = useState(mockCrops);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({
    crop: "",
    estate: "",
    stage: "",
    season: "",
  });

  const filtered = crops.filter((c) =>
    c.crop.toLowerCase().includes(search.toLowerCase())
  );

  const handleCreate = () => {
    if (!form.crop || !form.estate || !form.stage || !form.season) return;

    const newCrop = {
      id: Date.now(),
      ...form,
      status: "Active",
    };

    setCrops((prev) => [newCrop, ...prev]);
    setForm({ crop: "", estate: "", stage: "", season: "" });
  };

  const handleStageChange = (id, newStage) => {
    setCrops((prev) =>
      prev.map((c) =>
        c.id === id
          ? {
              ...c,
              stage: newStage,
              status: newStage === "Harvest" ? "Completed" : "Active",
            }
          : c
      )
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Crop Production</h1>
      </div>

      {/* Create Crop Plan */}
      <div className="bg-white p-4 rounded-xl shadow grid grid-cols-5 gap-3">
        <Input
          placeholder="Crop (e.g. Maize)"
          value={form.crop}
          onChange={(e) => setForm({ ...form, crop: e.target.value })}
        />
        <Input
          placeholder="Estate"
          value={form.estate}
          onChange={(e) => setForm({ ...form, estate: e.target.value })}
        />
        <Input
          placeholder="Stage (Planting/Growth/Harvest)"
          value={form.stage}
          onChange={(e) => setForm({ ...form, stage: e.target.value })}
        />
        <Input
          placeholder="Season"
          value={form.season}
          onChange={(e) => setForm({ ...form, season: e.target.value })}
        />
        <Button onClick={handleCreate}>Add Crop</Button>
      </div>

      {/* Search */}
      <Input
        placeholder="Search crops..."
        className="w-72"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Table */}
      <div className="bg-white rounded-xl shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Crop</TableHead>
              <TableHead>Estate</TableHead>
              <TableHead>Season</TableHead>
              <TableHead>Stage</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
          {filtered.map((crop) => (
              <TableRow key={crop.id}>
                <TableCell>{crop.crop}</TableCell>
                <TableCell>{crop.estate}</TableCell>
                <TableCell>{crop.season}</TableCell>
                <TableCell>{crop.stage}</TableCell>
                <TableCell>{crop.status}</TableCell>
                <TableCell className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleStageChange(crop.id, "Growth")}
                  >
                    Move to Growth
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleStageChange(crop.id, "Harvest")}
                  >
                    Harvest
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

