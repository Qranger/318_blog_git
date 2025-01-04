import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import path from 'path'
import tsconfigPaths from 'vite-tsconfig-paths'

import Components from 'unplugin-vue-components/vite'
import { UndrawUiResolver } from 'undraw-ui/es/resolvers'

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
    tsconfigPaths(), // 使用类型断言
    Components({
      resolvers: [UndrawUiResolver],
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // 手动设置别名
    },
  },
})
