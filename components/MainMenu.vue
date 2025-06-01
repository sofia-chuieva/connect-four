<template>
  <div class="container">
    <div class="wrapper">
      <div class="menu">
        <img
          src="/images/logo-connect-four.svg"
          alt="logo connect four"
          class="w-fit"
        />
        <div class="buttons">
          <div class="btn-wrapper">
            <button @click="toggleModal" class="player-vs-cpu-btn">
              <p>Player vs CPU</p>
              <img
                class="icon"
                src="/images/player-vs-cpu.svg"
                alt="player-vs-cpu"
              />
            </button>
            <div class="player-vs-cpu-bg"></div>
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
  <transition name="fade">
    <MenuModal v-if="showModal" />
  </transition>
</template>

<style scoped>
@reference "../assets/css/main.css";

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
.container {
  @apply mx-auto max-w-3xl px-4 sm:px-10 w-full h-[90vh] xs:h-screen flex items-center justify-center;

  .wrapper {
    @apply relative w-full max-w-[30rem];

    .menu {
      @apply relative z-20 gap-16 px-5 sm:px-10 pt-10 pb-12 items-center justify-between flex flex-col bg-dark-blue rounded-4xl border-[3px] border-black;

      .buttons {
        @apply flex flex-col w-full gap-6;

        .btn-wrapper {
          @apply relative;
        }

        button {
          @apply flex text-left cursor-pointer px-8 py-3 relative z-20 w-full justify-between items-center uppercase rounded-3xl border-[3px] border-black;
          transform-style: preserve-3d;
          transition: transform 150ms cubic-bezier(0, 0, 0.58, 1),
            background 150ms cubic-bezier(0, 0, 0.58, 1);
        }

        .player-vs-cpu-btn {
          @apply bg-red;

          .icon {
            @apply w-16 sm:w-fit;
          }
        }

        .rules-btn {
          @apply bg-white py-4 sm:py-5;
        }

        .player-vs-cpu-bg,
        .rules-bg {
          @apply absolute inset-0 bg-black rounded-3xl z-10;
          transform: translate3d(0, 0.75em, -1em);
          transition: transform 150ms cubic-bezier(0, 0, 0.58, 1),
            box-shadow 150ms cubic-bezier(0, 0, 0.58, 1);
        }

        button:hover {
          transform: translate(0, 0.35em);
        }
      }
    }

    .menu-bg {
      @apply absolute z-10 h-full w-full bg-black rounded-4xl top-3;
    }
  }
}
</style>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
let showModal = ref(false);
function goToGame() {
  router.push({ path: "/game" });
}

function goToRules() {
  router.push({ path: "/rules" });
}

function toggleModal() {
  showModal.value = !showModal.value;
}
</script>
