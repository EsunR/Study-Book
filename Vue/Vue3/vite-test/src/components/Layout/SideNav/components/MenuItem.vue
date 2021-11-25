<template>
  <template v-if="!item?.hideInNav">
    <el-sub-menu v-if="item?.children && !onlyIndexChild" :index="currentPath">
      <template #title>{{ menuName }}</template>
      <menu-item
        v-for="childMenuItem in item.children"
        :key="currentPath + '/' + childMenuItem.path"
        :item="childMenuItem"
        :parent="item"
      />
    </el-sub-menu>
    <el-menu-item v-else :index="currentPath" @click="handleItemClick">
      <template #title>{{ menuName }}</template>
    </el-menu-item>
  </template>
</template>

<script lang="ts">
import { RouteConfigRaw } from "@/router/routerConfig";
import { defineComponent, PropType } from "@vue/runtime-core";
import { ElMenuItem, ElSubMenu } from "element-plus";
import { computed, toRefs } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "MenuItem",
  props: {
    item: {
      type: Object as PropType<RouteConfigRaw>,
      require: true,
    },
    parent: {
      type: Object as PropType<RouteConfigRaw>,
      default: undefined,
    },
  },
  components: {
    "el-sub-menu": ElSubMenu,
    "el-menu-item": ElMenuItem,
  },
  setup(props) {
    const { item, parent } = toRefs(props);
    const router = useRouter();

    const currentPath = computed(() => {
      const itemPath = item?.value?.path ?? "";
      const parentPath = parent?.value?.path ?? "";
      return parentPath + itemPath;
    });

    const onlyIndexChild = computed(() => {
      if (item.value?.children instanceof Array) {
        if (
          item.value.children.length === 1 &&
          item.value.children[0].path === "index"
        ) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    });

    const targetRouteOption = computed(() =>
      onlyIndexChild.value ? item.value?.children?.[0] : item.value
    );

    const menuName = computed(
      () =>
        targetRouteOption.value?.cnName || targetRouteOption.value?.name || ""
    );

    const handleItemClick = () => {
      router.push({ name: targetRouteOption.value?.name ?? "home" });
    };

    return {
      currentPath,
      menuName,
      onlyIndexChild,
      handleItemClick,
    };
  },
});
</script>

<style lang="stylus" scoped></style>
