import { nextui } from "@nextui-org/react";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/slices/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable dark mode using the 'class' strategy
  theme: {
    extend: {
      fontFamily:{
        body: ["var(--font-jost)"],
        heading: ["var(--font-cormorant)"],
      },
      colors: {
        mainBlue: "#1F222E",
        mainGreen: "#4A6B52",
      },
    },
  },
  plugins: [
    nextui(),
  ],
};
export default config;
