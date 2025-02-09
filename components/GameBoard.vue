<template>
  <div class="game-bg">
    <div class="game-inner">
      <div class="game-board">
        <img
          src="../assets/images/board-white.svg"
          alt=""
          class="board-white"
        />
        <img
          src="../assets/images/board-black.svg"
          alt=""
          class="board-black"
        />
      </div>
    </div>
  </div>
</template>

<style>
@reference "../assets/css/main.css";

.game-bg {
  @apply w-full h-full flex justify-center items-center bg-light-blue;

  .game-inner {
    @apply flex justify-center items-center w-full h-full;

    .game-board {
      @apply flex justify-center items-center relative;

      .board-black {
        @apply absolute z-10 top-0;
      }

      .board-white {
        @apply z-20;
      }
    }
  }
}
</style>
