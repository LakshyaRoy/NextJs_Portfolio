import { Center, useGLTF, useTexture, useAnimations } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { Suspense, useRef } from "react";
import CanvasLoader from "./CanvasLoader";
import { Leva, useControls } from "leva";
import Camera from "./Camera";

const Computer = () => {
  // Leva controls for rotation and scale
  //   const {
  //     rotationX,
  //     rotationY,
  //     rotationZ,
  //     scale,
  //     positionX,
  //     positionY,
  //     positionZ,
  //   } = useControls({
  //     rotationX: { min: -Math.PI, max: Math.PI, step: 0.1, value: 0 },
  //     rotationY: { min: -Math.PI, max: Math.PI, step: 0.1, value: 0 },
  //     rotationZ: { min: -Math.PI, max: Math.PI, step: 0.1, value: 0 },
  //     scale: { min: 0.01, max: 15, step: 0.01, value: 0.05 },
  //     positionX: { min: -Math.PI, max: Math.PI, step: 0.1, value: 0 },
  //     positionY: { min: -Math.PI, max: Math.PI, step: 0.1, value: 0 },
  //     positionZ: { min: -Math.PI, max: Math.PI, step: 0.1, value: 0 },
  //   });

  return (
    <>
      {/* <Leva /> */}

      <Canvas
        camera={{ position: [3, 2, 5], fov: 50 }} // Adjust camera perspective
        style={{ width: "100%", height: "100%" }}
      >
        <ambientLight intensity={1} />
        <directionalLight position={[10, 10, 5]} />
        <Center>
          <Suspense fallback={<CanvasLoader />}>
            <Camera>
              <Model
                // rotation={[rotationX, rotationY, rotationZ]} // Apply rotation from controls
                // scale={[scale, scale, scale]} // Apply scale from controls
                // position={[positionX, positionY, positionZ]}
                scale={13}
                rotation={[0, -1, 0]}
                position={[-0.1, -0.7, 0]}
              />
            </Camera>
          </Suspense>
        </Center>
      </Canvas>
    </>
  );
};

export default Computer;

const Model = (props) => {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("/scene.gltf");
  const { actions } = useAnimations(animations, group);

  const KeyBoardtexture = useTexture("textures/Material.001_baseColor.png");
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
          <group
            name="3098fab7ad1c4c87883c6c08c76f4ebffbx"
            rotation={[Math.PI / 2, 0, 0]}
            scale={0.01}
          >
            <group name="Object_2">
              <group name="RootNode">
                <group
                  name="laptop"
                  position={[0, 1.739, 0]}
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={100}
                />
                <group
                  name="Armature"
                  position={[-5.704, 1.279, 0]}
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={100}
                >
                  <group name="Object_6">
                    <primitive object={nodes._rootJoint} />
                    <skinnedMesh
                      name="Object_9"
                      geometry={nodes.Object_9.geometry}
                      material={materials["Material.001"]}
                      skeleton={nodes.Object_9.skeleton}
                    />
                    <group
                      name="Object_8"
                      position={[0, 1.739, 0]}
                      rotation={[-Math.PI / 2, 0, 0]}
                      scale={100}
                    />
                  </group>
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
};

useGLTF.preload("/scene.gltf");
