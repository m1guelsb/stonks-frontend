import type { Config } from 'tailwindcss';
import flowbite from 'flowbite-react/tailwind';
//@ts-expect-error - doesn't have types
import flowbiteTypography from 'flowbite-typography';
export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    flowbite.content(),
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
    },
  },
  plugins: [flowbite.plugin(), flowbiteTypography],
} satisfies Config;
