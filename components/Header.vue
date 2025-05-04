<template>
  <div class="header">
    <button @click="$emit('toggle-pause')">Menu</button>
    <img src="/images/logo-connect-four.svg" alt="" />
  </div>
</template>

<style scoped>
@reference "../assets/css/main.css";

.header {
  @apply absolute top-[6%] 3xl:top-[20%] flex flex-row w-[632px] items-center gap-[12.7rem];

  button {
    @apply uppercase text-white px-5 py-1.5 bg-dark-blue rounded-4xl cursor-pointer;
  }
}
</style>

<script setup>
const emit = defineEmits(["toggle-pause"]);
</script>
