"use client";
import { useEffect} from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import AuthForm from "@/components/AuthForm";

export default function SigninPage() {
  const router = useRouter();
 


  // Redirect user if session exists
  useEffect(() => {
    
      const session = localStorage.getItem("token");
      const role = localStorage.getItem("role");
      if (session) {
        if (role === "admin") {
          router.push("/admin-dashboard");
        } else {
          router.push("/player-dashboard");
        }
      }
    }
  , [ router]);

  const particlesInit = async (engine: any) => {
    await loadSlim(engine);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-900 to-black text-white relative overflow-hidden">
      {/* Floating Particles */}
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

      {/* Animated Form Wrapper */}
      <motion.div
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <AuthForm action="login" />
      </motion.div>
    </div>
  );
}
