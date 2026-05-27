import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Html, useScroll, MeshTransmissionMaterial, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

// The full portfolio content to be displayed inside the laptop
import Hero from "./Hero";
import About from "./About";
import Skills from "./Skills";
import Projects from "./Projects";
import Experience from "./Experience";
import Contact from "./Contact";
import Footer from "./Footer";

export default function CustomLaptop() {
  const group = useRef<THREE.Group>(null);
  const hinge = useRef<THREE.Group>(null);
  const screenContent = useRef<HTMLDivElement>(null);
  const scroll = useScroll();

  useFrame((state, delta) => {
    if (!group.current || !hinge.current || !screenContent.current) return;
    
    const r1 = scroll.range(0, 0.2); // 0 to 20% scroll: open lid
    const r2 = scroll.range(0.2, 0.3); // 20% to 30% scroll: zoom camera
    const r3 = scroll.range(0.3, 1); // 30% to 100% scroll: move website content

    // Lid opening (from closed 0 to open ~1.8 rad)
    hinge.current.rotation.x = THREE.MathUtils.lerp(
      0, // closed
      -1.9, // open
      r1
    );

    // Laptop initial rotation and position
    const targetRotX = THREE.MathUtils.lerp(0.2, 0.33, r2); 
    const targetPosY = THREE.MathUtils.lerp(-1.5, -0.2, r2);
    const targetPosZ = THREE.MathUtils.lerp(0, 2.5, r2); 
    
    group.current.rotation.x = targetRotX;
    group.current.position.y = targetPosY;
    group.current.position.z = targetPosZ;

    // Scroll the portfolio content inside the HTML
    const maxScroll = screenContent.current.scrollHeight - screenContent.current.clientHeight;
    if (maxScroll > 0) {
      screenContent.current.style.transform = `translateY(${-maxScroll * r3}px)`;
    }
  });

  return (
    <group ref={group} position={[0, -1.5, 0]} rotation={[0.2, 0, 0]}>
      {/* Base */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[4.2, 0.1, 3]} />
        <meshStandardMaterial color="#c0c0c0" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Trackpad */}
      <mesh position={[0, 0.06, 0.9]}>
        <boxGeometry args={[1.2, 0.01, 0.8]} />
        <meshStandardMaterial color="#a0a0a0" metalness={0.8} roughness={0.4} />
      </mesh>

      {/* Keyboard */}
      <mesh position={[0, 0.06, -0.2]}>
        <boxGeometry args={[3.8, 0.01, 1.4]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
      </mesh>

      {/* Hinge & Screen */}
      <group ref={hinge} position={[0, 0.05, -1.45]}>
        {/* Hinge Cylinder */}
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.06, 0.06, 3.8, 16]} />
          <meshStandardMaterial color="#111" />
        </mesh>

        {/* Screen Lid */}
        <mesh position={[0, 1.4, 0.02]} castShadow>
          <boxGeometry args={[4.2, 2.8, 0.1]} />
          <meshStandardMaterial color="#c0c0c0" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Screen Bezel (Black) */}
        <mesh position={[0, 1.4, 0.071]}>
          <boxGeometry args={[4.1, 2.7, 0.01]} />
          <meshStandardMaterial color="#050505" roughness={0.5} />
        </mesh>

        {/* The glowing display surface */}
        <mesh position={[0, 1.4, 0.077]}>
          <planeGeometry args={[3.9, 2.5]} />
          <meshBasicMaterial color="#000" />
        </mesh>

        {/* Portfolio Content via Html */}
        <Html
          transform
          distanceFactor={1.5}
          position={[0, 1.4, 0.078]}
          rotation-x={0}
          className="laptop-screen-html"
        >
          <div 
            className="w-[1280px] h-[820px] bg-[#0A0A0F] overflow-hidden rounded-md relative select-none"
            style={{ 
              boxShadow: "inset 0 0 20px rgba(0,0,0,0.5)",
              pointerEvents: "auto"
            }}
          >
            {/* The scrollable wrapper */}
            <div ref={screenContent} className="w-full transition-transform duration-75 ease-out origin-top">
              <div className="pt-20 pb-20 px-12">
                <div className="max-w-5xl mx-auto space-y-40">
                  <Hero />
                  <About />
                  <Skills />
                  <Projects />
                  <Experience />
                  <Contact />
                  <Footer />
                </div>
              </div>
            </div>
            
            {/* Glossy Screen Reflection Overlay */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/[0.02] to-white/[0.08]" />
          </div>
        </Html>
      </group>
    </group>
  );
}
