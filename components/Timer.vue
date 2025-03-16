<template>
  <div class="timer">
    <div class="timer-wrapper">
      <p class="font-bold text-white text-base">PLAYER 1’S TURN</p>
      <h1 class="text-white">10s</h1>
    </div>
    <img src="../assets/images/timer.svg" alt="Timer" />
  </div>
</template>

<style scoped>
@reference "../assets/css/main.css";
.timer {
  @apply absolute left-1/2 translate-x-[-50%] text-center -bottom-[35%];

  .timer-wrapper {
    @apply absolute w-full top-[30%] left-0;
  }
}
</style>
