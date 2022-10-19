module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {}
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
