<template>
  <div id="app-wrapper">
    <div id="app-nav">
      <router-link to="/demo01">Demo01: setup() 和 ref()</router-link>
      <router-link to="/demo02">Demo02: 用 reactive 优化程序</router-link>
    </div>
    <div id="app-content">
      <router-view />
    </div>
  </div>
</template>

<style lang="scss" scoped>
#app-wrapper {
  display: flex;
  height: 100%;

  #app-nav {
    width: 200px;
    border-right: 1px solid rgba($color: #000000, $alpha: 0.2);
    min-height: 100%;
    padding: 0 10px;
    a {
      font-weight: bold;
      color: #2c3e50;
      display: block;
      margin: 10px 0;
      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }

  #app-content {
    flex: 1;
    overflow-y: auto;
    padding: 10px;
  }
}
</style>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
}

html,
body,
#app {
  height: 100%;
}
</style>
