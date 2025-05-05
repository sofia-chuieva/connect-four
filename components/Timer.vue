<template>
  <div class="timer">
    <div
      :class="[
        'timer-wrapper',
        currentPlayer === 1 ? 'text-white' : 'text-black',
      ]"
    >
      <p>{{ currentPlayer === 1 ? "Your Turn" : "CPU's Turn" }}</p>
      <h1>
        {{ timer }}
      </h1>
    </div>
    <img :src="`/images/timer-${currentPlayer}.svg`" alt="Timer" />
  </div>
</template>

<style scoped>
@reference "../assets/css/main.css";
.timer {
  @apply absolute left-1/2 z-10 w-40 lg:w-fit translate-x-[-50%] text-center -bottom-[30%] lg:-bottom-[35%];

  .timer-wrapper {
    @apply absolute w-full top-[30%] left-0;

    p {
      @apply font-bold text-base uppercase pb-0.5;
    }
  }
}
</style>

<script setup>
const props = defineProps({
  timer: {
    type: Number,
    required: true,
  },
  currentPlayer: {
    type: Number,
    required: true,
  },
});
</script>
