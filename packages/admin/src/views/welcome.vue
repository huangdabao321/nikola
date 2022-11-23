<template>
  <div>
    <a-dropdown :trigger="['contextmenu']">
      <span :style="{
        fontSize: '30px'

      }">welcome</span>
      <template #overlay>
        <a-menu @click="({key}) => test(key)">
          <a-menu-item key="closeThat">关闭当前</a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </div>
</template>

<script setup>
const test = key => {
  console.log(key)
}
</script>

<style lang="scss" scoped>

</style>