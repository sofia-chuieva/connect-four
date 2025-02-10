<template>
  <div class="container">
    <div class="wrapper">
      <div class="rules">
        <h1>Rules</h1>
        <div>
          <h2>Objective</h2>
          <p>
            Be the first player to connect 4 of the same coloured discs in a row
            (either vertically, horizontally, or diagonally).
          </p>
        </div>
        <div>
          <h2>How to play</h2>
          <ol class="list-decimal list-inside md:leading-10">
            <li>Red goes first in the first game.</li>
            <li>
              Players must alternate turns, and only one disc can be dropped in
              each turn.
            </li>
            <li>The game ends when there is a 4-in-a-row or a stalemate.</li>
            <li>
              The starter of the previous game goes second on the next game.
            </li>
          </ol>
        </div>
      </div>
      <div class="icon-check">
        <img
          @click="goToMenu"
          src="../assets/images/icon-check.svg"
          alt="icon-check"
        />
      </div>
      <div class="rules-bg"></div>
    </div>
  </div>
</template>

<style scoped>
@reference "../assets/css/main.css";

.container {
  @apply mx-auto max-w-3xl px-10 w-full h-screen flex items-center justify-center;

  .wrapper {
    @apply relative;

    .rules {
      @apply relative z-20 gap-4 md:gap-8 pt-10 px-10 pb-16 items-center flex flex-col bg-white rounded-4xl border-[3px] border-black;

      li::marker {
        @apply text-red;
      }

      h1 {
        @apply text-dark-blue;
      }

      h2 {
        @apply text-light-blue pb-2 md:pb-4;
      }
    }

    .icon-check {
      @apply absolute left-1/2 z-20 -translate-x-1/2 -bottom-[8%];

      img {
        @apply w-22 cursor-pointer;
      }
    }

    .rules-bg {
      @apply absolute z-10 h-full w-full bg-black rounded-4xl top-6;
    }
  }
}
</style>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter();

function goToMenu() {
  router.back();
}
</script>
