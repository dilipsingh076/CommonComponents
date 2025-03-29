/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'class', 
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
      },
      fontSize: {
        "h1": ["44px", { lineHeight: "120%" }],
        h2: ["30px", { lineHeight: "120%" }],
        h3: ["28px", { lineHeight: "140%" }],
        h4: ["24px", { lineHeight: "140%" }],
        h5: ["20px", { lineHeight: "140%" }],
        h6: ["16px", { lineHeight: "100%" }], // body1 -> h6
        p: ["14px", { lineHeight: "100%" }], // body2 -> p
        small: ["12px", { lineHeight: "100%" }], // body3 -> small
        caption: ["10px", { lineHeight: "120%" }], // body4 -> tiny text
      },
      colors: {
        primary: "#1C4CD3", // Main button & highlights
        secondary: "#3B68E9", // Darker shade for buttons
        tertiary: "#E1F1FF", // Yellow accents
        danger: "#FE2415", // Error messages
        success: "#22C55E", // Success messages
        energyYellow: "#F8DB45",
        warning: "#F97316", // Warnings
        disabled: "#D0D0D0", // Disabled buttons & elements
        background: "#F9F9F9", // Light background
        textPrimary: {
          DEFAULT: "#303E59",
          10: "rgba(48, 62, 89, 0.1)",
          20: "rgba(48, 62, 89, 0.2)",
          30: "rgba(48, 62, 89, 0.3)",
          40: "rgba(48, 62, 89, 0.4)",
          60: "rgba(48, 62, 89, 0.6)",
          80: "rgba(48, 62, 89, 0.8)",
        },
        textSecondary: "#6B7280", // Secondary text
        border: "#939DB0", // Border color
        borderLight:"#f0f0f0",
        borderDark:"#C1C5CD",
        black: "#000",
        white: "#FFF"
      },
      typography: {
        DEFAULT: {
          css: {
            h1: {
              fontSize: "2.75rem",
              lineHeight: "120%",
              fontWeight: "700",
            },
            h2: {
              fontSize: "1.875rem",
              lineHeight: "120%",
              fontWeight: "700",
            },
            h3: {
              fontSize: "1.75rem",
              lineHeight: "140%",
              fontWeight: "600",
            },
            h4: {
              fontSize: "1.5rem",
              lineHeight: "140%",
              fontWeight: "600",
            },
            h5: {
              fontSize: "1.25rem",
              lineHeight: "140%",
              fontWeight: "500",
            },
            h6: {
              fontSize: "1rem",
              lineHeight: "100%",
              fontWeight: "400",
            },
            p: {
              fontSize: "0.875rem",
              lineHeight: "100%",
              fontWeight: "400",
            },
            small: {
              fontSize: "0.75rem",
              lineHeight: "100%",
            },
            caption: {
              fontSize: "0.625rem",
              lineHeight: "120%",
            },
          },
        },
      },
    },
  },
  plugins: [],
};