import plugin from 'tailwindcss'
import { resolve } from 'node:path'
import cssplugin from './cssplugin'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      textShadow: {
        sm: '0 1px 2px var(--tw-shadow-color)',
        DEFAULT: '0 2px 4px var(--tw-shadow-color)',
        lg: '0 8px 16px var(--tw-shadow-color)',
      },
      colors: {
        background: {
          100: "hsl(var(--background-100))",
          200: "hsl(var(--background-200))",
          300: "hsl(var(--background-300))",
        },
        border: {
          100: "#2b2d2e"
        },
        brand: "#a095e8"
      }
    },
  },
  plugins: [
    plugin(function({ matchUtilities, theme }) {
      matchUtilities(
        {
          'text-shadow': (value) => ({
            textShadow: value,
          }),
        },
        { values: theme('textShadow') }
      )
    }),
    cssplugin(resolve(__dirname, './src/index.css'))
  ],
}

