import type { Config } from "tailwindcss";

import { nextui } from "@nextui-org/react";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        scroll: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
      },
      animation: {
        scroll: "scroll 30s linear infinite",
        "scroll-mobile": "scroll 10s linear infinite",
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        "sn-blue": "#59F6FD",
        "sn-brown": "#FF8E5E",
        "sn-panel-bg": "#12131A",
        "sn-border": "#273345",
        "sn-border-blue": "#3AC1D6",
        "sn-text-diabled": "#626365",
        "sn-input-bg": "#191D26",
        "sn-input-activated-bg": "#273345",
        sn: {
          "text-primary": "#ffffff",
          "text-secondary": "#D1D5DB",
          "text-black-1": "#12131A",
          "text-button": "#64D5E4",
          "text-tertiary": "#9CA3AF",
          "section-border": "#273345",
          "section-bg": "#12131A",
          "section-bg-2": "#273345",
          "panel-bg": "#191D26",
          "panel-bg-2": "#013208",
          "panel-bg-3": "#4A0505",
          "progress-success": "#4FEF5F",
          "progress-fail": "#FD4040",
          "button-cyan-1": "#59F6FD",
        },
        "neutral-600": "#4B5563",
      },
      dropShadow: {
        footer: "-7px -7px 100px #59F6FD",
      },
      opacity: {
        5: "0.05",
        6: "0.06",
        7: "0.07",
        8: "0.08",
        12: "0.12",
        40: "0.4",
        45: "0.45",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
} satisfies Config;
