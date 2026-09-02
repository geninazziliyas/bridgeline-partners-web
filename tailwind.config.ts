import type { Config } from 'tailwindcss';

/**
 * Design tokens Bridgeline Partners.
 *
 * Une seule palette pour tout le projet (site public + Bridgeline Room) :
 * navy en surface structurante, un unique accent bleu, neutres gris-bleu.
 * Le site est verrouille en theme clair (decision de marque), les couleurs
 * sont donc definies une seule fois, sans variante sombre.
 */
const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0a1a33', // header, footer, sidebar, bandeaux
          900: '#081527',
          800: '#0a1a33',
          700: '#122842',
          600: '#1b3856',
          500: '#2b4d70',
        },
        accent: {
          DEFAULT: '#1c56a8', // accent unique du projet
          hover: '#17478d',
          soft: '#e8f0fb', // fond de badge / surface teintee
          ring: '#4a86dd',
        },
        canvas: '#f3f6fb', // fond de page
        ink: {
          DEFAULT: '#10203a', // texte principal
          muted: '#5a6b85', // texte secondaire gris-bleu (4.8:1 sur canvas)
          faint: '#6b7890', // labels et meta (4.5:1 sur blanc)
        },
        hairline: '#dce4f0', // bordures et separateurs
      },
      fontFamily: {
        display: ['var(--font-display)', 'Manrope', 'system-ui', 'sans-serif'],
        sans: ['var(--font-sans)', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'IBM Plex Mono', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        // Echelle unique : cartes 14px, controles 10px, pills pour les badges.
        card: '14px',
        control: '10px',
      },
      boxShadow: {
        // Ombres teintees navy, jamais de noir pur.
        card: '0 1px 2px rgba(10, 26, 51, 0.04), 0 8px 24px -12px rgba(10, 26, 51, 0.12)',
        lifted: '0 2px 4px rgba(10, 26, 51, 0.06), 0 18px 40px -16px rgba(10, 26, 51, 0.22)',
      },
      maxWidth: {
        shell: '1400px',
      },
    },
  },
  plugins: [],
};

export default config;
