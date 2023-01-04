/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
		'./app/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		colors: {
			black: '#252525',
			white: 'rgb(226, 232, 240)',
			gray: 'rgb(148, 163, 184)',
			primary: 'rgb(251, 191, 36)',
			secondary: 'rgb(245, 158, 11)',
		},
		extend: {},
	},
	plugins: [],
}
