// export default function EstatesPage() {
//   return <h1 className="text-2xl font-bold">Estates Management</h1>;
// }

import { useEffect, useState } from "react";
import api from "@/services/api";

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



export default function EstatesPage() {
  
  const [search, setSearch] = useState("");
  const [estates, setEstates] = useState([]);
  const [loading, setLoading] = useState(false);

  const [clusters, setClusters] = useState([]);
  const [selectedEstate, setSelectedEstate] = useState(null);

  const [plots, setPlots] = useState([]);

  const [form, setForm] = useState({
    name: "",
    location: "",
    size: "",
  });

  useEffect(() => {
    fetchEstates();
  }, []);

  const fetchEstates = async () => {
    setLoading(true);
    try {
      const res = await api.get("/get-all/estates");
      setEstates(res.data.data || []);
    } catch (err) {
      console.error("Error fetching estates:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchClusters = async (estateId) => {
    try {
      const res = await api.get(`/estates/${estateId}/clusters`);
      setClusters(res.data.data || []);
      setSelectedEstate(estateId);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchPlots = async () => {
    const res = await api.get("/plots");
    setPlots(res.data.data || []);
  };

  
  const assignPlot = async (plotId) => {
    const farmerId = prompt("Enter Farmer ID:");
    await api.patch(`/plots/${plotId}/assign`, {
        farmerId,
      });

      fetchPlots();
    };

  const unassignPlot = async (plotId) => {
    await api.patch(`/plots/${plotId}/unassign`);
    fetchPlots();
  };

  const filtered = estates.filter((e) =>
    e.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleCreate = async () => {
    if (!form.name || !form.location) return;

    try {
      await api.post("/create/estates", {
        name: form.name,
        location: form.location,
        size: form.size,
      });

      fetchEstates();
      setForm({ name: "", location: "", size: "" });
    } catch (err) {
      console.error("Error creating estate:", err);
    }
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
            {estates.map((estate) => (
              <TableRow key={estate.id}>
                <TableCell
                  className="cursor-pointer text-blue-600"
                  onClick={() => fetchClusters(estate.id)}
                >
                  {estate.name}
                </TableCell>
                <TableCell>{estate.location}</TableCell>
                <TableCell>{estate.size || "-"}</TableCell>
                <TableCell>{estate.status || "Active"}</TableCell>
              </TableRow>
            ))}

            {selectedEstate && (
              <div className="bg-white p-4 rounded-xl shadow">
                <h2 className="font-semibold mb-2">Clusters</h2>

                {clusters.map((cluster) => (
                  <div key={cluster.id} className="p-2 border-b">
                    {cluster.name}
                  </div>
                ))}
              </div>
            )}
            
          
          </TableBody>
        </Table>
      </div>
    </div>
  );
}