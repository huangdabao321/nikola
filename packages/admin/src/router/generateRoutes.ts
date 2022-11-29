import { RouteRecordRaw } from "vue-router";
import { Role, Permission } from "@/router/types";
export default function generateRoutes(
  roles: Role[]
): Promise<RouteRecordRaw[]> {
  return new Promise((resolve, reject) => {
    const routes: RouteRecordRaw[] = [];
    resolve(routes);
  });
}
