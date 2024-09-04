import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import CanvasLoader from "../Loader";

const Computers = ({ isMobile, onModelLoaded }) => {
  const [rotation, setRotation] = useState([-0.15, 0, -0.3]);
  const { scene } = useGLTF("./gaming_laptop/scene.gltf");

  useEffect(() => {
    if (scene) {
      // Notify that the model is loaded
      onModelLoaded();
    }
  }, [scene, onModelLoaded]);

  const onFrame = (e) => {
    setRotation([rotation[0], rotation[1] + 0.001, rotation[2]]);
  };

  return (
    <mesh onBeforeRender={onFrame}>
      <hemisphereLight intensity={0.15} groundColor="black" />
      <pointLight intensity={0.7} />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={0.6}
      />
      <primitive
        object={scene}
        scale={isMobile ? 0.8 : 1}
        position={[0, -2.7, 0]}
        rotation={rotation}
      />
    </mesh>
  );
};

const ComputersCanvas = ({ onModelLoaded }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 640px)");
    setIsMobile(mediaQuery.matches);

    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addEventListener("change", handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <Canvas
      frameloop="demand"
      shadows
      camera={{ position: [20, 3, 10], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Computers isMobile={isMobile} onModelLoaded={onModelLoaded} />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default ComputersCanvas;
