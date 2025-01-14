import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {},
		colors: {
			'primary': '#120F26',
			'secondary': '#021F59',
			'tertiary': '#061940',
			'light': '#F2F2F2',
			'dark': '#0D0D0D',
		},
		fontFamily: {
			sans: ['Gabarito', 'sans-serif']
		},
	},

	plugins: [typography, forms]
} satisfies Config;
