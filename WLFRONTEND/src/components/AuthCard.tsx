import { Card } from "./Card";
import { Button } from "./Button";
import { useState } from "react";

interface AuthCardProps {
    title: string;
    buttonText: string;
    onSubmit?: (username:string, password:string) => void;
}

export function AuthCard({title,buttonText,onSubmit}:AuthCardProps) {
    const[username,setUsername] = useState("");
    const[password,setPassword] = useState("");

    function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(username, password);
    }   
    }
    return(
     <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <Card>
            <h2 className="text-xl font-bold mb-4 text-center">{title}</h2>
             <form onSubmit={handleSubmit} className="space-y-4">
             <div className="flex flex-col space-y-1">
            <label className="text-sm font-medium">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter username"
            />
          </div>
          <div className="flex flex-col space-y-1">
            <label className="text-sm font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter password"
            />
          </div>
          <Button text={buttonText} variant="primary" fullWidth />
        </form>
        </Card>
     </div>   
    )

}