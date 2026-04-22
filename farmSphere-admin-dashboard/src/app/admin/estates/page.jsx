// export default function EstatesPage() {
//   return <h1 className="text-2xl font-bold">Estates Management</h1>;
// }

import React, { useEffect, useState } from "react";
import api from '../../../api.js';
import {adminApi} from '../../../api.js';
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
    fetchPlots();
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

  // const handleSelectEstate = (estate) => {
  //   setSelectedEstate(estate);
  //   fetchClusters(estate.id);
  // };

 

  // const fetchClusters = async (estateId) => {
  //   try {
  //     const estateObject = estates.find(e => e.id === estateId);
  //     setSelectedEstate(estateObject); 

  //     const res = await api.get(`/estates/${estateId}/clusters`);
  //     setClusters(res.data.data || []);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  
const fetchClusters = async (estateId) => {
  try {
    const res = await api.get(`/estates/${estateId}/clusters`);
    const clusterData = res.data.data || [];
    setClusters(clusterData); // Updates the state so the table can show them
    return clusterData;
  } catch (err) {
    console.error("Error fetching clusters:", err);
    return [];
  }
};

// const handleSelectEstate = async (estate) => {
//   setSelectedEstate(estate);
//   await fetchClusters(estate.id); // Triggers the fetch when estate is clicked
// };

const handleSelectEstate = async (estate) => {
  setSelectedEstate(estate);

  const data = await fetchClusters(estate.id);
  setClusters(data);
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
    // const farmerId = prompt("Enter Farmer ID:");
    await api.patch(`/plots/${plotId}/assign`, {
        farmerId,
        farmerEmail,
        farmName

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

  
    try {
      await api.post("/create/clusters", {
        estateId: selectedEstate.id, // Now this is definitely a Long
        clusterName: clusterForm.clusterName,
        primaryCropId: Number(clusterForm.primaryCropId),
        primaryCropName: clusterForm.primaryCropName,
        farmingModel: clusterForm.farmingModel, 
        description: clusterForm.description || "",
      });


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
  
    
  const handleToggleStatus = (id) => {
    setEstates((prev) =>
      prev.map((e) =>
        e.id === id
          ? { ...e, status: e.status === "Active" ? "Inactive" : "Active" }
          : e
      )
    );
  };

 




const createPlot = async (payload) => {
  return await api.post("/plots", payload);
};

const [plotForm, setPlotForm] = useState({
  clusterId: "",
  location: "",
  plotSize: "",
  soilType: "",
});

const handleCreatePlot = async () => {
  if (!plotForm.clusterId || !plotForm.location || !plotForm.plotSize || !plotForm.soilType) {
    alert("All fields are required");
    return;
  }

  try {
    await createPlot({
      clusterId: Number(plotForm.clusterId),
      location: plotForm.location,
      plotSize: Number(plotForm.plotSize),
      soilType: plotForm.soilType
    });

    alert("Plot created successfully!");

    setPlotForm({
      clusterId: "",
      location: "",
      plotSize: "",
      soilType: "",
    });

    fetchPlots();
    

  } catch (err) {
    console.error("Error creating plot:", err);
  }
};




const [availableFarmers, setAvailableFarmers] = useState([]);
const [selectedPlotId, setSelectedPlotId] = useState(null);
const [showAssignModal, setShowAssignModal] = useState(false);


const fetchUnassignedFarmers = async () => {
  try {
    const res = await adminApi.get("/farmers/unassigned");
    console.log("FARMER DATA RECEIVED:", res.data.data);
    setAvailableFarmers(res.data.data || []);
  } catch (err) {
    console.error("Error fetching farmers:", err);
  }
};


const handleOpenAssign = (plotId) => {
  setSelectedPlotId(plotId);
  fetchUnassignedFarmers();
  setShowAssignModal(true);
};

const handleAssignSubmit = async (farmer) => {
  try {
    await api.patch(`/plots/${selectedPlotId}/assign`, {
      farmerId: farmer.userId,           
      farmerEmail: farmer.email,     
      farmerName: farmer.farmerName    
    });

    alert(`Plot assigned to ${farmer.farmerName} successfully!`);
    setShowAssignModal(false);
    fetchPlots(); 
  } catch (err) {
    console.error("Assignment failed:", err.response?.data);
    alert(err.response?.data?.message || "Assignment failed");
  }
};



 

  
 





  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Estates Management</h1>

      {/* 1. Create Estate Form */}
      <div className="bg-white p-4 rounded-xl shadow flex gap-3">
        {/* ... Inputs ... */}
          
            <Input placeholder="Estate Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <Input placeholder="Location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
            <Input placeholder="Size" value={form.size} onChange={(e) => setForm({ ...form, size: e.target.value })} />
            <Button onClick={handleCreate}>Add Estate</Button>
        
      </div>

      <Input placeholder="Search estates..." className="w-72" value={search} onChange={(e) => setSearch(e.target.value)} />

      {/* 2. Main Data Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
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
              <React.Fragment key={estate.id}>
                {/* Estate Row */}
                <TableRow 
                  className="cursor-pointer hover:bg-slate-50" 
                  onClick={() => handleSelectEstate(estate)}
                >
                  <TableCell className="text-blue-600 font-medium">{estate.name}</TableCell>
                  <TableCell>{estate.location}</TableCell>
                  <TableCell>{estate.totalSize || "-"}</TableCell>
                  <TableCell>{estate.status || "Active"}</TableCell>
                </TableRow>

                {/* Sub-Section: Create Cluster (Only shows if this estate is selected) */}
                {selectedEstate?.id === estate.id && (
                  <TableRow>
                    <TableCell colSpan={4} className="bg-slate-50 p-0">
                      <div className="p-6 border-y space-y-4">
                        <h2 className="font-bold">Create Cluster for {selectedEstate.name}</h2>
                        <div className="grid grid-cols-2 gap-3">
                           {/* ... Your Cluster Inputs ... */}
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
                        
                        {/* 3. List of Existing Clusters for this Estate */}
                        <div className="mt-4 space-y-2">
                          <h3 className="text-sm font-semibold text-slate-500 uppercase">Existing Clusters</h3>
                          {clusters.length > 0 ? clusters.map((c) => (
                            <div key={c.id} className="p-2 bg-white border rounded shadow-sm text-sm">
                              {c.clusterName} ({c.farmingModel})
                            </div>
                          )) : <p className="text-xs text-slate-400 italic">No clusters found.</p>}
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* 4. Separated Plot Management Section */}
      <div className="bg-white p-6 rounded-xl shadow space-y-4">
        <h2 className="text-xl font-bold">Plot Assignments</h2>
        
        <div className="flex gap-3">
          <select 
            className="border rounded-lg p-2 flex-1"
            value={plotForm.clusterId}
            onChange={(e) => setPlotForm({ ...plotForm, clusterId: e.target.value })}
          >
            <option value="">Select Cluster to Create Plot</option>
            {/* You might want a separate fetch for ALL clusters here */}
            {clusters.map((c) => (
              <option key={c.clusterId} value={c.clusterId}>{c.clusterName}</option>
            ))}
          </select>
          <Input placeholder="Location" value={plotForm.location} onChange={(e) => setPlotForm({ ...plotForm, location: e.target.value })} />
          <Input placeholder="Plot Size" value={plotForm.plotSize} onChange={(e) => setPlotForm({ ...plotForm, plotSize: e.target.value })} />
          <Input placeholder="Soil Type" value={plotForm.soilType} onChange={(e) => setPlotForm({ ...plotForm, soilType: e.target.value })} />
          <Button onClick={handleCreatePlot}>Create Plot</Button>
          
        </div>
        {/* This would show up when showAssignModal is true */}
        {showAssignModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-xl w-96 space-y-4">
              <h3 className="font-bold text-lg">Assign Plot #{selectedPlotId}</h3>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Select Available Farmer</label>
                <select 
                  className="w-full border rounded-lg p-2"
                  onChange={(e) => {
                    const farmer = availableFarmers.find(f => f.userId === Number(e.target.value));
                    if (farmer) handleAssignSubmit(farmer);
                  }}
                >
                  <option value="">-- Choose a Farmer --</option>
                  {availableFarmers.map((f) => (
                    <option key={f.userId} value={f.userId}>
                      {f.farmerName} ({f.email})
                    </option>
                  ))}
                </select>
              </div>

              <Button variant="ghost" className="w-full" onClick={() => setShowAssignModal(false)}>
                Cancel
              </Button>
            </div>
          </div>
        )}

        <Table>
           <TableHeader>
             <TableRow>
               <TableHead>ID</TableHead>
               <TableHead>Plot Number</TableHead>
               <TableHead>Plot Size</TableHead>
               <TableHead>Soil Type</TableHead>
               <TableHead>Status</TableHead>
               <TableHead>Action</TableHead>
             </TableRow>
           </TableHeader>
           <TableBody>
             {plots.map((plot) => (
               <TableRow key={plot.plotId}>
                 <TableCell>{plot.plotId}</TableCell>
                 <TableCell>
                  {`${plot.clusterId}-${plot.location}`} 
                 </TableCell>
                 <TableCell>{plot.plotSize}</TableCell>
                 <TableCell>{plot.soilType}</TableCell>
                 <TableCell>{plot.status}</TableCell>
                 {/* <TableCell>
                    <Button variant="outline" size="sm" onClick={() => assignPlot(plot.id)}>Assign</Button>
                    <Button variant="outline" size="sm" onClick={handleAssignSubmit}>Assign</Button>
                 </TableCell>  */} 
                 <TableCell>
                    {plot.status === "AVAILABLE" ? (
                      <Button 
                        size="sm" 
                        className="bg-blue-600 hover:bg-blue-700"
                        onClick={() => handleOpenAssign(plot.plotId)}
                      >
                        Assign Farmer
                      </Button>
                    ) : (
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="text-red-600 border-red-200"
                        onClick={() => unassignPlot(plot.plotId)}
                      >
                        Unassign
                      </Button>
                    )}
                  </TableCell>
               </TableRow>
             ))}
           </TableBody>
        </Table>
      </div>
              
    </div>
  );
}