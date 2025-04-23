module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      screens: {
        xs: "475px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      colors: {
        theme: {
          bg: "var(--background)",
          text: "var(--text)",
          primary: "var(--primary)",
          secondary: "var(--secondary)",
          accent: "var(--accent)",
          surface: "var(--surface)",
          error: "var(--error)",
          success: "var(--success)",
          border: "var(--border)",
        },
      },
    },
  },
  plugins: [],
};
