import { Apm } from "@/plugin/apm";
import axios from "axios";
import "vue-router";
declare module "@vue/runtime-core" {
  export interface ComponentCustomProperties {
    $http: typeof axios;
    $apm: Apm;
  }
}
