// 挂载、激活 App
import createApp from "./app";

const { app, router } = createApp();

router.onReady(() => {
  app.$mount("#app");
});
