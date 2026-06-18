import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

function WatchViewer3D() {
  return (
    <div className="h-[400px] w-full">
      <Canvas camera={{ position: [0, 0, 3] }}>
        <ambientLight intensity={5} />

        <directionalLight
          position={[2, 2, 2]}
          intensity={5}
        />

        <mesh rotation={[1.5, 0.5, 0]}>
          <cylinderGeometry args={[1, 1, 0.3, 64]} />

          <meshStandardMaterial
            color="#00FFFF"
            emissive="#00FFFF"
            emissiveIntensity={1}
            metalness={0.5}
            roughness={0.1}
          />
        </mesh>

        <OrbitControls autoRotate />
      </Canvas>
    </div>
  );
}

export default WatchViewer3D;