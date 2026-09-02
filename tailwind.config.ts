import type { Config } from "tailwindcss";

/**
 * Every value here points at a CSS variable defined in app/globals.css.
 * That keeps one source of truth: change the hex there, and both the
 * Tailwind classes and any raw CSS update together.
 *
 * `<alpha-value>` is a Tailwind placeholder. When you write `bg-brand`
 * it becomes 1; when you write `bg-brand/20` it becomes 0.2. That only
 * works because the variables store RGB channels, not hex strings.
 */
const withAlpha = (variable: string) => `rgb(var(${variable}) / <alpha-value>)`;

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: withAlpha("--brand"),
          light: withAlpha("--brand-light"),
        },
        ink: {
          DEFAULT: withAlpha("--ink"),
          web: withAlpha("--ink-web"),
          body: withAlpha("--ink-body"),
          nav: withAlpha("--ink-nav"),
          secondary: withAlpha("--ink-secondary"),
          muted: withAlpha("--ink-muted"),
        },
        surface: {
          DEFAULT: withAlpha("--surface"),
          alt: withAlpha("--surface-alt"),
          "alt-web": withAlpha("--surface-alt-web"),
        },
        page: withAlpha("--page-bg"),
        footer: {
          bg: withAlpha("--footer-bg"),
          text: withAlpha("--footer-text"),
          muted: withAlpha("--footer-muted"),
        },
        danger: withAlpha("--danger"),

        // Pastel album themes — decoration only, never chrome (§1.2)
        coral: { tint: withAlpha("--coral-tint"), icon: withAlpha("--coral-icon") },
        blue: { tint: withAlpha("--blue-tint"), icon: withAlpha("--blue-icon") },
        mint: { tint: withAlpha("--mint-tint"), icon: withAlpha("--mint-icon") },
        violet: { tint: withAlpha("--violet-tint"), icon: withAlpha("--violet-icon") },
        amber: { tint: withAlpha("--amber-tint"), icon: withAlpha("--amber-icon") },

        // Kept so the existing app pages keep compiling
        background: "var(--background)",
        foreground: "var(--foreground)",
      },

      fontFamily: {
        // `font-display` = Bricolage, `font-sans` = Jakarta (the default).
        display: ["var(--font-display)", "ui-sans-serif", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
      },

      // Web type scale (§1.3). Tuple form is [size, { lineHeight, letterSpacing }].
      fontSize: {
        hero: ["66px", { lineHeight: "1.02", letterSpacing: "-1px" }],
        "hero-mobile": ["38px", { lineHeight: "1.06", letterSpacing: "-0.5px" }],
        h2: ["44px", { lineHeight: "1.1", letterSpacing: "-0.5px" }],
        "h2-mobile": ["30px", { lineHeight: "1.15", letterSpacing: "-0.3px" }],
        "showcase-h2": ["40px", { lineHeight: "1.08", letterSpacing: "-0.5px" }],
        "cta-h2": ["46px", { lineHeight: "1.08", letterSpacing: "-0.5px" }],
        "card-title": ["22px", { lineHeight: "1.25" }],
        "hero-body": ["19px", { lineHeight: "1.55" }],
        body: ["17px", { lineHeight: "1.6" }],
        eyebrow: ["13px", { lineHeight: "1.2", letterSpacing: "1.5px" }],
      },

      // Radii (§1.5)
      borderRadius: {
        card: "24px",
        panel: "34px",
        badge: "14px",
        pill: "99px",
      },

      // Soft, *colored* shadows — this is what replaces the old flat look (§1.5)
      boxShadow: {
        btn: "0 12px 28px rgba(46, 134, 240, 0.34)",
        "card-web": "0 10px 30px rgba(20, 30, 60, 0.05)",
        cta: "0 30px 70px rgba(46, 134, 240, 0.32)",
        "badge-light": "0 12px 28px rgba(0, 0, 0, 0.15)",
      },
      dropShadow: {
        phone: "0 34px 70px rgba(20, 30, 60, 0.26)",
      },

      // Layout (§1.5): web content maxes out at 1280px
      maxWidth: {
        content: "1280px",
      },

      // Motion (§1.6)
      keyframes: {
        riseInW: {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "none" },
        },
        popIn: {
          from: { opacity: "0", transform: "scale(.96) translateY(20px)" },
          to: { opacity: "1", transform: "none" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        floaty: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-14px)" },
        },
        floaty2: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        riseInW: "riseInW 0.5s cubic-bezier(.4,0,.2,1) both",
        popIn: "popIn 0.4s cubic-bezier(.4,0,.2,1) both",
        fadeIn: "fadeIn 0.25s ease both",
        floaty: "floaty 6s ease-in-out infinite",
        floaty2: "floaty2 7s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
