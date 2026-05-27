"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, Float, PresentationControls, ContactShadows, Sphere, MeshDistortMaterial } from "@react-three/drei";
import { Suspense } from "react";

function AbstractShape() {
  return (
    <Sphere visible args={[1, 100, 200]} scale={1.5}>
      <MeshDistortMaterial
        color="#6C63FF"
        attach="material"
        distort={0.4}
        speed={2}
        roughness={0.2}
        metalness={0.8}
      />
    </Sphere>
  );
}

export default function Hero3DScene() {
  return (
    <div className="absolute inset-0 w-full h-full z-0">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <Suspense fallback={null}>
          <Environment preset="city" />
          
          <PresentationControls
            global
            rotation={[0, 0.1, 0]}
            polar={[-0.4, 0.2]}
            azimuth={[-1, 0.75]}
            snap={true}
          >
            <Float rotationIntensity={0.5} floatIntensity={2} speed={1.5}>
              <AbstractShape />
            </Float>
          </PresentationControls>

          <ContactShadows position={[0, -2, 0]} opacity={0.5} scale={20} blur={2} far={4.5} />
          
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        </Suspense>
      </Canvas>
    </div>
  );
}
