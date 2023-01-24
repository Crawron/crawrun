import { Canvas, extend, useFrame } from "@react-three/fiber"
import React, { useRef, useState } from "react"
import type * as THREE from "three"
import {
	PerspectiveCamera,
	OrbitControls,
	MeshDistortMaterial,
	MeshWobbleMaterial,
	shaderMaterial,
	useGLTF,
} from "@react-three/drei"

import solidGreenVert from "../glsl/solid-green.vert"
import solidGreenFrag from "../glsl/solid-green.frag"
import type { Mesh } from "three"

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
				<planeGeometry args={[0.7, 0.7, 100, 100]} />
				<wavingMaterial key={WavingMaterial.key} uTime={time} />
			</mesh>
			{/* <mesh position={[0.04, 0, 0.07]}>
				<icosahedronGeometry args={[0.02, 1]}>
					<wavingMaterial key={WavingMaterial.key} uTime={time} />
				</icosahedronGeometry>
			</mesh> */}
		</>
	)
}

const Camera = () => {
	return (
		<>
			<PerspectiveCamera
				makeDefault
				fov={15}
				position={[0, 0.2, 0.75]}
				rotation={[-0.33, 0, 0.03]}
			/>
			{/* <OrbitControls /> */}
		</>
	)
}

const Crow = () => {
	const { nodes, materials } = useGLTF("cutecrow.glb")
	return (
		<group
			dispose={null}
			scale={0.012}
			position={[0.03, 0, 0.16]}
			rotation={[0, -Math.PI / 3, 0]}
		>
			<mesh
				material={materials["crow"]}
				geometry={(nodes["crow"] as Mesh).geometry}
			/>
			<mesh
				material={materials["crow"]}
				geometry={(nodes["feathers"] as Mesh).geometry}
			/>
		</group>
	)
}

const BackgroundAnimation = () => {
	return (
		<Canvas className="w-full h-full">
			<PlaneMesh />
			<Crow />
			<Camera />
			<ambientLight />
		</Canvas>
	)
}

export default BackgroundAnimation
