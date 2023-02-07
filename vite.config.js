import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve} from 'path'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'


export default defineConfig({
  plugins: [
    vue(),
    VueI18nPlugin({
      include: resolve(__dirname , './src/locales/**'),
    }),

  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  server: {
    host: true
  }
});
