/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    // Add your content paths here
  ],
  theme: {
    extend: {
      colors: {
        // Your custom colors
        seasalt: "#f7f7f8",
        alabaster: "#b8b9c1",
        "dim-gray": "#6d7074",
        "oxford-blue": "#021327",
        "oxford-blue-2": "#042347",
        "polynesian-blue": "#094d9a",
        syracuse_red_orange: "#db4200",

        // CSS variable-based colors for theme switching
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["Figtree", "Helvetica", "sans-serif"],
        figtree: ["Figtree", "Helvetica", "sans-serif"],
      },
      fontSize: {
        "heading-h5": ["16px", "24px"],
        "label-medium": ["16px", "24px"],
        "label-smaller": ["12px", "16px"],
        "text-bold-medium": ["16px", "24px"],
        "text-medium": ["16px", "24px"],
        "text-smaller": ["12px", "16px"],
      },
      fontWeight: {
        medium: "500",
        "bold-medium": "700",
      },
    },
  },
  plugins: [],
};
