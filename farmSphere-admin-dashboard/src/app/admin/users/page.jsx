
// // import { Button } from "@/components/ui/button";

// // export default function UsersPage() {
// //   return (
// //     <div>
// //       <h1 className="text-2xl font-bold mb-4">Users</h1>
// //       <Button>Add User</Button>
// //     </div>
// //   );
// // }


// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";

// const mockUsers = [ { id: 1, name: "John Doe", role: "Farmer", status: "Active" },
//   { id: 2, name: "Jane Smith", role: "Investor", status: "Pending" },
//   { id: 3, name: "Mike Johnson", role: "Buyer", status: "Suspended" },
// ];


// export default function UsersPage() {
//   const [search, setSearch] = useState("");
//   const [users, setUsers] = useState(mockUsers);


//   const handleApprove = (id) => {
//     setUsers((prev) =>
//       prev.map((u) => (u.id === id ? { ...u, status: "Active" } : u))
//     );
//   };


//   const handleSuspend = (id) => {
//     setUsers((prev) =>
//       prev.map((u) => (u.id === id ? { ...u, status: "Suspended" } : u))
//     );
//   };


//   const filteredUsers = users.filter((u) =>
//     u.name.toLowerCase().includes(search.toLowerCase())
//   );


//   const renderTable = (role) => (
//     <Table>
//       <TableHeader>
//         <TableRow>
//           <TableHead>Name</TableHead>
//           <TableHead>Role</TableHead>
//           <TableHead>Status</TableHead>
//           <TableHead>Actions</TableHead>
//         </TableRow>
//       </TableHeader>
//       <TableBody>
//         {filteredUsers
//           .filter((u) => u.role === role)
//           .map((user) => (
//             <TableRow key={user.id}>
//               <TableCell>{user.name}</TableCell>
//               <TableCell>{user.role}</TableCell>
//               <TableCell>{user.status}</TableCell>
//               <TableCell className="flex gap-2">
//                 {user.status === "Pending" && (
//                   <Button size="sm" onClick={() => handleApprove(user.id)}>
//                     Approve
//                     </Button>
//                 )}
//                 <Button
//                   size="sm"
//                   variant="outline"
//                   onClick={() => handleSuspend(user.id)}
//                 >
//                   Suspend
//                 </Button>
//               </TableCell>
//             </TableRow>
//           ))}
//       </TableBody>
//     </Table>
//   );
//   return (
//     <div>
//       <div className="flex justify-between items-center mb-4">
//         <h1 className="text-2xl font-bold">Users Management</h1>
//         <Button>Add User</Button>
//       </div>

//       <Input
//         placeholder="Search users..."
//         className="mb-4 w-72"
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//       />

//       <Tabs defaultValue="farmers">
//       <TabsList>
//           <TabsTrigger value="farmers">Farmers</TabsTrigger>
//           <TabsTrigger value="investors">Investors</TabsTrigger>
//           <TabsTrigger value="buyers">Buyers</TabsTrigger>
//         </TabsList>

//         <TabsContent value="farmers">{renderTable("Farmer")}</TabsContent>
//         <TabsContent value="investors">{renderTable("Investor")}</TabsContent>
//         <TabsContent value="buyers">{renderTable("Buyer")}</TabsContent>
//       </Tabs>
//     </div>
//   );
// }





import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  const [user, setUser] = useState([]);
  const [farmers, setFarmers] = useState([]);
  const [investors, setInvestors] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Fetch Data from Backend
  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetching only pending as per your controller, 
      // but you can add more endpoints for "all" users
      const farmerRes = await fetch("http://localhost:8080/api/admin/farmers/pending").then(res => res.json());
      const investorRes = await fetch("http://localhost:8080/api/admin/investors/pending").then(res => res.json());

      setFarmers(farmerRes.data || []);
      setInvestors(investorRes.data || []);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 2. Handle Approval
  const handleApprove = async (id, type) => {
    const endpoint = type === "Farmer" 
      ? `http://localhost:8080/api/admin/farmers/${id}/approve`
      : `http://localhost:8080/api/admin/investors/${id}/approve`;

    try {
      const res = await fetch(endpoint, { method: 'PATCH' });
      if (res.ok) {
        // Refresh list after success
        fetchData();
      }
    } catch (error) {
      console.error("Approval failed:", error);
    }
  };

  // 3. Handle Rejection (Suspension)
  const handleReject = async (id, type) => {
    const reason = window.prompt("Reason for rejection:");
    if (!reason) return;

    const endpoint = type === "Farmer" 
      ? `http://localhost:8080/api/admin/farmers/${id}/reject`
      : `http://localhost:8080/api/admin/investors/${id}/reject`;

    try {
      const res = await fetch(endpoint, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reason)
      });
      if (res.ok) fetchData();
    } catch (error) {
      console.error("Rejection failed:", error);
    }
  };

  const renderTable = (data, type) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data
          .filter(u => (u.name || u.email || "").toLowerCase().includes(search.toLowerCase()))
          .map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.name || user.email}</TableCell>
              <TableCell className="capitalize">{user.status || "Pending"}</TableCell>
              <TableCell className="flex gap-2">
                <Button size="sm" onClick={() => handleApprove(user.id, type)}>
                  Approve
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleReject(user.id, type)}
                >
                  Reject
                </Button>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Users Management</h1>
      </div>

      <Input
        placeholder="Search by name..."
        className="mb-4 w-72"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading ? (
        <p>Loading users...</p>
      ) : (
        <Tabs defaultValue="farmers">
          <TabsList>
            <TabsTrigger value="farmers">Pending Farmers</TabsTrigger>
            <TabsTrigger value="investors">Pending Investors</TabsTrigger>
          </TabsList>

          <TabsContent value="farmers">{renderTable(farmers, "Farmer")}</TabsContent>
          <TabsContent value="investors">{renderTable(investors, "Investor")}</TabsContent>
        </Tabs>
      )}
    </div>
  );
}