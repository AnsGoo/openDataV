/** @type {import('tailwindcss').Config} */
module.exports = {
  performance: true,
  darkMode: 'class',
  mode: 'jit',
  content: [
    '../packages/data/src/**/*.{vue,ts,tsx}',
    '../packages/designer/src/**/*.{vue,ts,tsx}',
    '../packages/scripts/src**/*.{vue,ts,tsx}',
    '../packages/ui/src/**/*.{vue,ts,tsx}',
    './src/**/*.{vue,ts,tsx}',
    '!../resource/**/node_modules/**',
    '../resource/**/*.{vue,ts,tsx}',
    './node_modules/@open-data-v/data/src/**/*.{vue,ts,tsx}',
    './node_modules/@open-data-v/designer/src/**/*.{vue,ts,tsx}',
    './node_modules/@open-data-v/scripts/src/**/*.{vue,ts,tsx}',
    './node_modules/@open-data-v/ui/src/**/*.{vue,ts,tsx}'
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
