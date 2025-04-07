"use client"; 

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Rajdhani } from "next/font/google"; 

// Configure Rajdhani
const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  variable: "--font-rajdhani",
});

// Dynamically import `react-tsparticles`
const Particles = dynamic(() => import("react-tsparticles"), { ssr: false });

export default function Home() {
  const [initParticles, setInitParticles] = useState(false);

  useEffect(() => {
    setInitParticles(true); // Ensure particles only load on the client
  }, []);

  return (
    <div 
      className={`flex flex-col items-center justify-center h-screen text-white relative overflow-hidden bg-cover bg-center ${rajdhani.variable}`}
      style={{ backgroundImage: "url('/esports.jpg')" }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60 z-10"></div>

      {/* Render Particles only on client */}
      {initParticles && (
        <Particles
          id="tsparticles"
          className="absolute top-0 left-0 w-full h-full z-0"
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
      )}

      {/* Animated Title */}
      <motion.div 
        className="relative z-20 text-center flex flex-col items-center space-y-8"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Title */}
        <motion.h1 
          className="text-6xl font-bold drop-shadow-lg mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          style={{
            fontFamily: "'Press Start 2P', cursive",
            textShadow: "0 0 15px rgba(255, 0, 0, 0.8)", 
          }}
        >
          WELCOME TO{" "}
          <span className="text-blue-500">ESPORTS-MANIA</span> 
        </motion.h1>

        {/* Subtitle */}
        <p
          className="text-lg mb-25"
          style={{
            fontFamily: "'Press Start 2P', cursive",
            textShadow: "0 0 10px rgba(255, 255, 255, 0.8)",
          }}
        >
          Relish the world of gaming!
        </p>

        {/* Get Started as Text Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Link href="/auth">
            <motion.p
              className="text-black text-2xl cursor-pointer hover:text-red-600 transition-colors"
              style={{ fontFamily: "'Press Start 2P', cursive" }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              ENTER SPHERE
            </motion.p>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
