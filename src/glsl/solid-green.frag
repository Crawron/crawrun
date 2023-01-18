varying vec2 vUv;
varying float vTime;
varying float vDistance;

#include "lygia/generative/snoise.glsl"

void main() {
	vec3 color = vec3(snoise3(vec3(vUv * 3.0, vTime)) / 2.0 + 0.5);
	float alpha = vDistance;

	gl_FragColor.rgba = vec4(color * alpha, alpha);
	/* gl_FragColor.a = 1.0;
	gl_FragColor.rgb = vec3(alpha); */
}