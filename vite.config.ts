import {resolve} from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts';
import libCss from 'vite-plugin-libcss';

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [vue(), dts({insertTypesEntry: true, copyDtsFiles: false}), libCss()],
  resolve: { dedupe: ['vue'] },
  build: {
    lib: {
      name: 'vue-flip-down',
      entry: resolve(__dirname, 'src/lib/main.ts'),
      fileName: (format) => `vue-flip-down.${format}.js`
    },
    cssCodeSplit: true,
    
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        }
      }
    }
  }
})