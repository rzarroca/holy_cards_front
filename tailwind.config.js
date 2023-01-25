/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
		'./app/**/*.{js,ts,jsx,tsx}',
		'./views/**/*.{js,ts,jsx,tsx}'
	],
	theme: {
		colors: {
			black: '#252525',
			white: '#e2e8f0',
			gray: '#94a3b8',
			primary: '#fbbf24',
			secondary: '#f59e0b',
		},
		extend: {},
	},
	plugins: [],
}
