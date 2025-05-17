<template>
  <div class="modal-bg">
    <div class="container">
      <div class="wrapper">
        <div class="menu-bg"></div>
        <transition name="pop" appear>
          <div class="modal">
            <h1 class="heading">Pause</h1>
            <div class="buttons">
              <div class="btn-wrapper">
                <button @click="$emit('continue')" class="continue-game">
                  <p>Continue Game</p>
                </button>
                <div class="continue-game-bg"></div>
              </div>
              <div class="btn-wrapper">
                <button @click="$emit('restart')" class="restart-game">
                  <p>Restart</p>
                </button>
                <div class="restart-game-bg"></div>
              </div>
              <div class="btn-wrapper">
                <button @click="$emit('quit')" class="quit-game">
                  <p>Quit Game</p>
                </button>
                <div class="quit-game-bg"></div>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(["continue", "restart", "quit"]);
</script>

<style scoped>
@reference "../../assets/css/main.css";
.pop-enter-from,
.pop-leave-to {
  opacity: 0;
  transform: scale(0.2) translateY(-40%);
}
.pop-enter-to,
.pop-leave-from {
  opacity: 1;
  transform: scale(1) translateY(0);
}
.pop-enter-active,
.pop-leave-active {
  transition: transform 800ms cubic-bezier(0.175, 0.885, 0.32, 1.275),
    opacity 600ms ease-out;
}

.modal-bg {
  @apply fixed inset-0 bg-black/85 z-40;
}

.container {
  @apply mx-auto max-w-3xl px-6 w-full h-screen flex items-center justify-center;
}

.wrapper {
  @apply relative;
}

.menu-bg {
  @apply absolute inset-0 bg-black rounded-4xl z-10 translate-y-3;
}

.modal {
  @apply relative z-20 md:min-w-[30rem] gap-16 p-10 flex flex-col items-center bg-dark-blue rounded-4xl border-[3px] border-black;
}

.heading {
  @apply text-center text-4xl text-white;
}

.buttons {
  @apply flex flex-col w-full gap-6;
}

.btn-wrapper {
  @apply relative;
}

.btn-wrapper button {
  @apply flex w-full justify-center items-center cursor-pointer px-8 py-5 uppercase rounded-3xl border-[3px] border-black relative z-20;
}

.continue-game,
.restart-game {
  @apply bg-white;
}

.quit-game {
  @apply bg-red;
}

.continue-game-bg,
.restart-game-bg,
.quit-game-bg {
  @apply absolute inset-0 bg-black rounded-3xl z-10 translate-y-2;
}
</style>
