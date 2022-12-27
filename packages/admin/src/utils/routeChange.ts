import mitt, { Handler } from "mitt";
import type { RouteLocationNormalized } from "vue-router";

const key = Symbol("ROUTE_CHANGE");

const emitter = mitt();

let lastRoute: RouteLocationNormalized;

export function setRouteEmitter(to: RouteLocationNormalized) {
  emitter.emit(key, to);
  lastRoute = to;
}

export function listenerRouteChange(
  handler: (route: RouteLocationNormalized) => void,
  immediate = true
) {
  emitter.on(key, handler as Handler);
  if (immediate && lastRoute) {
    handler(lastRoute);
  }
}

export function removeRouteListener() {
  emitter.off(key);
}
