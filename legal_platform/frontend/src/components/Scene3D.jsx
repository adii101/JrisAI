import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

function FloatingGeometry({ geometry, color, position, scale = 1 }) {
  const mesh = useRef();
  useFrame((state) => {
    mesh.current.rotation.x = state.clock.elapsedTime * 0.15;
    mesh.current.rotation.y = state.clock.elapsedTime * 0.2;
  });
  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={mesh} position={position} scale={scale} geometry={geometry}>
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.15}
          metalness={0.85}
          roughness={0.2}
          transparent
          opacity={0.9}
        />
      </mesh>
    </Float>
  );
}

function WireframeOrb({ radius = 3, color }) {
  const ref = useRef();
  useFrame((state) => {
    ref.current.rotation.y = state.clock.elapsedTime * 0.05;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.2;
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[radius, 32, 24]} />
      <meshBasicMaterial
        color={color}
        wireframe
        transparent
        opacity={0.12}
      />
    </mesh>
  );
}

function ParticleField({ count = 1200, color }) {
  const ref = useRef();
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 40;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 40;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 40;
  }
  useFrame((state) => {
    ref.current.rotation.y = state.clock.elapsedTime * 0.02;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color={color}
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

export default function Scene3D({ isDark }) {
  const accent = isDark ? '#6366f1' : '#4f46e5';
  const secondary = isDark ? '#818cf8' : '#6366f1';
  const wireframe = isDark ? '#94a3b8' : '#64748b';
  const particleColor = isDark ? '#a5b4fc' : '#818cf8';

  const torusKnotGeo = new THREE.TorusKnotGeometry(0.6, 0.2, 100, 16);
  const icosaGeo = new THREE.IcosahedronGeometry(0.5, 1);
  const octaGeo = new THREE.OctahedronGeometry(0.4, 0);

  return (
    <>
      <ambientLight intensity={isDark ? 0.4 : 0.6} />
      <pointLight position={[10, 10, 10]} intensity={1} color={accent} />
      <pointLight position={[-10, -10, 5]} intensity={0.5} color={secondary} />
      <ParticleField color={particleColor} />
      <WireframeOrb radius={4} color={wireframe} />
      <FloatingGeometry
        geometry={torusKnotGeo}
        color={accent}
        position={[-3, 1, -4]}
        scale={1.2}
      />
      <FloatingGeometry
        geometry={icosaGeo}
        color={secondary}
        position={[3, -0.5, -5]}
        scale={1}
      />
      <FloatingGeometry
        geometry={octaGeo}
        color={accent}
        position={[0, 2, -6]}
        scale={0.8}
      />
    </>
  );
}
