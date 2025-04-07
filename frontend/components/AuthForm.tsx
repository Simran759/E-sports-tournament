"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import axios from "axios";
interface AuthFormProps {
  action: "signup" | "login";
}
const baseurl=process.env.NEXT_PUBLIC_API_BASE_URL

export default function AuthForm({ action }: AuthFormProps) {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"admin" | "player">("player");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload =
        action === "signup" ? { username, email, password, role } : { email, password };
      const response = await axios.post(`${baseurl}/auth/${action}`, payload);
      
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);
      localStorage.setItem("userName",response.data.userName);
      // localStorage.setItem("user",response.data.user);
      alert(`${action === "signup" ? "Signup" : "Login"} Successful ✅`);
      router.push(`/${response.data.role}-dashboard`);
    } catch (error: any) {
      alert(error.response?.data?.error || `${action === "signup" ? "Signup" : "Login"} Failed ❌`);
      if (action === "login") {
        router.push("/signup");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen from-gray-900 to-black text-white relative">
      
      {/* Glassmorphism Form Container (No Outline) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="backdrop-blur-lg bg-white/5 p-8 rounded-lg shadow-lg w-80 text-center"
      >
      

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Username Field (Signup Only) */}
          {action === "signup" && (
            <input
              className="p-3 bg-black-700 font-mono text-white rounded-md focus:outline-none focus:ring-gray-500 placeholder-gray-300 text-center"
              style={{ fontFamily: "Rajdhani, sans-serif" }}
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          )}

          {/* Email Field */}
          <input
            className="p-3 bg-black-700 font-mono text-white rounded-md focus:outline-none focus:ring-gray-500 placeholder-gray-300 text-center"
            type="email"
            style={{ fontFamily: "Rajdhani, sans-serif" }}
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* Password Field */}
          <input
            className="p-3 bg-black-700 font-mono text-white rounded-md focus:outline-none focus:ring-gray-500 placeholder-gray-300 text-center"
            type="password"
            style={{ fontFamily: "Rajdhani, sans-serif" }}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* Role Selection (Signup Only) */}
          {action === "signup" && (
           <select
           className="p-3 bg-black-700 font -mono text-white font-mono rounded-md focus:outline-none focus:ring-gray-500"
           style={{ fontFamily: "Rajdhani, sans-serif" }}
           value={role}
           onChange={(e) => setRole(e.target.value as "admin" | "player")}
         >
           <option value="player">Player</option>
           <option value="admin">Admin</option>
         </select>
         
          )}

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={loading}
            className="bg-gray-700 font-mono hover:bg-gray-800 px-6 py-3 text-white rounded-none font-semibold text-lg transition-all"
            style={{ fontFamily: "'Press Start 2P', cursive" }}
          >
            {loading ? "Processing..." : action === "signup" ? "SIGN UP" : "LOGIN"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}