module.exports = {
	purge: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			backgroundImage: {
				"dark-water": "url('/images/header-bg.jpg')",
				"dark-hole": "url('/images/fakurian-design-6zF2CgAZVXY-unsplash.jpg')",
				"misty-forest": "url('/images/clement-m-igX2deuD9lc-unsplash.jpg')"
			},
			fontFamily: {
				serif: ["KohSantepheap", "Georgia", "serif"],
			},
			fontSize: {
				'2xs': '.65rem'
			}
		},
	},
	variants: {
		extend: {},
	},
	plugins: [
		require('@tailwindcss/forms'),
	],
};
