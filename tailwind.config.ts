import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--color-background)',
        foreground: 'var(--color-foreground)',
        primary: {
          DEFAULT: 'var(--color-primary)',
          hover: 'var(--color-primary-hover)',
        },
        card: {
          bg: 'var(--color-card-bg)',
        },
        border: 'var(--color-border)',
        muted: 'var(--color-muted)',
        accent: 'var(--color-accent)',
        destructive: 'var(--color-destructive)',
        success: 'var(--color-success)',
        input: {
          bg: 'var(--color-input-bg)',
          border: 'var(--color-input-border)',
          focus: 'var(--color-input-focus)',
        },
        sidebar: {
          bg: 'var(--color-sidebar-bg)',
          border: 'var(--color-sidebar-border)',
        },
        button: {
          secondary: 'var(--color-button-secondary)',
        },
        text: {
          primary: 'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
        },
      },
    },
  },
  plugins: [],
};
export default config;
