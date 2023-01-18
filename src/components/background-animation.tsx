import { Canvas, extend, useFrame } from "@react-three/fiber"
import React, { useRef, useState } from "react"
import type * as THREE from "three"
import {
	PerspectiveCamera,
	OrbitControls,
	MeshDistortMaterial,
	MeshWobbleMaterial,
	shaderMaterial,
} from "@react-three/drei"

import solidGreenVert from "../glsl/solid-green.vert"
import solidGreenFrag from "../glsl/solid-green.frag"

const WavingMaterial = shaderMaterial(
	{ uTime: 0 },
	solidGreenVert,
	solidGreenFrag
)

extend({ WavingMaterial })

declare global {
	namespace JSX {
		interface IntrinsicElements {
			wavingMaterial: {
				wireframe?: boolean
				key?: string
				uTime: number
			}
		}
	}
}

const PlaneMesh = () => {
	const mesh = useRef<THREE.Mesh>(null)
	const [time, setTime] = useState(0)

	useFrame((_, delta) => setTime(time + delta / 10))

	return (
		<>
			<mesh ref={mesh} rotation={[-Math.PI / 2, 0, 0]}>
				<planeGeometry args={[0.5, 0.5, 100, 100]} />
				<wavingMaterial key={WavingMaterial.key} uTime={time} />
			</mesh>
			<mesh position={[0.04, 0, 0.07]}>
				<icosahedronGeometry args={[0.02, 1]}>
					<wavingMaterial key={WavingMaterial.key} uTime={time} />
				</icosahedronGeometry>
			</mesh>
		</>
	)
}

const Camera = () => {
	return (
		<>
			<PerspectiveCamera
				makeDefault
				fov={15}
				position={[0, 0.27, 0.64]}
				rotation={[-0.46, 0, 0.03]}
			/>
			{/* <OrbitControls /> */}
		</>
	)
}

const BackgroundAnimation = () => {
	return (
		<Canvas className="w-full h-full">
			<PlaneMesh />
			<Camera />
			<ambientLight />
		</Canvas>
	)
}

export default BackgroundAnimation
