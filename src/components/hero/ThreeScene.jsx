import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import { useTheme } from '../../hooks/useTheme';

function NeuralMesh({ isDark }) {
  const meshRef = useRef();
  const linesRef = useRef();
  const mousePos = useRef({ x: 0, y: 0 });

  // Generate neural network-like node positions
  const { nodes, edges, positions, linePositions } = useMemo(() => {
    const nodeCount = 40;
    const nodesArr = [];
    const edgesArr = [];

    for (let i = 0; i < nodeCount; i++) {
      nodesArr.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 5,
          (Math.random() - 0.5) * 5,
          (Math.random() - 0.5) * 3
        )
      );
    }

    // Create edges between nearby nodes
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        const dist = nodesArr[i].distanceTo(nodesArr[j]);
        if (dist < 2.0) {
          edgesArr.push([i, j]);
        }
      }
    }

    const positions = new Float32Array(nodeCount * 3);
    nodesArr.forEach((node, i) => {
      positions[i * 3] = node.x;
      positions[i * 3 + 1] = node.y;
      positions[i * 3 + 2] = node.z;
    });

    const linePositions = new Float32Array(edgesArr.length * 6);
    edgesArr.forEach((edge, i) => {
      const a = nodesArr[edge[0]];
      const b = nodesArr[edge[1]];
      linePositions[i * 6] = a.x;
      linePositions[i * 6 + 1] = a.y;
      linePositions[i * 6 + 2] = a.z;
      linePositions[i * 6 + 3] = b.x;
      linePositions[i * 6 + 4] = b.y;
      linePositions[i * 6 + 5] = b.z;
    });

    return { nodes: nodesArr, edges: edgesArr, positions, linePositions };
  }, []);

  // Track mouse for parallax
  useMemo(() => {
    const handleMouseMove = (e) => {
      mousePos.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mousePos.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.05 + mousePos.current.x * 0.3;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.03) * 0.1 + mousePos.current.y * 0.15;
    }
  });

  const nodeColor = isDark ? '#F5A623' : '#E8763A';
  const lineColor = isDark ? '#F5A623' : '#E8763A';

  return (
    <group ref={meshRef}>
      {/* Nodes as spheres */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.08}
          color={nodeColor}
          transparent
          opacity={isDark ? 0.9 : 0.7}
          sizeAttenuation
        />
      </points>

      {/* Edges as lines */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={linePositions.length / 3}
            array={linePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color={lineColor}
          transparent
          opacity={isDark ? 0.25 : 0.15}
          linewidth={1}
        />
      </lineSegments>

      {/* Glowing core nodes */}
      {nodes.slice(0, 12).map((node, i) => (
        <mesh key={i} position={[node.x, node.y, node.z]}>
          <sphereGeometry args={[0.04 + Math.random() * 0.03, 12, 12]} />
          <meshStandardMaterial
            color={nodeColor}
            emissive={nodeColor}
            emissiveIntensity={isDark ? 2 : 0.8}
            transparent
            opacity={0.8}
          />
        </mesh>
      ))}
    </group>
  );
}

function Scene({ isDark }) {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={0.5} color="#F5A623" />
      <pointLight position={[-5, -5, -3]} intensity={0.3} color="#E8763A" />

      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <NeuralMesh isDark={isDark} />
      </Float>

      <Sparkles
        count={60}
        scale={6}
        size={isDark ? 1.5 : 1}
        speed={0.3}
        color={isDark ? '#F5A623' : '#E8763A'}
        opacity={isDark ? 0.5 : 0.3}
      />
    </>
  );
}

export default function ThreeScene() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className="w-full h-full min-h-[400px]">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Scene isDark={isDark} />
      </Canvas>
    </div>
  );
}
