/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                primary: '#0A8FDC',
                secondary: '#79c2d0',
                primaryText: '#6A6D7C',
            },
        },
    },
    plugins: [],
};
