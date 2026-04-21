// export default function EstatesPage() {
//   return <h1 className="text-2xl font-bold">Estates Management</h1>;
// }

import { useEffect, useState } from "react";
import api from '../../../api.js';
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
    description: "",
  });

  const sizeValue = parseFloat(form.size);


  const [clusterForm, setClusterForm] = useState({
    clusterName: "",
    primaryCropId: "",
    primaryCropName: "",
    farmingModel: "",
    description: "",

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

  const handleSelectEstate = (estate) => {
    setSelectedEstate(estate);
    fetchClusters(estate.id);
  };

  const fetchClusters = async (estateId) => {
    try {
      const estateObject = estates.find(e => e.id === estateId);
      setSelectedEstate(estateObject); 

      const res = await api.get(`/estates/${estateId}/clusters`);
      setClusters(res.data.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  // const fetchClusters = async (estateId) => {
  //   try {
  //     const res = await api.get(`/estates/${estateId}/clusters`);
  //     setClusters(res.data.data || []);
  //     setSelectedEstate(estateId);
      
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

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
        totalSize: sizeValue, 
        description: form.description || "",
      });

      fetchEstates();
      setForm({ name: "", location: "", size: "" });
    } catch (err) {
      console.error("Error creating estate:", err);
    }
  };

 
  const handleCreateCluster = async () => {
    // FIX 2: Added detailed validation check
    if (
      !clusterForm.clusterName ||
      !clusterForm.primaryCropId ||
      !clusterForm.primaryCropName ||
      !clusterForm.farmingModel ||
      !selectedEstate?.id
    ) {
      alert("All required fields must be filled, including a selected Estate");
      return;
    }

  // const handleCreateCluster = async () => {
  //   if (
  //     !clusterForm.clusterName ||
  //     !clusterForm.primaryCropId ||
  //     !clusterForm.primaryCropName ||
  //     !clusterForm.farmingModel ||
  //     !selectedEstate
  //   ) {
  //     alert("All required fields must be filled");
  //     return;
  //   }
    try {
      await api.post("/create/clusters", {
        estateId: selectedEstate.id, // Now this is definitely a Long
        clusterName: clusterForm.clusterName,
        primaryCropId: Number(clusterForm.primaryCropId),
        primaryCropName: clusterForm.primaryCropName,
        farmingModel: clusterForm.farmingModel, 
        description: clusterForm.description || "",
      });

    // try {
    //   await api.post("/create/clusters", {
    //     estateId: selectedEstate,
    //     clusterName: clusterForm.clusterName,
    //     primaryCropId: Number(clusterForm.primaryCropId),
    //     primaryCropName: clusterForm.primaryCropName,
    //     farmingModel: clusterForm.farmingModel, 
    //     description: clusterForm.description || "",
    //   });

    fetchClusters(selectedEstate.id);
    setClusterForm({
        clusterName: "",
        primaryCropId: "",
        primaryCropName: "",
        farmingModel: "",
        description: "",
    });
    alert("Cluster created successfully!");
      } catch (err) {
        console.error("Error creating cluster:", err);
      }
    };
  //     fetchClusters(selectedEstate.id);

  //     setClusterForm({
  //       clusterName: "",
  //       primaryCropId: "",
  //       primaryCropName: "",
  //       farmingModel: "",
  //       description: "",
  //     });

  //   } catch (err) {
  //     console.error("Error creating cluster:", err);
  //   }
  // };


  // const handleCreateCluster = async () => {
  //   if (!clusterForm.name || !selectedEstate) {
  //     alert("Cluster name and estate are required");
  //     return;
  //   }

  //   try {
  //     await api.post("/create/clusters", {
  //       name: clusterForm.name,
  //       estateId: selectedEstate.id,
  //     });
  //     fetchClusters(selectedEstate.id);
  //     setClusterForm({ name: "", estateId: null });

  //   } catch (err) {
  //     console.error("Error creating cluster:", err);
  //   }
  // };
    
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
      <h1 className="text-2xl font-bold">Estates Management</h1>

      {/* Create Estate Form */}
      <div className="bg-white p-4 rounded-xl shadow flex gap-3">
        <Input placeholder="Estate Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <Input placeholder="Location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
        <Input placeholder="Size" value={form.size} onChange={(e) => setForm({ ...form, size: e.target.value })} />
        <Button onClick={handleCreate}>Add Estate</Button>
      </div>

      <Input placeholder="Search estates..." className="w-72" value={search} onChange={(e) => setSearch(e.target.value)} />

      <div className="bg-white rounded-xl shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((estate) => (
              <TableRow key={estate.id}>
                <TableCell className="cursor-pointer text-blue-600" onClick={() => fetchClusters(estate.id)}>
                  {estate.name}
                </TableCell>
                <TableCell>{estate.location}</TableCell>
                <TableCell>{estate.totalSize || "-"}</TableCell>
                <TableCell>{estate.status || "Active"}</TableCell>
              </TableRow>
            ))}

            {/* FIX 3: HTML Nesting - Wrap the Div in TableRow/TableCell */}
            {selectedEstate && (
              <TableRow>
                <TableCell colSpan={4}>
                  <div className="bg-slate-50 p-6 rounded-xl border-2 border-dashed border-slate-200 space-y-4">
                    <h2 className="font-bold text-lg">Create Cluster for {selectedEstate.name}</h2>
                    <div className="grid grid-cols-2 gap-3">
                      <Input placeholder="Cluster Name" value={clusterForm.clusterName} onChange={(e) => setClusterForm({ ...clusterForm, clusterName: e.target.value })} />
                      <Input placeholder="Primary Crop Name" value={clusterForm.primaryCropName} onChange={(e) => setClusterForm({ ...clusterForm, primaryCropName: e.target.value })} />
                      <Input type="number" placeholder="Primary Crop ID" value={clusterForm.primaryCropId} onChange={(e) => setClusterForm({ ...clusterForm, primaryCropId: e.target.value })} />
                      <select 
                        className="border rounded-lg p-2 bg-white" 
                        value={clusterForm.farmingModel} 
                        onChange={(e) => setClusterForm({ ...clusterForm, farmingModel: e.target.value })}
                      >
                        <option value="">Select Farming Model</option>
                        <option value="DEMONSTRATION_MODEL">DEMONSTRATION_MODEL</option>
                        <option value="COOPERATIVE_MODEL">COOPERATIVE_MODEL</option>
                        <option value="CLUSTER_BASE_MODEL">CLUSTER_BASE_MODEL</option>
                      </select>
                      <Input className="col-span-2" placeholder="Description" value={clusterForm.description} onChange={(e) => setClusterForm({ ...clusterForm, description: e.target.value })} />
                      <Button className="col-span-2" onClick={handleCreateCluster}>Add Cluster</Button>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}