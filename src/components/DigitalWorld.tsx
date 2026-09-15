import React from "react";
import TheLightChamberMusic from "./TheLightChamberMusic";

interface DigitalWorldProps {
  onBack: () => void;
}

export default function DigitalWorld({ onBack }: DigitalWorldProps) {
  return (
    <div className="min-h-screen bg-[#030303] text-[#F5F2EA]">
      <TheLightChamberMusic onBack={onBack} />
    </div>
  );
}
