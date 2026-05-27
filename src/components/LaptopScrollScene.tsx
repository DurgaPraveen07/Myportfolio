"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, ScrollControls, ContactShadows } from "@react-three/drei";
import { Suspense, useEffect, useState } from "react";
import CustomLaptop from "./CustomLaptop";

export default function LaptopScrollScene() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="absolute inset-0 w-full h-screen z-0 bg-[#0A0A0F]">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <Suspense fallback={null}>
          <Environment preset="city" />
          
          <ScrollControls pages={5} damping={0.1}>
            <CustomLaptop />
          </ScrollControls>

          <ContactShadows position={[0, -2, 0]} opacity={0.5} scale={20} blur={2} far={4.5} />
          
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 20, 10]} angle={0.15} penumbra={1} intensity={2} castShadow />
        </Suspense>
      </Canvas>
      
      {/* Scroll indicator overlaid on top of 3D scene */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none z-10 text-white/50">
        <span className="text-xs uppercase tracking-[0.2em]">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-white/50 to-transparent" />
      </div>
    </div>
  );
}
