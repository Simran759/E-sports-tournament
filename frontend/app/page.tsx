// "use client";
// import Link from "next/link";
// import { useEffect, useState } from "react"; // Import hooks
// import { motion } from "framer-motion";
// import { Button } from "@/components/ui/button";
// import Particles from "react-tsparticles";
// import { loadSlim } from "tsparticles-slim";

// export default function Home() {
//   const [initParticles, setInitParticles] = useState(false);

//   useEffect(() => {
//     setInitParticles(true); // Ensure particles load only on the client
//   }, []);

//   return (
//     <div 
//       className="flex flex-col items-center justify-center h-screen text-white relative overflow-hidden bg-cover bg-center"
//       style={{ backgroundImage: "url('/esports.jpg')" }} // Ensure correct path
//     >
//       {/* Dark Overlay */}
//       <div className="absolute inset-0 bg-black/60"></div>

//       {/* Animated Particles - Only render on client */}
//       {initParticles && (
//         <Particles
//           id="tsparticles"
//           className="absolute top-0 left-0 w-full h-full z-0"
//           init={async (engine) => await loadSlim(engine)}
//           options={{
//             background: { color: "transparent" },
//             particles: {
//               number: { value: 60, density: { enable: true, value_area: 1000 } },
//               color: { value: "#ffffff" },
//               shape: { type: "circle" },
//               opacity: { value: 0.5, random: true },
//               size: { value: 3, random: true },
//               move: { enable: true, speed: 1, direction: "none", random: false },
//               links: { enable: true, distance: 120, color: "#ffffff", opacity: 0.4 },
//             },
//             interactivity: {
//               events: {
//                 onHover: { enable: true, mode: "repulse" },
//                 onClick: { enable: true, mode: "push" },
//               },
//               modes: {
//                 repulse: { distance: 100, duration: 0.4 },
//                 push: { quantity: 4 },
//               },
//             },
//           }}
//         />
//       )}

//       {/* Content Section */}
//       <motion.h1 
//         className="text-7xl font-mono font-extrabold mb-6 text-center drop-shadow-lg relative z-10"
//         initial={{ opacity: 0, y: -50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8, ease: "easeOut" }}
//       >
//         WELCOME TO{" "}
//         <span className="text-blue-500">ESPORTS</span> TOURNAMENT🎮
//       </motion.h1>

//       <p className="text-lg font-mono text-gray-300 mb-10 text-center max-w-md relative z-10">
//         Relish the world of gaming!
//       </p>

//       {/* Get Started Button */}
//       <motion.div
//         initial={{ opacity: 0, scale: 0.8 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 0.6, delay: 0.5 }}
//         className="relative z-10"
//       >
//         <Link href="/auth">
//           <Button className="bg-gray-700 font-mono font-extrabold hover:bg-gray-800 px-8 py-4 rounded-none text-lg shadow-md transition-transform transform hover:scale-105">
//             GET STARTED
//           </Button>
//         </Link>
//       </motion.div>
//     </div>
//   );
// }
"use client"; // Ensure this is at the top

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";

// Dynamically import `react-tsparticles`
const Particles = dynamic(() => import("react-tsparticles"), { ssr: false });

export default function Home() {
  const [initParticles, setInitParticles] = useState(false);

  useEffect(() => {
    setInitParticles(true); // Ensures particles only load on the client
  }, []);

  return (
    <div 
      className="flex flex-col items-center justify-center h-screen text-white relative overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: "url('/esports.jpg')" }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

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
      <motion.h1 
        className="text-7xl font-mono font-extrabold mb-6 text-center drop-shadow-lg relative z-10"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        WELCOME TO{" "}
        <span className="text-blue-500">ESPORTS</span> TOURNAMENT 🎮
      </motion.h1>

      <p className="text-lg font-mono text-gray-300 mb-10 text-center max-w-md relative z-10">
        Relish the world of gaming!
      </p>

      {/* Get Started Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="relative z-10"
      >
        <Link href="/auth">
          <Button className="bg-gray-700 font-mono font-extrabold hover:bg-gray-800 px-8 py-4 rounded-none text-lg shadow-md transition-transform transform hover:scale-105">
            GET STARTED
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}
