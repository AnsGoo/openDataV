/** @type {import('tailwindcss').Config} */
module.exports = {
  performance: true,
  darkMode: 'class',
  mode: 'jit',
  content: [
    './src/data/**/*.{vue,ts,tsx}',
    './src/designer/**/*.{vue,ts,tsx}',
    './src/scripts/**/*.{vue,ts,tsx}',
    './src/ui/**/*.{vue,ts,tsx}',
    './examples/**/*.{vue,ts,tsx}',
    '!./resource/**/node_modules/**',
    './resource/**/*.{vue,ts,tsx}'
  ],
  theme: {
    extend: {}
  },
  variants: {
    extend: {
      textOpacity: ['dark'],
      backgroundColor: ['dark']
    }
  },
  corePlugins: {
    preflight: true
  },
  plugins: [
    function ({ addBase }) {
      addBase({
        '.n-button': {
          'background-color': 'var(--n-color);'
        }
      })
    }
  ]
}
