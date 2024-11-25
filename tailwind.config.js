module.exports = {
  mode: "jit",
  content: ["./src/**/*.{html,ts,scss}"],

  theme: {
    extend: {
      gridColumn: {
        'span-8': 'span 8 / span 8',
      }
    }
  },
  plugins: [],
};
