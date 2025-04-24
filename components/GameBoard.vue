<template>
  <div class="container">
    <Header />
    <div class="game-board">
      <PlayerCard icon="player-one-smiley-face.svg" :player="1" />
      <div class="board-wrapper">
        <img src="/images/board.svg" alt="Game Board" />

        <!-- Invisible grid overlay for clicks -->
        <div class="cells-grid">
          <div
            v-for="cellIndex in cellIndices"
            :key="cellIndex"
            :class="['cell', `cell-${cellIndex}`]"
            @click="handleCellClick(cellIndex)"
          ></div>
        </div>

        <!-- Dropped disks rendered with an animation -->
        <transition-group name="drop" tag="div" class="disks-grid">
          <div
            v-for="disk in droppedDisks"
            :key="disk.id"
            class="disk-wrapper drop-animation"
            :style="{
              left: diskLeft(disk.column),
              top: diskTop(disk.row),
            }"
          >
            <img
              :src="
                disk.player === 1
                  ? '/images/player-one-disk.svg'
                  : '/images/player-two-disk.svg'
              "
              alt="Disk"
              class="marker"
            />
          </div>
        </transition-group>
        <Timer />
      </div>
      <PlayerCard icon="player-two-smiley-face.svg" :player="2" />
    </div>
  </div>
  <div class="bg-footer"></div>
</template>

<script setup>
import { ref } from "vue";

// Board and grid configuration
const boardWidth = 500;
const boardHeight = 420;
const rows = 6;
const cols = 7;
const totalCells = rows * cols;
const cellIndices = Array.from({ length: totalCells }, (_, i) => i);

// Define grid spacing values (using 0.8rem ≈ 12.8px; adjust the multiplier if needed)
const remInPx = 16;
const gridPadding = 0.8 * remInPx; // ≈12.8px padding (left and top)
const gridGap = 0.8 * remInPx; // ≈12.8px gap

// Calculate effective cell dimensions
const availableWidth = boardWidth - 2 * gridPadding; // subtract left and right padding
const availableHeight = boardHeight - gridPadding; // subtract top padding (bottom is not padded)
const cellWidth = (availableWidth - (cols - 1) * gridGap) / cols;
const cellHeight = (availableHeight - (rows - 1) * gridGap) / rows;

// Track the current player (1 or 2)
const currentPlayer = ref(1);

// Board state is represented as a 2D array of rows × cols (0 means empty)
const board = ref(
  Array.from({ length: rows }, () => Array.from({ length: cols }, () => 0))
);

// List to store the dropped disk objects.
const droppedDisks = ref([]);
let diskId = 0;

/**
 * Convert a 1D cell index to its column (to find in which column our cell is located)
 * 9 % 7 =  2 => 3 column
 */
function cellToColumn(cellIndex) {
  return cellIndex % cols;
}

/**
 * Find the lowest empty row in the specified column.
 */
function lowestEmptyRow(col) {
  for (let row = rows - 1; row >= 0; row--) {
    if (board.value[row][col] == 0) {
      return row;
    }
  }
  return -1;
}

/**
 * Handle cell clicks by determining the column and dropping the disk.
 */
function handleCellClick(cellIndex) {
  const col = cellToColumn(cellIndex);
  dropDisk(col);
}

/**
 * Calculate the left position (in pixels) for a disk based on its column.
 * It takes into account the grid padding and gap.
 */
function diskLeft(col) {
  return gridPadding + col * (cellWidth + gridGap) + "px";
}

/**
 * Calculate the top position (in pixels) for a disk based on its row.
 */
function diskTop(row) {
  return gridPadding + row * (cellHeight + gridGap) + "px";
}

/**
 * Drop a disk in the specified column. The disk is created in its final cell position,
 * and a CSS animation (applied via transform) creates the "dropping" effect.
 */
function dropDisk(col) {
  const targetRow = lowestEmptyRow(col);
  if (targetRow === null) return; // Column full

  // Update board state
  board.value[targetRow][col] = currentPlayer.value;

  // Create the disk with its final row position.
  const newDisk = {
    id: diskId++,
    column: col,
    row: targetRow,
    player: currentPlayer.value,
  };

  droppedDisks.value.push(newDisk);

  // Toggle player turn.
  currentPlayer.value = currentPlayer.value === 1 ? 2 : 1;
}
</script>

<style scoped>
@import "../assets/css/main.css";

.container {
  @apply mx-auto relative z-20 px-10 w-full h-screen flex-col flex items-center justify-center;
}
.game-board {
  @apply flex flex-row gap-20 items-center justify-center mx-auto w-full;
}
.board-wrapper {
  @apply relative w-[500px] h-[420px];
}

/* Grid overlay allowing column clicks */
.cells-grid {
  position: absolute;
  top: 0;
  left: 0;
  display: grid;
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

/* Disk wrapper: absolutely positioned to overlay on board */
.disk-wrapper {
  position: absolute;
  z-index: -10;
  pointer-events: none;
  width: calc(
    (100% - 2 * 0.8rem - 6 * 0.8rem) / 7
  ); /* roughly equal to cellWidth */
  height: calc(
    (100% - 0.8rem - 5 * 0.8rem) / 6
  ); /* roughly equal to cellHeight */
}

/* Ensure disk image fills its container */
.disk-wrapper .marker {
  width: 3.5rem;
  height: 3.5rem;
  display: block;
}

/* Drop animation via transform */
@keyframes dropAnimation {
  from {
    transform: translateY(-50px);
  }
  to {
    transform: translateY(0);
  }
}

.drop-animation {
  animation: dropAnimation 0.5s ease-out;
}

/* Optional transition-group classes for opacity if needed */
.drop-enter-from,
.drop-leave-to {
  opacity: 0;
}
.drop-enter-active,
.drop-leave-active {
  transition: opacity 0.5s ease;
}

.bg-footer {
  @apply w-full bottom-0 bg-dark-blue absolute h-[calc(50%-205px)] rounded-t-[60px];
}
</style>
