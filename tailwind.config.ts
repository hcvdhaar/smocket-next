import type { Config } from 'tailwindcss';
import { nextui } from '@nextui-org/react';
import tailwindForms from '@tailwindcss/forms';
import tailwindAspect from '@tailwindcss/aspect-ratio';

// Default font-size defined by browsers.
const EM_BASE_SIZE = 16;
const BREAKPOINT_TABLET_PX = 600;
const BREAKPOINT_TABLET_LANDSCAPE_PX = 900;
const BREAKPOINT_LAPTOP_PX = 1200;
const BREAKPOINT_DESKTOP_PX = 1500;
const BREAKPOINT_DESKTOP_LARGE_PX = 1900;

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    colors: {
      dark: '#191D19',
      dark_gray: '#292F36',
      yellow: '#FAFF00',
      blue: '#02A9EA',
      pink: '#FF01FB',
      red: '#FF6B6B',
      white: '#FFFEFF',
    },
    screens: {
      'mobile-only': { max: `${(BREAKPOINT_TABLET_PX - 1) / EM_BASE_SIZE}em` }, // <= 599
      'tablet-up': `${BREAKPOINT_TABLET_PX / EM_BASE_SIZE}em`, // 600+
      'tablet-landscape-up': `${
        BREAKPOINT_TABLET_LANDSCAPE_PX / EM_BASE_SIZE
      }em`, // 900+
      'laptop-up': `${BREAKPOINT_LAPTOP_PX / EM_BASE_SIZE}em`, // 1200+
      'desktop-up': `${BREAKPOINT_DESKTOP_PX / EM_BASE_SIZE}em`, // 1500+
      'desktop-large-up': `${BREAKPOINT_DESKTOP_LARGE_PX / EM_BASE_SIZE}em`, // 1800+
    },
    extend: {},
  },
  darkMode: 'class',
  plugins: [nextui(), tailwindForms, tailwindAspect],
};
export default config;
