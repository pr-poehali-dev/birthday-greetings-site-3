import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}"
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				pacifico: ['Pacifico', 'cursive'],
				caveat: ['Caveat', 'cursive'],
				rubik: ['Rubik', 'sans-serif'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				party: {
					pink: '#FF4DAF',
					yellow: '#FFD600',
					cyan: '#00E5FF',
					orange: '#FF6B35',
					purple: '#BF5AF2',
					green: '#00E676',
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'confetti-fall': {
					'0%': { transform: 'translateY(-100px) rotate(0deg)', opacity: '1' },
					'100%': { transform: 'translateY(110vh) rotate(720deg)', opacity: '0' }
				},
				'butterfly-fly': {
					'0%': { transform: 'translateX(0) translateY(0) rotate(0deg)' },
					'25%': { transform: 'translateX(30px) translateY(-20px) rotate(10deg)' },
					'50%': { transform: 'translateX(-20px) translateY(-40px) rotate(-5deg)' },
					'75%': { transform: 'translateX(40px) translateY(-10px) rotate(8deg)' },
					'100%': { transform: 'translateX(0) translateY(0) rotate(0deg)' }
				},
				'wing-flap': {
					'0%, 100%': { transform: 'scaleX(1)' },
					'50%': { transform: 'scaleX(0.3)' }
				},
				'float-up': {
					'0%': { transform: 'translateY(0px) scale(1)', opacity: '1' },
					'100%': { transform: 'translateY(-60px) scale(0.8)', opacity: '0' }
				},
				'bounce-in': {
					'0%': { transform: 'scale(0) rotate(-10deg)', opacity: '0' },
					'60%': { transform: 'scale(1.15) rotate(3deg)', opacity: '1' },
					'100%': { transform: 'scale(1) rotate(0deg)', opacity: '1' }
				},
				'wiggle': {
					'0%, 100%': { transform: 'rotate(-3deg)' },
					'50%': { transform: 'rotate(3deg)' }
				},
				'pulse-glow': {
					'0%, 100%': { boxShadow: '0 0 20px rgba(255,77,175,0.4)' },
					'50%': { boxShadow: '0 0 40px rgba(255,77,175,0.8), 0 0 60px rgba(255,214,0,0.4)' }
				},
				'slide-up-fade': {
					'0%': { transform: 'translateY(40px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' }
				},
				'pop-in': {
					'0%': { transform: 'scale(0.5)', opacity: '0' },
					'80%': { transform: 'scale(1.05)', opacity: '1' },
					'100%': { transform: 'scale(1)', opacity: '1' }
				},
				'rainbow-shift': {
					'0%': { backgroundPosition: '0% 50%' },
					'50%': { backgroundPosition: '100% 50%' },
					'100%': { backgroundPosition: '0% 50%' }
				},
				'star-spin': {
					'0%': { transform: 'rotate(0deg) scale(1)' },
					'50%': { transform: 'rotate(180deg) scale(1.3)' },
					'100%': { transform: 'rotate(360deg) scale(1)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'confetti-fall': 'confetti-fall linear infinite',
				'butterfly-fly': 'butterfly-fly ease-in-out infinite',
				'wing-flap': 'wing-flap 0.3s ease-in-out infinite',
				'float-up': 'float-up 2s ease-out forwards',
				'bounce-in': 'bounce-in 0.6s cubic-bezier(0.36, 0.07, 0.19, 0.97)',
				'wiggle': 'wiggle 1s ease-in-out infinite',
				'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
				'slide-up-fade': 'slide-up-fade 0.7s ease-out forwards',
				'pop-in': 'pop-in 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97) forwards',
				'rainbow-shift': 'rainbow-shift 4s ease infinite',
				'star-spin': 'star-spin 3s linear infinite',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
