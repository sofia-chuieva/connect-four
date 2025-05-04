<template>
  <div class="player-wrapper">
    <div class="player" :id="id">
      <img :src="getImageUrl()" alt="" />
      <p class="uppercase">{{ player }}</p>
      <h1>{{ score }}</h1>
    </div>
    <div class="player-bg"></div>
  </div>
</template>

<style scoped>
@reference "../assets/css/main.css";

.player-wrapper {
  @apply relative w-full lg:w-32;

  .player {
    @apply flex lg:flex-col gap-4 lg:gap-0 justify-center relative z-20 bg-white rounded-3xl lg:rounded-4xl border-[3px] border-black py-2 lg:pt-10 px-6 text-center items-center;

    h1 {
      @apply lg:pt-4 lg:pb-10;
    }

    img {
      @apply absolute -translate-x-1/2 w-10 md:w-12 lg:w-fit;
    }

    &#player-1 {
      img {
        @apply -left-0.5 top-1/2 -translate-1/2 lg:-top-[18%] lg:left-1/2 lg:translate-y-0;
      }
    }

    &#player-2 {
      img {
        @apply -right-11 top-1/2 -translate-1/2 lg:-top-[18%] lg:left-1/2 lg:translate-y-0;
      }
    }
  }

  .player-bg {
    @apply absolute inset-0 bg-black rounded-4xl z-10 translate-y-2.5 lg:translate-y-3;
  }
}
</style>

<script setup>
const props = defineProps({
  icon: String,
  player: String,
  score: Number,
  id: String,
});

function getImageUrl() {
  return `/images/${props.icon}`;
}
</script>
