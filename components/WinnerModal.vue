<template>
  <div class="modal-bg">
    <div class="modal">
      <h1 class="heading">{{ winner === 1 ? "You" : "CPU" }} Won!</h1>
      <div class="btn-wrapper">
        <button class="play-again" @click="$emit('restart')">
          <p>Play Again</p>
        </button>
        <div class="play-again-bg"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@reference "../assets/css/main.css";

.modal-bg {
  @apply fixed top-0 left-0 w-full h-screen bg-black/75 z-40;

  .modal {
    @apply bg-white rounded-4xl opacity-100 p-12 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2;

    .heading {
      @apply text-center text-4xl text-dark-blue;
    }
    .btn-wrapper {
      @apply relative mt-6;

      button {
        @apply flex text-left cursor-pointer px-8 py-3 relative z-20 w-full justify-between items-center uppercase rounded-3xl border-[3px] border-black;
      }

      .play-again {
        @apply bg-red;
      }

      .play-again-bg {
        @apply absolute inset-0 bg-black rounded-3xl z-10 translate-y-3;
      }
    }
  }
}
</style>

<script setup>
const props = defineProps({
  winner: Number,
});

const emit = defineEmits(["restart"]);
</script>
