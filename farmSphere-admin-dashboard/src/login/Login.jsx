

import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import {authApi} from "../api.js"; 

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();



  

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // This will hit http://localhost:8080/api/auth/login
      const response = await authApi.post("/login", { email, password });

      if (response.data.success) {
        localStorage.setItem("token", response.data.data.token);
        navigate("/admin");
      }
    } catch (err) {
      setError("Login failed");
    }finally {
      setLoading(false);
    }
  };

  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">FarmSphere Admin</CardTitle>
          <CardDescription>Enter your email to access the dashboard</CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4">
            {error && <p className="text-sm text-red-500 font-medium">{error}</p>}
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <Input 
                type="email" 
                placeholder="admin@farmsphere.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Password</label>
              <Input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" type="submit" disabled={loading}>
              {loading ? "Authenticating..." : "Login"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}