/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			backgroundImage: {
				'forest': "url('/bg7.webp')",
			},
			fontFamily: {
				TitleSecondFont: ["TitleSecondFont", "sans-serif"],
				TitleFont: ["Title", "sans-serif"],
			},
			colors: {
				bgColor: {
					light: '#F4E7CB',
					dark: '#e9ce96'
				},
				fontColor: {
					light: '#40768c',
					dark: '#264653'
				},
				orangeBg: {
					top: '#EF763D',
					bottom: '#B73937'
				},
			},
			dropShadow: {
				title: [
					'-0.125rem 0 0 #F4E7CB',
					'0.125rem 0 0 #F4E7CB',
					'0 -0.125rem 0 #F4E7CB',
					'0 0.125rem 0 #F4E7CB',
				],
				secondTitle: [
					'0.125rem 0.125rem 0 #F4E7CB',
				],
				topDivider: [
					'0 0.2rem 0.05rem #595959',
				],
				bottomDivider: [
					'0 -0.1rem 0.05rem #595959',
				],
			},
			backgroundSize: {
                'size-200': '200% 200%',
            },
            backgroundPosition: {
                'pos-0': '0% 0%',
                'pos-100': '100% 100%',
            },
			keyframes: {
				overlayShow: {
				  'from': { opacity: 0 },
				  'to': { opacity: 1 },
				},
				contentShow: {
					'from': { 
						opacity: 0,
						transform: 'translate(-50%, -48%) scale(0.96)'
					},
					'to': { 
						opacity: 1,
						transform: 'translate(-50%, -50%) scale(1)'
					},
				},
				mobileMenuShow: {
					'from': { 
						opacity: 0,
						transform: 'scale(0.5)'
					},
					'to': { 
						opacity: 1,
						transform: 'scale(1)'
					},
				}
			},
			animation: {
				overlayShow: 'overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
				contentShow: 'contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
				mobileMenuShow: 'mobileMenuShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
			}
		},
	},
	plugins: [],
}
