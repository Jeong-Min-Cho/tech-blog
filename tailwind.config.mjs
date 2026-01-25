/** @type {import('tailwindcss').Config} */

function withOpacity(variableName) {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${variableName}), ${opacityValue})`;
    }
    return `rgb(var(${variableName}))`;
  };
}

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      textColor: {
        skin: {
          base: withOpacity('--color-text-base'),
          muted: withOpacity('--color-text-muted'),
          accent: withOpacity('--color-accent'),
          inverted: withOpacity('--color-fill'),
        },
      },
      backgroundColor: {
        skin: {
          fill: withOpacity('--color-fill'),
          accent: withOpacity('--color-accent'),
          card: withOpacity('--color-card'),
          'card-hover': withOpacity('--color-card-hover'),
        },
      },
      borderColor: {
        skin: {
          line: withOpacity('--color-border'),
          accent: withOpacity('--color-accent'),
        },
      },
      fill: {
        skin: {
          base: withOpacity('--color-text-base'),
          accent: withOpacity('--color-accent'),
        },
      },
      fontFamily: {
        sans: ['IBM Plex Sans', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['IBM Plex Mono', 'ui-monospace', 'monospace'],
      },
      typography: {
        DEFAULT: {
          css: {
            '--tw-prose-body': 'rgb(var(--color-text-base))',
            '--tw-prose-headings': 'rgb(var(--color-text-base))',
            '--tw-prose-links': 'rgb(var(--color-accent))',
            '--tw-prose-bold': 'rgb(var(--color-text-base))',
            '--tw-prose-counters': 'rgb(var(--color-text-muted))',
            '--tw-prose-bullets': 'rgb(var(--color-text-muted))',
            '--tw-prose-quotes': 'rgb(var(--color-text-base))',
            '--tw-prose-code': 'rgb(var(--color-accent))',
            '--tw-prose-hr': 'rgb(var(--color-border))',
            '--tw-prose-th-borders': 'rgb(var(--color-border))',
            '--tw-prose-td-borders': 'rgb(var(--color-border))',
            'code::before': { content: '""' },
            'code::after': { content: '""' },
            a: {
              textDecoration: 'underline',
              textUnderlineOffset: '3px',
              '&:hover': {
                textDecorationThickness: '2px',
              },
            },
            code: {
              fontWeight: '400',
            },
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
