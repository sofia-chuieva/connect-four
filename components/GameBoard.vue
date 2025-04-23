<template>
  <div class="container">
    <Header />
    <div class="game-board">
      <PlayerCard icon="player-one-smiley-face.svg" :player="1" />
      <div class="board-wrapper">
        <img src="/images/board.svg" alt="Game Board" />

        <div class="cells-grid">
          <div
            v-for="cellIndex in cellIndices"
            :key="cellIndex"
            :class="['cell', `cell-${cellIndex}`]"
          ></div>
        </div>
        <Timer />
      </div>
      <PlayerCard icon="player-two-smiley-face.svg" :player="2" />
    </div>
  </div>
  <div class="bg-footer"></div>
</template>

<script setup>
import { ref } from "vue";

const boardWidth = 500;
const boardHeight = 420;

const rows = 6;
const cols = 7;

const totalCells = rows * cols;
const cellIndices = Array.from({ length: totalCells }, (_, i) => i);
</script>

<style scoped>
@reference "../assets/css/main.css";

.container {
  @apply mx-auto relative z-20 px-10 w-full h-screen flex-col flex items-center justify-center;

  .game-board {
    @apply flex flex-row gap-20 items-center justify-center mx-auto w-full;

    .board-wrapper {
      @apply relative w-[500px] h-[420px];

      .cells-grid {
        position: absolute;
        top: 0;
        display: grid;
        left: 0;
        grid-template-columns: repeat(7, 1fr);
        grid-template-rows: repeat(6, 1fr);
        gap: 0.8rem;
        padding: 0.8rem 0.8rem 0;
        width: 500px;
        height: 420px;
      }

      .cell {
        cursor: pointer;
      }

      .marker {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
      }
    }
  }
}

.bg-footer {
  @apply w-full bottom-0 bg-dark-blue absolute h-[calc(50%-205px)] rounded-t-[60px];
}
</style>
