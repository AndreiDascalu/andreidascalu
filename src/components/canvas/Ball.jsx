import { Suspense , useState} from "react"
import { Canvas } from "@react-three/fiber"
import { Decal, Float, OrbitControls, Preload, useTexture } from "@react-three/drei"
import CanvasLoader from "../Loader"

const Ball = (props) => {
  const [decal] = useTexture([props.imgUrl])
  const [isHovered, setIsHovered] = useState(false)
  const handleMouseOver = () => {
    setIsHovered(true)
  }

  const handleMouseOut = () => {
    setIsHovered(false)
  }

  const position = isHovered ? [0, 0, -2] : [0, 0, 1]

  return (
    <Float speed={1.75} rotationIntensity={1} floatIntensity={2}>
      <ambientLight intensity={0.25} />
      <directionalLight position={[0, 0, 0.05]} />
      <mesh castShadow receiveShadow scale={2.75}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color='#fff8eb'
          polygonOffset
          polygonOffsetFactor={-5}
          flatShading
        />
        <Decal
          position={[0, 0, 1]}
          rotation={[2 * Math.PI, 0, 6.25]}
          scale={1}
          map={decal}
          flatShading
        />
      </mesh>
      {isHovered && (
        <mesh position={position}>
          <textGeometry attach="geometry" args={["Hello World", { size: 0.1, height: 0.05 }]} />
          <meshStandardMaterial attach="material" color="black" />
        </mesh>
      )}
      <mesh
        onPointerOver={handleMouseOver}
        onPointerOut={handleMouseOut}
      />
    </Float>
  );
}


const BallCanvas = ({icon}) => {
  return(<Canvas
    frameloop="always"
    gl={{ preserveDrawingBuffer: true }}
  >
    <Suspense fallback={<CanvasLoader />}>
      <OrbitControls
        enableZoom={false}
      />
      <Ball imgUrl={icon} />
    </Suspense>
    <Preload all />
  </Canvas>
  )
}
export default BallCanvas