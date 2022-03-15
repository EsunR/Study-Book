import "vue-router";

declare module "vue-router" {
  interface RouteMeta {
    hide?: boolean;
    menuName?: string;
    belong?: string;
  }
}
