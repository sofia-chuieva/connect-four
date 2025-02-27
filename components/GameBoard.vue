<template>
  <div class="container">
    <Header />
    <div class="game-board">
      <div class="player-wrapper">
        <div class="player player-1">
          <img src="../assets/images/player-one-smiley-face.svg" alt="" />
          <p class="uppercase">Player 1</p>
          <h1 class="pt-4 pb-10">5</h1>
        </div>
        <div class="player-bg"></div>
      </div>
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
      <div class="player-wrapper">
        <div class="player player-2">
          <img src="../assets/images/player-two-smiley-face.svg" alt="" />
          <p class="uppercase">Player 2</p>
          <h1 class="pt-4 pb-10">5</h1>
        </div>
        <div class="player-bg"></div>
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
  @apply mx-auto relative z-20 px-10 w-full h-screen flex-col flex items-center justify-center;

  .game-board {
    @apply flex flex-row gap-20 items-center justify-center mx-auto w-full;

    .player-wrapper {
      @apply relative;

      .player {
        @apply flex flex-col relative z-20 bg-white rounded-4xl border-[3px] border-black pt-10 px-6 text-center;

        img {
          @apply absolute -top-[18%] left-1/2 -translate-x-1/2;
        }
      }

      .player-bg {
        @apply absolute inset-0 bg-black rounded-4xl z-10 translate-y-3;
      }
    }

    .board-wrapper {
      @apply relative w-[630px] h-[590px];

      .timer {
        @apply absolute left-1/2 translate-x-[-50%] text-center -bottom-[15%];

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
}

.bg-footer {
  @apply w-full bottom-0 bg-dark-blue absolute h-[calc(50%-255px)] rounded-t-[60px];
}
</style>
