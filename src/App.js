import React, {useRef} from 'react';
import './App.scss';

import {Canvas, useFrame} from "react-three-fiber";
import {softShadows, OrbitControls } from "drei";

softShadows();
const SpinningMesh = ({position, args, color}) =>{
  const mesh = useRef(null);
  useFrame (()=>(mesh.current.rotation.x = mesh.current.rotation.y += 0.01))
  return(
  <mesh castShadow position={position} ref = {mesh}>
    <boxBufferGeometry attach='geometry' args= {args}/>
    <meshStandardMaterial attach = 'material'color = {color}/>
  </mesh>
  )
}

function App() {
  
  return (
    <>
    <Canvas 
      shadowMap
      colorManagement 
      camera = {{position: [-5,2,10], fov:60}}>
      <ambientLight intensity = {0.3} />
      <directionalLight
        castShadow
        position= {[0,10,0]}
        intensity = {1.5}
        shadow-mapSize-width={1024}
        shadow-mapSize-hight={1024}
        shadow-camera-far = {50}
        shadow-camera-right = {10}
        shadow-camera-left = {-10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <pointLight position = {[-10,0,-20]} intensity={0.3} />
      <pointLight position = {[0,-10, 0]} intensity={1.5} />

      <group>
        <mesh receiveShadow rotation= {[-Math.PI/2,0,0]} position={[0,-3,0]} >
          <planeBufferGeometry attach='geometry' args={[100,100]} />
          <shadowMaterial attach='material' opacity={0.3} />
        </mesh>


      </group>




      <SpinningMesh position={[0,1,0]} args = {[3,2,1]} color = 'lightblue'/>
      <SpinningMesh position={[-2,1,-5]} color = "pink"/>
      <SpinningMesh position={[5,1,-2]} color = "pink"/>
      <OrbitControls/>
    </Canvas>
  </>
  );
}

export default App;
