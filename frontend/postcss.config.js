// ==================================================================================
// PostCSS configuration for handling Tailwind CSS and vendor prefixing
// This file ensures CSS is processed correctly with Tailwind and Autoprefixer
// Required for modern styling compatibility across different browsers
// ==================================================================================

export default {
  plugins: {
    tailwindcss: {}, // Enables Tailwind CSS utility classes
    autoprefixer: {}, // Automatically adds vendor prefixes for broader browser support
  },
}
