/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      screens: {
        'xs': '380px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
        'mobile': {'raw': '(max-width: 767px)'},
        'tablet': {'raw': '(min-width: 768px) and (max-width: 1023px)'},
        'landscape': {'raw': '(orientation: landscape) and (max-height: 768px)'},
        'portrait': {'raw': '(orientation: portrait)'},
        'touch': {'raw': '(hover: none)'},
      },
      spacing: {
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
        'safe-left': 'env(safe-area-inset-left)',
        'safe-right': 'env(safe-area-inset-right)',
      },
      fontSize: {
        // Define responsive font sizes using clamp
        'fluid-xs': 'clamp(0.75rem, calc(0.75rem + 0.25vw), 0.875rem)',
        'fluid-sm': 'clamp(0.875rem, calc(0.875rem + 0.25vw), 1rem)',
        'fluid-base': 'clamp(1rem, calc(1rem + 0.25vw), 1.125rem)',
        'fluid-lg': 'clamp(1.125rem, calc(1.125rem + 0.5vw), 1.25rem)',
        'fluid-xl': 'clamp(1.25rem, calc(1.25rem + 0.75vw), 1.5rem)',
        'fluid-2xl': 'clamp(1.5rem, calc(1.5rem + 1vw), 1.875rem)',
        'fluid-3xl': 'clamp(1.875rem, calc(1.875rem + 1.25vw), 2.25rem)',
        'fluid-4xl': 'clamp(2.25rem, calc(2.25rem + 1.5vw), 3rem)',
      },
      textShadow: {
        DEFAULT: "0 1px 3px rgba(0, 0, 0, 0.8)",
        'md': '0 2px 4px rgba(0, 0, 0, 0.8)',
        'lg': '0 3px 6px rgba(0, 0, 0, 0.8)',
      },
      animation: {
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        blink: "blink 1s step-end infinite",
      },
      keyframes: {
        pulse: {
          "0%, 100%": { opacity: 0.5 },
          "50%": { opacity: 0.8 },
        },
        blink: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0 },
        },
      },
      minHeight: {
        'screen-safe': 'calc(100vh - env(safe-area-inset-top) - env(safe-area-inset-bottom))',
      },
      padding: {
        'screen-safe': 'env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left)',
      },
    },
  },
  plugins: [
    function ({ addUtilities, theme, matchUtilities }) {
      const newUtilities = {
        ".text-shadow": {
          textShadow: "0 1px 3px rgba(0, 0, 0, 0.8)",
        },
        ".text-shadow-none": {
          textShadow: "none",
        },
        '.overflow-unset': { overflow: 'unset' },
        '.overflow-x-unset': { overflowX: 'unset' },
        '.overflow-y-unset': { overflowY: 'unset' },
      };
      addUtilities(newUtilities);
      
      // Add responsive padding utilities for notched devices
      addUtilities({
        '.p-safe': {
          paddingTop: 'env(safe-area-inset-top)',
          paddingRight: 'env(safe-area-inset-right)',
          paddingBottom: 'env(safe-area-inset-bottom)',
          paddingLeft: 'env(safe-area-inset-left)',
        },
        '.pt-safe': {
          paddingTop: 'env(safe-area-inset-top)',
        },
        '.pr-safe': {
          paddingRight: 'env(safe-area-inset-right)',
        },
        '.pb-safe': {
          paddingBottom: 'env(safe-area-inset-bottom)',
        },
        '.pl-safe': {
          paddingLeft: 'env(safe-area-inset-left)',
        },
      });
      
      // Add aspect ratio utilities
      matchUtilities(
        {
          "aspect": (value) => ({
            aspectRatio: value,
          }),
        },
        { values: { "auto": "auto", "square": "1 / 1", "video": "16 / 9", "portrait": "9 / 16" } }
      );
    },
  ],
};
