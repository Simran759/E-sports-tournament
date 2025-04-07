"use client"
import TournamentForm from "@/components/tournamentForm";

export default function CreatePage() {
  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ 
        background: `url('/19381.jpg') center/cover no-repeat`, 
        filter: "brightness(0.8)"  // ✅ Uniform brightness applied directly
      }}
    >
      {/* Transparent Form Container */}
      <div className="flex items-center justify-center w-full">
        <div className="w-full max-w-4xl">
          <TournamentForm />
        </div>
      </div>

      {/* ✨ Bright Text Overlay */}
      <style jsx>{`
        input, label, button, h2, p {
          color: #fff !important;       
          filter: brightness(1.5);      
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.9); 
        }

        button:hover {
          filter: brightness(4);        
        }
      `}</style>
    </div>
  );
}
