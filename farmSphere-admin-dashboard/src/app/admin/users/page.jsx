
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





