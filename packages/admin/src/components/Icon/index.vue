<template>
  <span ref="elRef" class="app-iconify anticon"></span>
</template>

<script setup lang="ts">
import { nextTick, onMounted, ref, unref, watch } from "vue";
import { renderSVG } from "@iconify/iconify";
interface Props {
  icon: string;
  size?: number;
  color?: string;
}

const props = withDefaults(defineProps<Props>(), {
  size: 16,
  color: "black",
});

const elRef = ref<Element>();
const update = async () => {
  const el = unref(elRef);
  if (!el) return;
  await nextTick();
  const svg = renderSVG(props.icon);
  if (!svg) {
    const span = document.createElement("span");
    span.className = "iconify";
    span.dataset.icon = props.icon;
    el.textContent = "";
    el.appendChild(span);
  } else {
    el.textContent = "";
    el.appendChild(svg);
  }
};

onMounted(() => {
  update();
});

watch(() => props.icon, update, { flush: "post" });
</script>

<style scoped></style>
