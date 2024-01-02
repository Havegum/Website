/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  darkMode: 'media',
  theme: {
    fontSize: {
      'xs': '0.64rem',
      'sm': '0.8rem',
      'base': '1rem',
      'lg': '1.25rem',
      'xl': '1.56rem',
      '2xl': '1.95rem',
      '3xl': '2.44rem',
      '4xl': '3.05rem',
      '5xl': '3.81rem',
      '6xl': '4.77rem',
      '7xl': '5.96rem',
    },

    extend: {
      fill: theme => ({
        none: 'none',
        ... theme('colors'),
      }),
      stroke: theme => ({
        none: 'none',
        ... theme('colors'),
      }),
      zIndex: {
        '1': '1',
        '-1': '-1',
      },
      colors: {
        red: {
          100: 'var(--red-100)',
          200: 'var(--red-200)',
          300: 'var(--red-300)',
          400: 'var(--red-400)',
          500: 'var(--red-500)',
          600: 'var(--red-600)',
          700: 'var(--red-700)',
          800: 'var(--red-800)',
          900: 'var(--red-900)',
          DEFAULT: 'var(--red-DEFAULT)',
        },
        green: {
          100: 'var(--green-100)',
          200: 'var(--green-200)',
          300: 'var(--green-300)',
          400: 'var(--green-400)',
          500: 'var(--green-500)',
          600: 'var(--green-600)',
          700: 'var(--green-700)',
          800: 'var(--green-800)',
          900: 'var(--green-900)',
          DEFAULT: 'var(--green-DEFAULT)',
        },
        blue: {
          100: 'var(--blue-100)',
          200: 'var(--blue-200)',
          300: 'var(--blue-300)',
          400: 'var(--blue-400)',
          500: 'var(--blue-500)',
          600: 'var(--blue-600)',
          700: 'var(--blue-700)',
          800: 'var(--blue-800)',
          900: 'var(--blue-900)',
          DEFAULT: 'var(--blue-DEFAULT)',
        },
        white: {
          DEFAULT: 'var(--white-DEFAULT)',
          50: 'var(--white-50)',
          100: 'var(--white-100)',
        },
        gray: {
          50: 'var(--gray-50)',
          100: 'var(--gray-100)',
          200: 'var(--gray-200)',
          300: 'var(--gray-300)',
          400: 'var(--gray-400)',
          500: 'var(--gray-500)',
          600: 'var(--gray-600)',
          700: 'var(--gray-700)',
          800: 'var(--gray-800)',
          900: 'var(--gray-900)',
          DEFAULT: 'var(--gray-DEFAULT)',
        }
      },
      screens: {
        'xs': '400px',
      }
    },
  },
  variants: {
    extend: {
      margin: ['even', 'odd'],
      flexDirection: ['even', 'odd'],
    },
  },
  plugins: [],
}

