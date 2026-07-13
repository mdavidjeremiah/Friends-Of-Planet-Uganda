/* Friends of Planet Uganda — shared Tailwind CDN configuration.
   Design tokens sourced from DESIGN.md ("Verdant Heritage"). */
tailwind.config = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "on-primary-fixed-variant": "#364c3c",
        "on-tertiary-container": "#839886",
        "tertiary": "#091a0f",
        "secondary": "#755a34",
        "on-primary-fixed": "#0b2013",
        "on-error": "#ffffff",
        "on-secondary-container": "#785c36",
        "tertiary-fixed": "#d3e8d5",
        "error-container": "#ffdad6",
        "inverse-primary": "#b4cdb8",
        "tertiary-container": "#1d2f22",
        "secondary-fixed-dim": "#e5c192",
        "on-surface": "#1b1c19",
        "outline": "#737973",
        "surface-tint": "#4d6453",
        "surface-container": "#f0eee9",
        "on-primary": "#ffffff",
        "surface-container-high": "#eae8e3",
        "surface-dim": "#dbdad5",
        "on-secondary": "#ffffff",
        "primary-container": "#1b3022",
        "error": "#ba1a1a",
        "tertiary-fixed-dim": "#b7ccb9",
        "on-secondary-fixed": "#291800",
        "on-tertiary": "#ffffff",
        "inverse-surface": "#30312e",
        "on-background": "#1b1c19",
        "on-tertiary-fixed-variant": "#394b3d",
        "primary": "#061b0e",
        "inverse-on-surface": "#f2f1ec",
        "outline-variant": "#c3c8c1",
        "secondary-fixed": "#ffddb3",
        "surface-variant": "#e4e2dd",
        "on-primary-container": "#819986",
        "on-secondary-fixed-variant": "#5b421f",
        "surface-container-highest": "#e4e2dd",
        "on-surface-variant": "#434843",
        "on-error-container": "#93000a",
        "primary-fixed-dim": "#b4cdb8",
        "background": "#fbf9f4",
        "surface-container-lowest": "#ffffff",
        "primary-fixed": "#d0e9d4",
        "surface-bright": "#fbf9f4",
        "on-tertiary-fixed": "#0e1f13",
        "surface-container-low": "#f5f3ee",
        "secondary-container": "#fdd7a7",
        "surface": "#fbf9f4"
      },
      borderRadius: {
        "DEFAULT": "0.125rem",
        "lg": "0.25rem",
        "xl": "0.5rem",
        "full": "0.75rem"
      },
      spacing: {
        "base": "8px",
        "margin-mobile": "20px",
        "container-max": "1280px",
        "margin-desktop": "64px",
        "section-gap": "120px",
        "gutter": "24px"
      },
      fontFamily: {
        "label-caps": ["Manrope"],
        "body-lg": ["Manrope"],
        "display-lg": ["Libre Caslon Text"],
        "headline-md": ["Libre Caslon Text"],
        "display-lg-mobile": ["Libre Caslon Text"],
        "body-md": ["Manrope"],
        "headline-sm": ["Libre Caslon Text"]
      },
      fontSize: {
        "label-caps": ["12px", { lineHeight: "16px", letterSpacing: "0.1em", fontWeight: "700" }],
        "body-lg": ["18px", { lineHeight: "28px", fontWeight: "400" }],
        "display-lg": ["64px", { lineHeight: "72px", letterSpacing: "-0.02em", fontWeight: "400" }],
        "headline-md": ["32px", { lineHeight: "40px", fontWeight: "400" }],
        "display-lg-mobile": ["40px", { lineHeight: "48px", letterSpacing: "-0.01em", fontWeight: "400" }],
        "body-md": ["16px", { lineHeight: "24px", fontWeight: "400" }],
        "headline-sm": ["24px", { lineHeight: "32px", fontWeight: "400" }]
      }
    }
  }
};
