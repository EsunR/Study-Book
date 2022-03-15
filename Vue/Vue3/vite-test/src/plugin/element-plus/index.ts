/**
 * @file 本项目会自动按需引入 ElementPlus 组件，但是存在两种情况需要手动引入 ElementPlus 的一些依赖：
 * 1. 函数式调用的组件不会自动引入样式。需要手动引入对应组件的 css 其样式才会生效，如调用 Message 方法
 * 2. vue 自定义指令不会自动声明，需要在当前文件中进行手动声明后使用，如 v-loading 指令
 */
import "element-plus/es/components/loading/style/index";
import "element-plus/es/components/message/style/index";
import { ElLoading } from "element-plus";
import { App } from "vue";

export function initElementPlus(app: App<Element>) {
  app.use(ElLoading);
}
