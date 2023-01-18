import { defineConfig } from "astro/config"
import glsl from "vite-plugin-glsl"

// https://astro.build/config
import tailwind from "@astrojs/tailwind"

// https://astro.build/config
import react from "@astrojs/react"

// https://astro.build/config
export default defineConfig({
	integrations: [tailwind(), react()],
	vite: {
		plugins: [
			glsl({
				include: ["**/*.glsl", "**/*.vert", "**/*.frag"],
				watch: false,
			}),
		],
		server: { port: 3000 },
	},
})
