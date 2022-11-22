<template>
  <div>
    user布局
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { defineComponent } from "vue";

defineComponent({
  name: "UserLayout",
});
</script>

<style scoped></style>
