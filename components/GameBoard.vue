<template>
  <div class="container">
    <div class="board-wrapper">
      <Board class="board-background" />

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
            stroke="rgba(255, 0, 0, 0.5)"
            stroke-width="2"
            :id="rowIndex + '-' + colIndex"
          />
        </g>
      </svg>
      <div class="timer">
        <div class="timer-wrapper">
          <p class="font-bold text-white text-base">PLAYER 1’S TURN</p>
          <h1 class="text-white">10s</h1>
        </div>
        <Timer />
      </div>
    </div>
  </div>
  <div class="bg-footer"></div>
</template>

<script setup>
import { ref } from "vue";
import Board from "../assets/images/board.svg";
import Timer from "../assets/images/timer.svg";

const boardWidth = 630;
const boardHeight = 540;

const rows = 6;
const cols = 7;

const board = ref(Array.from({ length: rows }, () => Array(cols).fill(null)));

const cellWidth = boardWidth / cols;
const cellHeight = boardHeight / rows;
</script>

<style scoped>
@reference "../assets/css/main.css";

.container {
  @apply mx-auto relative max-w-3xl z-20 px-10 w-full h-screen flex-col flex items-center justify-center;

  .board-wrapper {
    @apply relative w-[630px] h-[590px];

    .timer {
      @apply absolute left-1/2 translate-x-[-50%] text-center -bottom-[20%];

      .timer-wrapper {
        @apply absolute w-full top-[30%] left-0;
      }
    }

    .board-background {
      @apply absolute top-0 left-0 w-[632px] h-[596px];
    }

    .board-overlay {
      @apply absolute top-0 left-0 w-[630px] h-[540px];
    }
  }
}

.bg-footer {
  @apply w-full bottom-0 bg-dark-blue absolute h-[calc(50%-255px)] rounded-t-[60px];
}
</style>
