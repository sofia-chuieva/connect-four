<template>
  <div class="container">
    <Header />
    <div class="game-board">
      <PlayerCard icon="player-one-smiley-face.svg" :player="1" />
      <div class="board-wrapper">
        <img src="/images/board.svg" alt="Game Board" />
        <svg class="board-overlay">
          <g v-for="(row, rowIndex) in board" :key="'row-' + rowIndex">
            <rect
              v-for="(_, colIndex) in row"
              :key="rowIndex + '-' + colIndex"
              :x="colIndex * cellWidth"
              :y="rowIndex * cellHeight"
              :width="cellWidth"
              :height="cellHeight"
              fill="transparent"
              :id="rowIndex + '-' + colIndex"
            />
          </g>
        </svg>
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

const board = ref(Array.from({ length: rows }, () => Array(cols).fill(null)));

const cellWidth = boardWidth / cols;
const cellHeight = boardHeight / rows;
</script>

<style scoped>
@reference "../assets/css/main.css";

.container {
  @apply mx-auto relative z-20 px-10 w-full h-screen flex-col flex items-center justify-center;

  .game-board {
    @apply flex flex-row gap-20 items-center justify-center mx-auto w-full;

    .board-wrapper {
      @apply relative w-[500px] h-[420px];

      .board-background {
        @apply absolute top-0 left-0 w-[632px] h-[596px];
      }

      .board-overlay {
        @apply absolute top-0 left-0 w-[500px] h-[420px];
      }
    }
  }
}

.bg-footer {
  @apply w-full bottom-0 bg-dark-blue absolute h-[calc(50%-205px)] rounded-t-[60px];
}
</style>
