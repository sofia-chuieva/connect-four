<template>
  <div class="header">
    <button class="btn-menu" @click="$emit('toggle-pause')">Menu</button>
    <img src="/images/logo-connect-four.svg" alt="" />
    <button @click="$emit('restart')">Restart</button>
  </div>
</template>

<style scoped>
@reference "../assets/css/main.css";

.header {
  @apply absolute px-10 md:px-0 top-[10%] md:top-[6%] 3xl:top-[20%] flex flex-row w-full justify-between md:max-w-125 lg:max-w-[632px] items-center;

  img {
    @apply w-12 md:w-fit;
  }

  button {
    @apply uppercase text-white px-5 py-1.5 bg-dark-blue rounded-4xl cursor-pointer;

    &.btn-menu {
      @apply px-8;
    }
  }
}
</style>

<script setup>
const emit = defineEmits(["toggle-pause", "restart"]);
</script>
