import axios from "axios";
declare module "@vue/runtime-core" {
  export interface ComponentCustomProperties {
    $http: typeof axios;
  }
}
