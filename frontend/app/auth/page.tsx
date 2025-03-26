"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

export default function Auth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  // Initialize particles
  const particlesInit = async (engine: any) => {
    await loadSlim(engine);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role"); // Get role from localStorage

    if (token && role) {
      setIsAuthenticated(true);

      // Redirect based on role
      if (role === "admin") {
        router.push("/admin-dashboard");
      } else if (role === "player") {
        router.push("/player-dashboard");
      }
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-gray-900 to-black text-white relative overflow-hidden">
      
      {/* Animated Particles */}
      <Particles
        id="tsparticles"
        className="absolute top-0 left-0 w-full h-full z-0"
        init={particlesInit}
        options={{
          background: { color: "transparent" },
          particles: {
            number: { value: 60, density: { enable: true, value_area: 1000 } },
            color: { value: "#ffffff" },
            shape: { type: "circle" },
            opacity: { value: 0.5, random: true },
            size: { value: 3, random: true },
            move: { enable: true, speed: 1, direction: "none", random: false },
            links: { enable: true, distance: 120, color: "#ffffff", opacity: 0.4 },
          },
          interactivity: {
            events: {
              onHover: { enable: true, mode: "repulse" },
              onClick: { enable: true, mode: "push" },
            },
            modes: {
              repulse: { distance: 100, duration: 0.4 },
              push: { quantity: 4 },
            },
          },
        }}
      />

      {/* Authentication Logic */}
      {isAuthenticated ? (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10"
        >
          <Button
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("role"); // Clear role on logout
              setIsAuthenticated(false);
              router.push("/"); // Redirect to home/login page after logout
            }}
            className="bg-gray-700 hover:bg-gray-800 px-8 py-3 text-white rounded-none text-lg"
            aria-label="Logout"
          >
            LOGOUT
          </Button>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col gap-8 relative z-10"
        >
          <div className="flex flex-col items-center">
            <span className="text-sm font-mono text-gray-400 mb-2">New here?</span>
            <Link href="/signup" className="w-full">
              <Button className="bg-gray-700 font-mono font-bold hover:bg-gray-800 px-8 py-3 text-white rounded-none text-lg w-full" aria-label="Sign Up">
                SIGN UP
              </Button>
            </Link>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-sm font-mono text-gray-400 mb-2">Existing user?</span>
            <Link href="/login" className="w-full">
              <Button className="bg-gray-700 font-mono font-bold hover:bg-gray-800 px-8 py-3 text-white rounded-none text-lg w-full" aria-label="Login">
                LOGIN
              </Button>
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  );
}
