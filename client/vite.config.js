import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // Carpeta de salida para archivos construidos
    assetsDir: '', // Carpeta para activos estáticos (como imágenes)
    sourcemap: true, // Generar sourcemaps
    minify: 'terser', // Minificar con Terser
    target: 'modules' //// Formato del código de salida (ver https://vitejs.dev/guide/build.html#library-mode)
  }
})
