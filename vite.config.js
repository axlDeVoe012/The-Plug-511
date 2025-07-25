import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react({
      // Only include these if you're actually using Emotion
      // jsxImportSource: '@emotion/react',
      // babel: {
      //   plugins: ['@emotion/babel-plugin']
      // }
    })
  ],
  resolve: {
    alias: {
      'react/jsx-runtime': 'react/jsx-runtime.js'
    }
  },
  build: {
    rollupOptions: {
      external: ['react/jsx-runtime'],
      // Add CSS handling
      output: {
        assetFileNames: 'assets/[name].[ext]'
      }
    }
  },
  // Add CSS configuration
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "bootstrap/scss/bootstrap";`
      }
    },
    modules: false,
    postcss: null
  },
  // Ensure static assets are handled
  assetsInclude: ['**/*.css']
});