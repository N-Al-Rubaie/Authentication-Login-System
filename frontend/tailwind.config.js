// ==================================================================================
// Tailwind CSS configuration file defining where styles are applied
// Scans HTML and source files to generate utility classes used in your project
// Allows extension of the default theme and addition of plugins if needed
// ==================================================================================

/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./index.html", // Includes the main HTML file for class scanning
		"./src/**/*.{js,ts,jsx,tsx}" // Includes all JS/TS/JSX/TSX files in the src directory
	],
	theme: {
		extend: {}, // Used to extend the default Tailwind theme (e.g., custom colours, spacing)
	},
	plugins: [] // Adds any official or custom Tailwind plugins here (e.g., forms, typography)
};
