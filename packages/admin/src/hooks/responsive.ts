import { useAppStore } from "@/store";
import { onBeforeMount, onBeforeUnmount, onMounted } from "vue";
import { addEventListener, removeEventListener } from "@nikola/utils/event";
import { useDebounceFn } from "@vueuse/core";

const WIDTH = 992;

function queryDevice() {
  const rect = document.body.getBoundingClientRect();
  return rect.width - 1 < WIDTH;
}
export default function useResponsive(immediate?: boolean) {
  const appStore = useAppStore();
  function resizeHandler() {
    if (!document.hidden) {
      const isMobile = queryDevice();
      appStore.toggleDevice(isMobile ? "mobile" : "desktop");
    }
  }
  const debounceFn = useDebounceFn(resizeHandler, 100);

  onBeforeMount(() => {
    addEventListener(window, "resize", debounceFn);
  });

  onMounted(() => {
    if (immediate) debounceFn();
  });

  onBeforeUnmount(() => {
    removeEventListener(window, "resize", debounceFn);
  });
}
