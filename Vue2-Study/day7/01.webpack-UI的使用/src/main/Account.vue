<template>
  <div>
    <h1>这是 Account 组件</h1>
    <router-link to="/account/login">登录</router-link>
    <router-link to="/account/register">注册</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
</script>

<style lang="scss" scoped>
// 只要style标签是在组件中定义的，是在.vue组件中定义的，推荐都为style开启scoped属性
body {
  div {
    font-style: italic;
  }
}
</style>
