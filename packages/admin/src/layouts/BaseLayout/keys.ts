import { InjectionKey, Ref } from "vue";

export const collapsedKey = Symbol() as InjectionKey<Ref<boolean>>;
