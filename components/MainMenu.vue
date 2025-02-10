<template>
  <div class="container">
    <div class="wrapper">
      <div class="menu">
        <img
          src="../assets/images/logo-connect-four.svg"
          alt="logo connect four"
          class="w-fit"
        />
        <div class="buttons">
          <div class="btn-wrapper">
            <button @click="goToGame" class="player-vs-cpu-btn">
              <p>Play vs CPU</p>
              <img
                src="../assets/images/player-vs-cpu.svg"
                alt="player-vs-cpu"
              />
            </button>
            <div class="player-vs-cpu-bg"></div>
          </div>

          <div class="btn-wrapper">
            <button class="player-vs-player-btn">
              <p>Play vs Player</p>
              <img
                src="../assets/images/player-vs-player.svg"
                alt="player-vs-player"
              />
            </button>
            <div class="player-vs-player-bg"></div>
          </div>

          <div class="btn-wrapper">
            <button @click="goToRules" class="rules-btn">
              <p>Game Rules</p>
            </button>
            <div class="rules-bg"></div>
          </div>
        </div>
      </div>

      <div class="menu-bg"></div>
    </div>
  </div>
</template>

<style scoped>
@reference "../assets/css/main.css";

.container {
  @apply mx-auto max-w-3xl px-6 w-full h-screen flex items-center justify-center;

  .wrapper {
    @apply relative;

    .menu {
      @apply relative z-20 md:min-w-[30rem] gap-16 p-10 items-center justify-between flex flex-col bg-dark-blue rounded-4xl border-[3px] border-black;

      .buttons {
        @apply flex flex-col w-full gap-8;

        .btn-wrapper {
          @apply relative;
        }

        button {
          @apply flex text-left cursor-pointer px-8 py-3 relative z-20 w-full justify-between items-center uppercase rounded-3xl border-[3px] border-black;
        }

        .player-vs-cpu-btn {
          @apply bg-red;
        }
        .player-vs-player-btn {
          @apply bg-orange;
        }
        .rules-btn {
          @apply bg-white py-5;
        }

        .player-vs-cpu-bg,
        .player-vs-player-bg,
        .rules-bg {
          @apply absolute inset-0 bg-black rounded-3xl z-10 translate-y-3;
        }
      }
    }

    .menu-bg {
      @apply absolute z-10 h-full w-full bg-black rounded-4xl top-6;
    }
  }
}
</style>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter();

function goToGame() {
  router.push({ path: "/game" });
}

function goToRules() {
  router.push({ path: "/rules" });
}
</script>
