import { useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const PARTICLE_COUNT = 1200;
const GLOBE_RADIUS = 2.25;
const CONNECTION_DISTANCE = 0.32;
const MAX_CONNECTIONS = 1700;

const particleVertexShader = `
  uniform float uTime;
  uniform float uSize;

  attribute float pulseOffset;

  varying float vPulse;

  void main() {
    vec3 direction = normalize(position);
    float pulse = sin(uTime * 1.25 + pulseOffset * 6.28318530718);
    vec3 morphed = position + direction * pulse * 0.045;

    vec4 mvPosition = modelViewMatrix * vec4(morphed, 1.0);
    gl_PointSize = uSize * (300.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;

    vPulse = 0.65 + pulse * 0.35;
  }
`;

const particleFragmentShader = `
  precision highp float;

  uniform vec3 uColor;
  uniform float uOpacity;

  varying float vPulse;

  void main() {
    vec2 uv = gl_PointCoord - vec2(0.5);
    float circle = 1.0 - smoothstep(0.32, 0.5, length(uv));
    gl_FragColor = vec4(uColor, uOpacity * circle * (0.78 + vPulse * 0.22));
  }
`;

function buildGlobeData() {
  const positions = new Float32Array(PARTICLE_COUNT * 3);
  const pulseOffsets = new Float32Array(PARTICLE_COUNT);
  const vectors = [];

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const y = 1 - (i / (PARTICLE_COUNT - 1)) * 2;
    const radiusAtY = Math.sqrt(1 - y * y);
    const theta = i * Math.PI * (3 - Math.sqrt(5));
    const x = Math.cos(theta) * radiusAtY;
    const z = Math.sin(theta) * radiusAtY;

    const point = new THREE.Vector3(x, y, z).multiplyScalar(GLOBE_RADIUS);
    vectors.push(point);

    positions[i * 3] = point.x;
    positions[i * 3 + 1] = point.y;
    positions[i * 3 + 2] = point.z;
    pulseOffsets[i] = (i % 97) / 97;
  }

  const connectionCounts = new Uint8Array(PARTICLE_COUNT);
  const linePositions = [];

  for (let i = 0; i < PARTICLE_COUNT && linePositions.length / 6 < MAX_CONNECTIONS; i++) {
    for (let j = i + 1; j < PARTICLE_COUNT && linePositions.length / 6 < MAX_CONNECTIONS; j++) {
      if (connectionCounts[i] >= 3 || connectionCounts[j] >= 3) continue;
      if (vectors[i].distanceTo(vectors[j]) > CONNECTION_DISTANCE) continue;

      linePositions.push(
        vectors[i].x,
        vectors[i].y,
        vectors[i].z,
        vectors[j].x,
        vectors[j].y,
        vectors[j].z
      );
      connectionCounts[i] += 1;
      connectionCounts[j] += 1;
    }
  }

  return {
    positions,
    pulseOffsets,
    linePositions: new Float32Array(linePositions),
  };
}

function ParticleGlobe({ isDark }) {
  const groupRef = useRef();
  const particleMaterialRef = useRef();
  const lineMaterialRef = useRef();
  const targetRotation = useRef({ x: 0, y: 0 });
  const currentRotation = useRef({ x: 0, y: 0 });
  const autoRotation = useRef(0);
  const { size } = useThree();

  const globe = useMemo(() => buildGlobeData(), []);
  const isCompact = size.width < 900;

  const theme = useMemo(
    () => ({
      node: isDark ? '#00c9a7' : '#075985',
      connection: isDark ? '#4f8ef7' : '#1d4ed8',
      opacity: isDark ? 0.52 : 0.72,
      lineOpacity: isDark ? 0.24 : 0.32,
    }),
    [isDark]
  );

  useEffect(() => {
    const handleMouseMove = (event) => {
      const x = event.clientX / window.innerWidth - 0.5;
      const y = event.clientY / window.innerHeight - 0.5;
      targetRotation.current.y = x * 0.42;
      targetRotation.current.x = y * 0.24;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    currentRotation.current.x = THREE.MathUtils.lerp(
      currentRotation.current.x,
      targetRotation.current.x,
      0.045
    );
    currentRotation.current.y = THREE.MathUtils.lerp(
      currentRotation.current.y,
      targetRotation.current.y,
      0.045
    );

    autoRotation.current += delta * 0.09;
    groupRef.current.rotation.y = autoRotation.current + currentRotation.current.y;
    groupRef.current.rotation.x = currentRotation.current.x;
    groupRef.current.rotation.z = currentRotation.current.y * 0.08;

    if (particleMaterialRef.current) {
      particleMaterialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      particleMaterialRef.current.uniforms.uSize.value = isCompact ? 0.052 : 0.064;
      particleMaterialRef.current.uniforms.uColor.value.set(theme.node);
      particleMaterialRef.current.uniforms.uOpacity.value = theme.opacity;
    }

    if (lineMaterialRef.current) {
      lineMaterialRef.current.opacity =
        theme.lineOpacity + Math.sin(state.clock.elapsedTime * 1.25) * (isDark ? 0.07 : 0.04);
    }
  });

  return (
    <group
      ref={groupRef}
      position={[isCompact ? 0.95 : 2.55, isCompact ? -0.22 : 0.04, 0]}
      scale={isCompact ? 0.86 : isDark ? 1 : 0.94}
    >
      <points frustumCulled={false}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={globe.positions.length / 3}
            array={globe.positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-pulseOffset"
            count={globe.pulseOffsets.length}
            array={globe.pulseOffsets}
            itemSize={1}
          />
        </bufferGeometry>
        <shaderMaterial
          ref={particleMaterialRef}
          vertexShader={particleVertexShader}
          fragmentShader={particleFragmentShader}
          uniforms={{
            uTime: { value: 0 },
            uSize: { value: isCompact ? 0.052 : 0.064 },
            uColor: { value: new THREE.Color(theme.node) },
            uOpacity: { value: theme.opacity },
          }}
          transparent
          depthWrite={false}
          blending={isDark ? THREE.AdditiveBlending : THREE.NormalBlending}
        />
      </points>

      <lineSegments frustumCulled={false}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={globe.linePositions.length / 3}
            array={globe.linePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          ref={lineMaterialRef}
          color={theme.connection}
          transparent
          opacity={theme.lineOpacity}
          depthWrite={false}
          blending={isDark ? THREE.AdditiveBlending : THREE.NormalBlending}
        />
      </lineSegments>
    </group>
  );
}

function Scene({ isDark }) {
  return (
    <>
      <ambientLight intensity={isDark ? 0.6 : 1.25} />
      <pointLight position={[3, 2.5, 4]} intensity={isDark ? 2.6 : 1.15} color={isDark ? '#00c9a7' : '#075985'} />
      <pointLight position={[-3, -1.5, 3]} intensity={isDark ? 1.8 : 0.85} color={isDark ? '#4f8ef7' : '#1d4ed8'} />
      <ParticleGlobe isDark={isDark} />
    </>
  );
}

export default function ThreeScene({ isDark = true }) {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 h-full w-full"
      aria-hidden="true"
    >
      <Canvas
        dpr={[1, 1.5]}
        frameloop="always"
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        camera={{ position: [0, 0, 7.5], fov: 48 }}
      >
        <Scene isDark={isDark} />
      </Canvas>
    </div>
  );
}
