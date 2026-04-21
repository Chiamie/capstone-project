

// export default function CropsPage() {
//   return <h1 className="text-2xl font-bold">Crop Production</h1>;
// }






// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";

// const mockCrops = [
//   {
//     id: 1,
//     crop: "Maize",
//     estate: "Green Valley Estate",
//     stage: "Planting",
//     season: "Wet Season",
//     status: "Active",
//   },
//   {
//     id: 2,
//     crop: "Rice",
//     estate: "Sunrise Farm",
//     stage: "Harvest",
//     season: "Dry Season",
//     status: "Completed",
//   },
// ];

// export default function CropsPage() {
//   const [crops, setCrops] = useState(mockCrops);
//   const [search, setSearch] = useState("");
//   const [form, setForm] = useState({
//     crop: "",
//     estate: "",
//     stage: "",
//     season: "",
//   });

//   const filtered = crops.filter((c) =>
//     c.crop.toLowerCase().includes(search.toLowerCase())
//   );

//   const handleCreate = () => {
//     if (!form.crop || !form.estate || !form.stage || !form.season) return;

//     const newCrop = {
//       id: Date.now(),
//       ...form,
//       status: "Active",
//     };

//     setCrops((prev) => [newCrop, ...prev]);
//     setForm({ crop: "", estate: "", stage: "", season: "" });
//   };

//   const handleStageChange = (id, newStage) => {
//     setCrops((prev) =>
//       prev.map((c) =>
//         c.id === id
//           ? {
//               ...c,
//               stage: newStage,
//               status: newStage === "Harvest" ? "Completed" : "Active",
//             }
//           : c
//       )
//     );
//   };

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex justify-between items-center">
//         <h1 className="text-2xl font-bold">Crop Production</h1>
//       </div>

//       {/* Create Crop Plan */}
//       <div className="bg-white p-4 rounded-xl shadow grid grid-cols-5 gap-3">
//         <Input
//           placeholder="Crop (e.g. Maize)"
//           value={form.crop}
//           onChange={(e) => setForm({ ...form, crop: e.target.value })}
//         />
//         <Input
//           placeholder="Estate"
//           value={form.estate}
//           onChange={(e) => setForm({ ...form, estate: e.target.value })}
//         />
//         <Input
//           placeholder="Stage (Planting/Growth/Harvest)"
//           value={form.stage}
//           onChange={(e) => setForm({ ...form, stage: e.target.value })}
//         />
//         <Input
//           placeholder="Season"
//           value={form.season}
//           onChange={(e) => setForm({ ...form, season: e.target.value })}
//         />
//         <Button onClick={handleCreate}>Add Crop</Button>
//       </div>

//       {/* Search */}
//       <Input
//         placeholder="Search crops..."
//         className="w-72"
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//       />

//       {/* Table */}
//       <div className="bg-white rounded-xl shadow">
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead>Crop</TableHead>
//               <TableHead>Estate</TableHead>
//               <TableHead>Season</TableHead>
//               <TableHead>Stage</TableHead>
//               <TableHead>Status</TableHead>
//               <TableHead>Actions</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//           {filtered.map((crop) => (
//               <TableRow key={crop.id}>
//                 <TableCell>{crop.crop}</TableCell>
//                 <TableCell>{crop.estate}</TableCell>
//                 <TableCell>{crop.season}</TableCell>
//                 <TableCell>{crop.stage}</TableCell>
//                 <TableCell>{crop.status}</TableCell>
//                 <TableCell className="flex gap-2">
//                   <Button
//                     size="sm"
//                     variant="outline"
//                     onClick={() => handleStageChange(crop.id, "Growth")}
//                   >
//                     Move to Growth
//                   </Button>
//                   <Button
//                     size="sm"
//                     variant="outline"
//                     onClick={() => handleStageChange(crop.id, "Harvest")}
//                   >
//                     Harvest
//                     </Button>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </div>
//     </div>
//   );
// }



// import { useEffect, useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {cropApi} from '../../../api.js';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";





// export default function CropsPage() {
//   const [search, setSearch] = useState("");
//   const [crops, setCrops] = useState([]);
//   const [loading, setLoading] = useState(false);
  

//   const [form, setForm] = useState({ 
//   name: "", 
//   category: "", 
//   growthDuration: "", // 👈 Add this!
//   description: "" 
// });

//   useEffect(() => {
//     fetchCrops();
//   }, []);

//   const fetchCrops = async () => {
//     setLoading(true);
//     try {
//       const res = await cropApi.get("/get-all/crops");
//       // Use the 'data' field from your ApiResponse wrapper
//       setCrops(res.data.data || []);
//     } catch (err) {
//       console.error("Error fetching crops:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCreateCrop = async () => {
//   // Ensure we check for the growth duration as well
//   if (!form.name || !form.category || !form.growthDuration) {
//     alert("Name, category, and growth duration are required");
//     return;
//   }

//   try {
//     await cropApi.post("/create/crops", {
//       cropName: form.name, // 👈 MATCHES: private String cropName
//       category: form.category, // MATCHES: private PRODUCE_CATEGORY category
//       growthDurationDays: Number(form.growthDuration), // 👈 MATCHES: private int growthDurationDays
//       description: form.description || "",
//     });

//     alert("CREATED")

//     fetchCrops();
    
//     // Reset form
//     setForm({ name: "", category: "", growthDuration: "", description: "" });
//     alert("Crop created successfully!");
//   } catch (err) {
//     console.error("Error creating crop:", err.response?.data || err);
//   }
// };
//   // Filter against the local state
//   const filtered = crops.filter((c) =>
//     c.cropName?.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div className="space-y-6">
//       {/* ... Create Inputs ... */}
//       <div className="grid grid-cols-4 gap-3"> {/* Changed to 4 columns */}
//         <Input
//           placeholder="Crop Name"
//           value={form.name}
//           onChange={(e) => setForm({ ...form, name: e.target.value })}
//         />

//         <select
//           className="border rounded-lg p-2 bg-white"
//           value={form.category}
//           onChange={(e) => setForm({ ...form, category: e.target.value })}
//         >
//           <option value="">Select Category</option>
//           <option value="GRAINS">GRAINS</option>
//           <option value="VEGETABLES">VEGETABLES</option>
//           <option value="FRUITS">FRUITS</option>
//           <option value="LEGUMES">LEGUMES</option>
//           <option value="TUBERS">TUBERS</option>
//           <option value="CASH_CROPS">CASH_CROPS</option>

//           {/* Ensure these match your PRODUCE_CATEGORY Enum exactly */}
//         </select>

//         <Input
//           type="number"
//           placeholder="Growth Days (e.g. 90)"
//           value={form.growthDuration}
//           onChange={(e) => setForm({ ...form, growthDuration: e.target.value })}
//         />

//         <Input
//           placeholder="Description"
//           value={form.description}
//           onChange={(e) => setForm({ ...form, description: e.target.value })}
//         />
//         <Button onClick={handleCreateCrop}>
//           Create Crop
//         </Button>
//       </div>

//       <Input 
//         placeholder="Search crops..." 
//         value={search} 
//         onChange={(e) => setSearch(e.target.value)} 
//       />

//       <Table>
//        <TableBody>
//           {filtered.length > 0 ? (
//             filtered.map((crop) => (
//               <TableRow key={crop.id}>
//                 <TableCell>{crop.id}</TableCell>
//                 <TableCell className="font-medium">{crop.cropName}</TableCell> {/* 👈 Updated */}
//                 <TableCell>{crop.category}</TableCell>
//               </TableRow>
//             ))
//           ) : (
//             <TableRow>
//               <TableCell colSpan={3} className="text-center">No crops found.</TableCell>
//             </TableRow>
//           )}
//         </TableBody>
//       </Table>
//     </div>
//   );
// }




import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {cropApi} from '../../../api.js';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function CropsPage() {
  const [search, setSearch] = useState("");
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ 
    name: "", 
    category: "", 
    growthDuration: "", 
    description: "" 
  });

  useEffect(() => {
    fetchCrops();
  }, []);

  const fetchCrops = async () => {
    setLoading(true);
    try {
      const res = await cropApi.get("/get-all/crops");
      setCrops(res.data.data || []);
    } catch (err) {
      console.error("Error fetching crops:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCrop = async () => {
    if (!form.name || !form.category || !form.growthDuration) {
      alert("All required fields must be filled");
      return;
    }

    try {
      await cropApi.post("/create/crops", {
        cropName: form.name,
        category: form.category,
        growthDurationDays: Number(form.growthDuration),
        description: form.description || "",
      });

      fetchCrops();
      setForm({ name: "", category: "", growthDuration: "", description: "" });
      alert("Crop created successfully!");
    } catch (err) {
      console.error("Error creating crop:", err.response?.data || err);
    }
  };

  // Filter against 'cropName' to match your Backend data
  const filtered = crops.filter((c) =>
    c.cropName?.toLowerCase().includes(search.toLowerCase())
  );


  const getCropById = async (id) => {
    const res = await api.get(`/admin/farming/get/crop/${id}`);
    return res.data.data;
  };

  const getCropsByCategory = async (category) => {
    const res = await api.get(
      `/admin/farming/get/crop/category/${category}`
    );
    return res.data.data;
  };

  const createCropPlan = async (payload) => {
    return await api.post("/admin/farming/create/crop-plans", payload);
  };

  const handleCreatePlan = async () => {
    await createCropPlan({
      plotId: selectedPlotId,
      primaryCropId: selectedCropId,
      season: "WET",
      expectedYield: 200,
      spacingPattern: "",
    });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-800">Crop Production</h1>

      {/* Create Crop Inputs */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 grid grid-cols-4 gap-4">
        <Input
          placeholder="Crop Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <select
          className="border border-slate-200 rounded-lg p-2 bg-white text-sm"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        >
          <option value="">Select Category</option>
          {/* PLURALIZED to match your Java Enum logs */}
          <option value="GRAINS">Grains</option>
          <option value="VEGETABLES">Vegetables</option>
          <option value="FRUITS">Fruits</option>
          <option value="LEGUMES">Legumes</option>
          <option value="TUBERS">Tubers</option>
          <option value="CASH_CROPS">Cash Crops</option>
        </select>
        <Input
          type="number"
          placeholder="Growth Duration (Days)"
          value={form.growthDuration}
          onChange={(e) => setForm({ ...form, growthDuration: e.target.value })}
        />
        <Input
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <Button className="col-span-4" onClick={handleCreateCrop}>
          Create Crop
        </Button>
      </div>

      <Input 
        placeholder="Search crops..." 
        className="max-w-xs"
        value={search} 
        onChange={(e) => setSearch(e.target.value)} 
      />

      {/* THE TABLE FIX */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead className="w-24 text-slate-600 font-bold">ID</TableHead>
              <TableHead className="text-slate-600 font-bold">Crop Name</TableHead>
              <TableHead className="text-slate-600 font-bold">Category</TableHead>
              <TableHead className="text-slate-600 font-bold">Duration</TableHead>
              <TableHead className="text-slate-600 font-bold">Description</TableHead>
              <TableHead className="text-slate-600 font-bold text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow><TableCell colSpan={4} className="text-center py-10">Loading crops...</TableCell></TableRow>
            ) : filtered.length > 0 ? (
              filtered.map((crop) => (
                <TableRow key={crop.id}>
                  {/* If ID is still not showing, check if backend sends 'id' or 'cropId' */}
                  <TableCell className="font-mono text-slate-500">#{crop.cropId}</TableCell>
                  <TableCell className="font-medium text-slate-900">{crop.cropName}</TableCell>
                  <TableCell>
                    <span className="px-2 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100">
                      {crop.category}
                    </span>
                  </TableCell>
                  <TableCell className="font-medium text-slate-900">{crop.growthDurationDays}</TableCell>
                  <TableCell className="font-medium text-slate-900">{crop.description}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" className="text-blue-600">Edit</Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-10 text-slate-400">
                  No crops found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}