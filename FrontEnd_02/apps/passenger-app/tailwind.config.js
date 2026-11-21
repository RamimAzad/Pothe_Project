import { colors, typography, borderRadius } from '@pothe/design-tokens';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'pothe-DEFAULT': colors.primary.DEFAULT,
        'pothe-dark': colors.primary.dark,
        'pothe-light': colors.primary.light,
        'pothe-surface': colors.primary.surface,
        'pothe-pale': colors.primary.pale,
        pothe: colors.primary,
        neutral: colors.neutral,
        status: colors.status,
        traffic: colors.traffic,
        crowd: colors.crowd,
      },
      fontFamily: {
        sans: typography.fontFamily.sans,
        bengali: typography.fontFamily.bengali,
      },
      borderRadius: borderRadius,
    },
  },
  plugins: [],
};
