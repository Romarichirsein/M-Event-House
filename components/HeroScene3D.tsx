'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

function GoldenParticles({ progress }: { progress: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 6000;

  // Pre-allocate positions and colors
  const { positions, colors, spherePositions, spiralPositions, finalPositions } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const cols = new Float32Array(count * 3);
    const spherePos = new Float32Array(count * 3);
    const spiralPos = new Float32Array(count * 3);
    const finalPos = new Float32Array(count * 3);

    const color1 = new THREE.Color('#C9A227');
    const color2 = new THREE.Color('#E8C84A');

    for (let i = 0; i < count; i++) {
        // Initial Chaos
        const r = 5 + Math.random() * 5;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        pos[i * 3 + 2] = r * Math.cos(phi);

        // Sphere
        const sr = 3;
        const stheta = Math.random() * Math.PI * 2;
        const sphi = Math.acos(2 * Math.random() - 1);
        spherePos[i * 3] = sr * Math.sin(sphi) * Math.cos(stheta);
        spherePos[i * 3 + 1] = sr * Math.sin(sphi) * Math.sin(stheta);
        spherePos[i * 3 + 2] = sr * Math.cos(sphi);

        // Spiral
        const angle = 0.1 * i;
        const spiralR = 0.05 * i;
        spiralPos[i * 3] = spiralR * Math.cos(angle);
        spiralPos[i * 3 + 1] = (i / count) * 10 - 5;
        spiralPos[i * 3 + 2] = spiralR * Math.sin(angle);

        // Final Logo-like shape (Diamond/Star)
        const fr = (i % 2 === 0 ? 4 : 1) * Math.random();
        const ftheta = Math.random() * Math.PI * 2;
        finalPos[i * 3] = fr * Math.cos(ftheta);
        finalPos[i * 3 + 1] = fr * Math.sin(ftheta);
        finalPos[i * 3 + 2] = (Math.random() - 0.5) * 2;

        // Color mix
        const c = Math.random() > 0.5 ? color1 : color2;
        cols[i * 3] = c.r;
        cols[i * 3 + 1] = c.g;
        cols[i * 3 + 2] = c.b;
    }
    return { positions: pos, colors: cols, spherePositions: spherePos, spiralPositions: spiralPos, finalPositions: finalPos };
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const posAttr = pointsRef.current.geometry.attributes.position;
    const time = state.clock.getElapsedTime();

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      let targetX, targetY, targetZ;

      if (progress < 0.25) {
        // Chaos to Sphere
        const t = progress / 0.25;
        targetX = THREE.MathUtils.lerp(positions[i3], spherePositions[i3], t);
        targetY = THREE.MathUtils.lerp(positions[i3+1], spherePositions[i3+1], t);
        targetZ = THREE.MathUtils.lerp(positions[i3+2], spherePositions[i3+2], t);
      } else if (progress < 0.5) {
        // Sphere to Spiral
        const t = (progress - 0.25) / 0.25;
        targetX = THREE.MathUtils.lerp(spherePositions[i3], spiralPositions[i3], t);
        targetY = THREE.MathUtils.lerp(spherePositions[i3+1], spiralPositions[i3+1], t);
        targetZ = THREE.MathUtils.lerp(spherePositions[i3+2], spiralPositions[i3+2], t);
      } else if (progress < 0.75) {
        // Spiral to Final
        const t = (progress - 0.5) / 0.25;
        targetX = THREE.MathUtils.lerp(spiralPositions[i3], finalPositions[i3], t);
        targetY = THREE.MathUtils.lerp(spiralPositions[i3+1], finalPositions[i3+1], t);
        targetZ = THREE.MathUtils.lerp(spiralPositions[i3+2], finalPositions[i3+2], t);
      } else {
        // Final float
        const t = (progress - 0.75) / 0.25;
        targetX = finalPositions[i3] + Math.sin(time + i) * 0.1;
        targetY = finalPositions[i3+1] + Math.cos(time + i) * 0.1;
        targetZ = finalPositions[i3+2];
      }

      posAttr.setXYZ(i, targetX, targetY, targetZ);
    }
    posAttr.needsUpdate = true;
    pointsRef.current.rotation.y = time * 0.1;
  });

  return (
    <Points ref={pointsRef} positions={positions} colors={colors}>
      <PointMaterial
        size={0.02}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

export default function HeroScene3D({ progress }: { progress: number }) {
  return (
    <div className="absolute inset-0 bg-[var(--bg-primary)]">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 50 }}
        gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
        aria-label="Animation 3D de particules dorées illustrant la création d'un événement sur mesure"
        role="img"
      >
        <color attach="background" args={['transparent']} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={2} color="#C9A227" />
        
        <GoldenParticles progress={progress} />
        
        <EffectComposer disableNormalPass>
          <Bloom 
            luminanceThreshold={0.2} 
            mipmapBlur 
            intensity={1.2} 
            radius={0.4}
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
