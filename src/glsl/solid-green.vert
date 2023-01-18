varying vec2 vUv;
varying float vTime;

varying float vDistance;

uniform float uTime;

#include "lygia/generative/snoise.glsl"

void main() {
	vUv = uv;
	vTime = uTime;
	vec3 offset_Position = position;

	vDistance = clamp(1.0 - pow(1.0 - vUv.y, 5.0), 0.0, 1.0);
	offset_Position.z += snoise(vec3(offset_Position.xy * 10.0 + uTime / 2.0, uTime)) * 0.01 * vDistance;

	gl_Position = projectionMatrix * modelViewMatrix * vec4(offset_Position, 1.0);
}