import { defineConfig, minimal2023Preset } from '@vite-pwa/assets-generator/config'

// Regenerate the PNG icons and favicon from public/icon.svg with: npm run icons
export default defineConfig({
  preset: {
    ...minimal2023Preset,
    maskable: { ...minimal2023Preset.maskable, resizeOptions: { background: '#1c2238' } },
    apple: { ...minimal2023Preset.apple, resizeOptions: { background: '#1c2238' } },
  },
  images: ['public/icon.svg'],
})
