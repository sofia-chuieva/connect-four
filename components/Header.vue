<template>
  <div class="header">
    <button @click="$emit('toggle-pause')">Menu</button>
    <img src="/images/logo-connect-four.svg" alt="" />
  </div>
</template>

<style scoped>
@reference "../assets/css/main.css";

.header {
  @apply absolute top-[6%] 3xl:top-[20%] flex flex-row w-82 md:w-125 lg:w-[632px] items-center gap-12 md:gap-34 lg:gap-[12.7rem];

  img {
    @apply w-12 md:w-fit;
  }

  button {
    @apply uppercase text-white px-5 py-1.5 bg-dark-blue rounded-4xl cursor-pointer;
  }
}
</style>

<script setup>
const emit = defineEmits(["toggle-pause"]);
</script>
