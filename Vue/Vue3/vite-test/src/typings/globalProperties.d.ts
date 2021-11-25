import axios from "axios";
import "vue-router";
declare module "@vue/runtime-core" {
  export interface ComponentCustomProperties {
    $http: typeof axios;
  }
}

declare module "vue-router" {
  interface RouteMeta {
    cnName?: string;
    icon?: string;
    hideInNav?: boolean;
  }
}