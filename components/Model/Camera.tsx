"use client";

import { useFrame } from "@react-three/fiber";
import { easing } from "maath";
import React, { useRef } from "react";

const Camera = ({ children }) => {
  const groupRef = useRef();

  useFrame((state, delta) => {
    // Move the camera dynamically towards the model
    easing.dampE(
      groupRef.current.rotation,
      [state.pointer.y / 3, -state.pointer.x / 5, 0],
      0.5,
      delta
    );
  });

  return <group ref={groupRef}>{children}</group>;
};

export default Camera;
