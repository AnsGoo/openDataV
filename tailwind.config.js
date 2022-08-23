module.exports = {
    important: true,
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}']
    ,
    darkMode: 'media', // or 'media' or 'class'
    theme: {
        extend: {}
    },
    variants: {
        extend: {
            cursor: ['active', 'hover'],
            backgroundColor: ['hover'],
            color: ['hover', 'active']
        }
    },
    plugins: []
}
