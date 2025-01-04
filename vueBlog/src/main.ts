// // 导入样式
import './assets/main.css'
import 'element-plus/dist/index.css'

// 导入根组件
import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App)

// 导入Element Plus
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
app.use(ElementPlus)

// 注册 Element Plus 图标组件
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// 导入 Pinia 和插件
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.use(pinia)

//导入路由
import router from './router'
app.use(router)

// 配置 Markdown 编辑器
import { config } from 'md-editor-v3'
import { lineNumbers } from '@codemirror/view'
config({
  editorConfig: {
    // 输入渲染延迟，默认500ms。当仅预览模式时，未设置此项默认0ms
    renderDelay: 0,
    // 内部弹窗的zIndex
    zIndex: 2000
  },
  codeMirrorExtensions(_theme, extensions) {
    return [...extensions, lineNumbers()]
  }
})


// //台风css
import './assets/styles.css'
// 挂载应用实例
app.mount('#app')

