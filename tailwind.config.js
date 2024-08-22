/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      fontFamily: {
        'pp-object-sans': ['PP Object Sans', 'sans-serif'],
      },
      colors: {
        // Existing color definitions...
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        // Add new colors here
        orca: {
          black: {
            90: '#2A2A2A',
            80: '#3F3F3F',
            70: '#545454',
            60: '#696969',
            50: '#7F7F7F',
            40: '#949494',
            30: '#A9A9A9',
            20: '#BFBFBF',
            10: '#D4D4D4',
            white: '#FFFFFF',
          },
        },
        mahogany: '#44130E',
        umber: '#342514',
        sea: '#0A322D',
        tyrian: '#371020',
        crimson: '#821E1E',
        gold: '#835D32',
        pine: '#196E64',
        berry: '#892951',
        sunset: '#FF5C39',
        tan: '#C9A961',
        aurora: '#49C5B1',
        pearl: '#FA8CC8',
        coral: '#FFB7AE',
        sand: '#ECD898',
        sky: '#B1E4E3',
        seashell: '#FFBEF0',
        rose: '#FFE2DE',
        cream: '#F7FED6',
        powder: '#E0F4F4',
        pale: '#FFE5F9',
        beige: '#CEC8BB',
        stone: '#24282c',
        orcgray: '#9fa3a6',
        bluestone: '#11161d',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
