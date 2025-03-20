<template>
  <div class="player-wrapper">
    <div class="player">
      <img :src="getImageUrl()" alt="" />
      <p class="uppercase">Player {{ player }}</p>
      <h1 class="pt-4 pb-10">5</h1>
    </div>
    <div class="player-bg"></div>
  </div>
</template>

<style scoped>
@reference "../assets/css/main.css";
.player-wrapper {
  @apply relative;

  .player {
    @apply flex flex-col relative z-20 bg-white rounded-4xl border-[3px] border-black pt-10 px-6 text-center;

    img {
      @apply absolute -top-[18%] left-1/2 -translate-x-1/2;
    }
  }

  .player-bg {
    @apply absolute inset-0 bg-black rounded-4xl z-10 translate-y-3;
  }
}
</style>

<script setup>
const props = defineProps({
  icon: String,
  player: Number,
});

function getImageUrl() {
  return `/images/${props.icon}`;
}
</script>
