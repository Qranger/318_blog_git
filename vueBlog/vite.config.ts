import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import path from 'path'
import tsconfigPaths from 'vite-tsconfig-paths'

// 强制类型推断为插件类型
import { Plugin } from 'vite'

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
    tsconfigPaths() as Plugin // 使用类型断言
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // 手动设置别名
    },
  },
})
