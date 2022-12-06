export interface Action {
  id: number;
  name: string;
  operation: string;
}
export interface Permission {
  id: number;
  pid: number;
  name: string;
  title: string;
  path: string;
  redirect: string;
  component: string;
  icon: string;
  hideInMenu: boolean;
  hideChildren: boolean;
  ignoreCache?: boolean;
  actions?: Action[];
}

export interface Role {
  id: number;
  name: string;
  desc: string;
  permissions?: Permission[];
}

export interface UserState {
  id?: number;
  name?: string;
  avatar?: string;
  mobile?: string;
  openid?: string;
  roles: Role[];
}

export interface Access {
  accessToken: string;
  expire: number;
}
