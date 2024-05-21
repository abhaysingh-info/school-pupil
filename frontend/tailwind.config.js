/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}",],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui'),],
  daisyui: {
    // themes: ["corporate"],
    themes: [{
      light: {
        ...require("daisyui/src/theming/themes")["corporate"],
        primary: "#F1B143",
        success: "#0B8A00",
      },
    },],
  },
}

