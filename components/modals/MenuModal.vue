<template>
  <div class="modal-bg">
    <div class="modal">
      <h1 class="heading">Choose difficulty</h1>
      <div class="levels">
        <p @click="goToGame(2)">Easy</p>
        <p @click="goToGame(4)">Medium</p>
        <p @click="goToGame(6)">Hard</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
@reference "../../assets/css/main.css";

.modal-bg {
  @apply fixed top-0 left-0 w-full h-screen bg-black/85 z-40;

  .modal {
    @apply bg-white rounded-4xl opacity-100 p-12 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2;

    .heading {
      @apply text-center text-4xl text-dark-blue;
    }
    .levels {
      @apply flex flex-col justify-center items-center uppercase pt-6 gap-4;

      p {
        @apply relative text-3xl cursor-pointer text-light-blue;
      }
      p::after {
        content: "";
        @apply absolute left-0 -bottom-1 h-[3px] bg-current w-0 transition-[width] duration-300 ease-in-out;
      }
      p:hover::after {
        @apply w-full;
      }
    }
  }
}
</style>

<script setup>
import { useRouter } from "vue-router";
import { useGameStore } from "~/stores/game";

const game = useGameStore();
const router = useRouter();

function goToGame(d) {
  game.setDepth(d);
  router.replace("/game");
}
</script>
