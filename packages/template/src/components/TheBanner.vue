<script setup>

defineProps({
  title: {
    type: String,
    default: '悦车网'
  },
})
</script>

<template>
  <div class="wrap">
    <span>{{ msg }}</span>
  </div>
</template>

<style scoped>

</style>
