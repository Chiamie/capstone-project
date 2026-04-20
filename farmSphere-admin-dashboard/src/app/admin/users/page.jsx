
// // import { Button } from "@/components/ui/button";

// // export default function UsersPage() {
// //   return (
// //     <div>
// //       <h1 className="text-2xl font-bold mb-4">Users</h1>
// //       <Button>Add User</Button>
// //     </div>
// //   );
// // }



import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import api from "../../../api.js";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";









export default function UsersPage() {
  const [search, setSearch] = useState("");
  const [farmers, setFarmers] = useState([]);
  const [investors, setInvestors] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
  fetchUsers();
}, []);

// const fetchUsers = async () => {
//   setLoading(true);
//   try {
//     const farmersRes = await api.get("/farmers/pending");
//     const investorsRes = await api.get("/investors/pending");

//     setFarmers(farmersRes.data.data || []);
//     setInvestors(investorsRes.data.data || []);
//   } catch (err) {
//     console.error("Error fetching users:", err);
//   } finally {
//     setLoading(false);
//   }
// };

const fetchUsers = async () => {
  setLoading(true);
  try {
    // Run both requests at the same time
    const [farmersRes, investorsRes] = await Promise.all([
      api.get("/farmers/pending"),
      api.get("/investors/pending")
    ]);
    if (farmersRes.data.success) {
      setFarmers(farmersRes.data.data || []);
    } else {
      console.error("Error fetching farmers:", farmersRes.data.message);
    }

    if (investorsRes.data.success) {
      setInvestors(investorsRes.data.data || []);
    } else {
      console.error("Error fetching investors:", investorsRes.data.message);
    }
    
    
  } catch (err) {
    console.error("Error fetching users:", err);
    // Suggestion: Add a toast notification here so the admin sees the error
  } finally {
    setLoading(false);
  }
};


const approveFarmer = async (id) => {
  await api.patch(`/farmers/${id}/approve`);
  fetchUsers();
};

const rejectFarmer = async (id) => {
  const reason = prompt("Enter rejection reason:");
  if (!reason) return;

  await api.patch(`/farmers/${id}/reject`, reason, {
    headers: { "Content-Type": "application/json" },
  });

  fetchUsers();
};

const approveInvestor = async (id) => {
  await api.patch(`/investors/${id}/approve`);
  fetchUsers();
};

const rejectInvestor = async (id) => {
  const reason = prompt("Enter rejection reason:");
  if (!reason) return;

  await api.patch(`/investors/${id}/reject`, reason, {
    headers: { "Content-Type": "application/json" },
  });

  fetchUsers();
};


  const renderTable = (role) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {farmers.map((user) => (
          <TableRow key={user.id}>
            <TableCell>{user.name}</TableCell>
            <TableCell>Farmer</TableCell>
            <TableCell>Pending</TableCell>
            <TableCell className="flex gap-2">
              <Button size="sm" onClick={() => approveFarmer(user.id)}>
                Approve
              </Button>

              <Button size="sm" variant="outline" onClick={() => rejectFarmer(user.id)}>
                Reject
              </Button>
            </TableCell>
          </TableRow>
        ))}
        {investors.map((user) => (
          <TableRow key={user.id}>
            <TableCell>{user.name}</TableCell>
            <TableCell>Investor</TableCell>
            <TableCell>Pending</TableCell>
            <TableCell className="flex gap-2">
              <Button size="sm" onClick={() => approveInvestor(user.id)}>Approve</Button>
              <Button size="sm" variant="outline" onClick={() => rejectInvestor(user.id)}>
                Reject
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Users Management</h1>
        <Button>Add User</Button>
      </div>

      <Input
        placeholder="Search users..."
        className="mb-4 w-72"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <Tabs defaultValue="farmers">
      <TabsList>
          <TabsTrigger value="farmers">Farmers</TabsTrigger>
          <TabsTrigger value="investors">Investors</TabsTrigger>
          <TabsTrigger value="buyers">Buyers</TabsTrigger>
        </TabsList>

        <TabsContent value="farmers">{renderTable("Farmer")}</TabsContent>
        <TabsContent value="investors">{renderTable("Investor")}</TabsContent>
        <TabsContent value="buyers">{renderTable("Buyer")}</TabsContent>
      </Tabs>
    </div>
  );
}







