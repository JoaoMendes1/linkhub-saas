// postcss.config.mjs
const config = {
  plugins: {
    tailwindcss: {}, // <--- Note: 'tailwindcss' e não '@tailwindcss/postcss'
    autoprefixer: {},
  },
}

export default config