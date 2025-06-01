<template>
  <div class="modal-bg">
    <div class="modal">
      <h1 class="heading">{{ heading }}</h1>
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
@reference "../../assets/css/main.css";

.modal-bg {
  @apply fixed top-0 left-0 w-full h-screen bg-black/85 z-40;

  .modal {
    @apply bg-white w-[80%] md:w-fit rounded-4xl opacity-100 p-12 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2;

    .heading {
      @apply text-center text-4xl text-dark-blue;
    }

    .btn-wrapper {
      @apply relative mt-6;

      button {
        @apply flex text-left cursor-pointer px-8 py-3 relative z-20 w-full justify-center items-center uppercase rounded-3xl border-[3px] border-black;
        transform-style: preserve-3d;
        transition: transform 150ms cubic-bezier(0, 0, 0.58, 1),
          background 150ms cubic-bezier(0, 0, 0.58, 1);
      }

      .play-again {
        @apply bg-red;
      }

      .play-again-bg {
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
}
</style>

<script setup>
import { computed } from "vue";

const props = defineProps({
  winner: Number,
});

const emit = defineEmits(["restart"]);

const heading = computed(() => {
  if (props.winner === 1) return "You Won!";
  if (props.winner === 2) return "CPU Won!";
  return "It's a Draw";
});
</script>
