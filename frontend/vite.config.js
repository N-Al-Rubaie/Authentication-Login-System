// ==================================================================================
// Vite configuration file for setting up a React project with fast bundling
// Integrates the React plugin to support JSX and Fast Refresh out of the box
// Enables quick development with minimal setup and sensible defaults
// ==================================================================================

import { defineConfig } from 'vite' // Core Vite configuration function
import react from '@vitejs/plugin-react' // React plugin for Vite (includes Fast Refresh support)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()], // Applys the React plugin to enable JSX and HMR
})
