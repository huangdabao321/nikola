export interface Permission {
  id: number;
  name: string;
  desc: string;
}
export interface Role {
  id: number;
  name: string;
  desc: string;
  permissions: Permission[];
}
