import type { RouteLocationRaw } from "vue-router";
import { Role } from "@/store/modules/user/types";
import { AppRouteRecordRaw } from "./types";

export default function generateRoutes(
  roles: Role[]
): Promise<RouteLocationRaw[]> {
  console.log("roles", roles);
  roles.forEach((role) => {
    console.log(role);
  });
  return Promise.resolve([] as RouteLocationRaw[]);
}

function listToTree(list: Role[], tree: AppRouteRecordRaw) {}
