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
					dark: '#e9ce96',
					input: '#f9f7eb'
				},
				fontColor: {
					button: '#5094af',
					light: '#40768c',
					dark: '#264653'
				},
				orangeBg: {
					top: '#EF763D',
					bottom: '#B73937',
					hover: '#ec5813'
				},
				toastColor: {
					warning: '#e76f51',
					success: '#2a9d8f'
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
					'0 0.125rem 0.05rem #595959',
					'0 -0.1rem 0 #F4E7CB',
				],
				bottomDivider: [
					'0 -0.1rem 0.05rem #595959',
					'0 0.1rem 0 #F4E7CB',
				],
				dividerFix: [
					'0 0.1rem 0 #F4E7CB',
				],
				dividerFixFooter: [
					'0 0.1rem 0 #264653',
				],
				dividerFixInverted: [
					'0 -0.1rem 0 #F4E7CB',
				],
				adminNav: [
					'0 -0.2rem 0 #F4E7CB',
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
				},
				hide: {
					'from': { opacity: 1 },
					'to': { opacity: 0 },
				},
				slideIn: {
					'from': { 
						transform: 'translateX(-100%)'
					},
					'to': { 
						transform: 'translateX(0)'
					},
				},
				slideOut: {
					'from': { 
						transform: 'translateX(0)'
					},
					'to': { 
						transform: 'translateX(-100%)'
					},
				},
				slideDownAndFade: {
					'from': { 
						opacity: 0,
    					transform: 'translateY(-0.5rem)'
					},
					'to': { 
						opacity: 1,
    					transform: 'translateY(0)'
					},
				},
				slideUpAndFade: {
					'from': { 
						opacity: 1,
    					transform: 'translateY(0)'
					},
					'to': { 
						opacity: 0,
    					transform: 'translateY(-0.5rem)'
					},
				}
			},
			animation: {
				overlayShow: 'overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
				contentShow: 'contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
				mobileMenuShow: 'mobileMenuShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
				'spin-reverse': 'spin 1s linear reverse infinite',
				hide: 'hide hide 100ms ease-in',
				slideIn: 'slideIn 150ms cubic-bezier(0.16, 1, 0.3, 1)',
				slideOut: 'slideOut 150ms cubic-bezier(0.16, 1, 0.3, 1)',
				slideDownAndFade: 'slideDownAndFade 150ms cubic-bezier(0.16, 1, 0.3, 1)',
				slideUpAndFade: 'slideUpAndFade 150ms cubic-bezier(0.16, 1, 0.3, 1)',
			}
		},
	},
	plugins: [],
}
