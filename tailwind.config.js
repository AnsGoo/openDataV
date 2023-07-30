module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    './examples/**/*.{vue,js,ts,jsx,tsx}',
    './docs/**/*.{vue,js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {}
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
