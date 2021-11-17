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
				"misty-forest": "url('/images/evgeni-evgeniev-LPKk3wtkC-g-unsplash.jpg')"
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
