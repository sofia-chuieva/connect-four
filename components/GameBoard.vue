<template>
  <div class="container">
    <Header />
    <div class="game-board">
      <PlayerCard icon="player-one-smiley-face.svg" :player="1" />
      <div class="board-wrapper">
        <img src="/images/board.svg" alt="Game Board" />
        <div class="marker-grid">
          <div class="marker-wrapper">
            <transition name="fade">
              <div
                v-if="hoverColumn !== null"
                class="marker"
                :style="markerStyle"
              >
                <img
                  :src="`/images/marker-player-${currentPlayer}.svg`"
                  alt="Marker"
                />
              </div>
            </transition>
          </div>
          <div
            v-for="col in cols"
            :key="`col${col}`"
            :class="['col', `col${col}`]"
            @mouseenter="hoverColumn = col - 1"
            @mouseleave="hoverColumn = null"
            @click="playMove(col - 1)"
          ></div>
        </div>
        <div class="cells-grid">
          <div
            v-for="cellIndex in cellIndices"
            :key="`cell-${cellIndex}`"
            :class="[
              'cell',
              `cell-${cellIndex}`,
              { filled: getDiskAtCell(cellIndex) },
            ]"
          >
            <transition name="drop">
              <div
                v-if="getDiskAtCell(cellIndex)"
                class="disk-wrapper drop-animation"
              >
                <div
                  v-if="isWinningCell(cellIndex)"
                  class="winner-circle"
                ></div>
                <img
                  :src="
                    getDiskAtCell(cellIndex).player === 1
                      ? '/images/player-one-disk.svg'
                      : '/images/player-two-disk.svg'
                  "
                  alt="Disk"
                  class="disk"
                />
              </div>
            </transition>
          </div>
        </div>
        <Timer :timer="initialTimer" />
      </div>
      <PlayerCard icon="player-two-smiley-face.svg" :player="2" />
    </div>
  </div>
  <div class="bg-footer"></div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
// Board and grid configuration
const boardWidth = 500;
const boardHeight = 420;
const rows = 6;
const cols = 7;
const totalCells = rows * cols;
const cellIndices = Array.from({ length: totalCells }, (_, i) => i);
const hoverColumn = ref(null);
const winner = ref(null);
const winningCells = ref([]);
const initialTimer = ref(30);
// Grid spacing values (using 0.8rem, ~12.8px with 16px = 1rem)
const remInPx = 16;
const gridPadding = 0.8 * remInPx; // about 12.8px of padding
const gridGap = 0.8 * remInPx; // about 12.8px of gap

// Calculate effective cell dimensions
const availableWidth = boardWidth - 2 * gridPadding;
const availableHeight = boardHeight - gridPadding; // using top padding only (adjust as needed)
const cellWidth = (availableWidth - (cols - 1) * gridGap) / cols;
const cellHeight = (availableHeight - (rows - 1) * gridGap) / rows;

// Track the current player (1 or 2)
const currentPlayer = ref(1);

// The board state is a 2D array (0 indicates an empty cell)
const board = ref(
  Array.from({ length: rows }, () => Array.from({ length: cols }, () => 0))
);

// Array to store dropped disk objects (each having row, column, player, and an id)
const droppedDisks = ref([]);
let diskId = 0;

// timer
let intervalId;
onMounted(() => {
  intervalId = setInterval(() => {
    if (initialTimer.value > 0) {
      initialTimer.value--;
    } else {
      clearInterval(intervalId);
    }
  }, 1000);
});

onBeforeUnmount(() => {
  if (intervalId) clearInterval(intervalId);
});

// Get the column (0-indexed) from a 1D cell index.
function cellToColumn(cellIndex) {
  return cellIndex % cols;
}

// Get the row (0-indexed) from a 1D cell index.
function cellToRow(cellIndex) {
  return Math.floor(cellIndex / cols);
}

// Find the lowest empty row in the specified column.
function lowestEmptyRow(col) {
  for (let row = rows - 1; row >= 0; row--) {
    if (board.value[row][col] === 0) {
      return row;
    }
  }
  return -1; // Column is full
}

// Handles a click on a cell by determining its column and  a disk there.
function handleCellClick(cellIndex) {
  const col = cellToColumn(cellIndex);
  dropDisk(col);
}

// Calculate the left position (in pixels) for the disk based on its column.
function diskLeft(col) {
  return gridPadding + col * (cellWidth + gridGap) + "px";
}

// Calculate the top position (in pixels) for the disk based on its row.
function diskTop(row) {
  return gridPadding + row * (cellHeight + gridGap) + "px";
}

// Drop a disk in the specified column. If the column is full, do nothing.
function dropDisk(col) {
  const targetRow = lowestEmptyRow(col);
  if (targetRow === -1) return;

  // Update board state.
  board.value[targetRow][col] = currentPlayer.value;

  // Create the disk object with final cell coordinates.
  const newDisk = {
    id: diskId++,
    column: col,
    row: targetRow,
    player: currentPlayer.value,
  };

  droppedDisks.value.push(newDisk);
  return { targetRow, col };
}

/**
 * Returns the disk object if one exists in the cell corresponding to cellIndex.
 * It computes the cell's row and column and then looks for a disk with matching coordinates.
 */
function getDiskAtCell(cellIndex) {
  const row = cellToRow(cellIndex);
  const col = cellToColumn(cellIndex);
  // Find a disk that was dropped in this cell
  return droppedDisks.value.find(
    (disk) => disk.row === row && disk.column === col
  );
}

function isWinningCell(cellIndex) {
  const row = cellToRow(cellIndex);
  const col = cellToColumn(cellIndex);
  return winningCells.value.some(
    (cell) => cell.row === row && cell.col === col
  );
}

function isWinningMove(targetRow, col) {
  let player = board.value[targetRow][col];
  winningCells.value = [];

  // vertical
  for (let row = 0; row < rows - 3; row++) {
    for (let col = 0; col < cols; col++) {
      if (
        board.value[row][col] === player &&
        board.value[row + 1][col] === player &&
        board.value[row + 2][col] === player &&
        board.value[row + 3][col] === player
      ) {
        winningCells.value = [
          { row, col },
          { row: row + 1, col },
          { row: row + 2, col },
          { row: row + 3, col },
        ];
        return true;
      }
    }
  }
  // horizontal
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col <= cols - 4; col++) {
      if (
        board.value[row][col] === player &&
        board.value[row][col + 1] === player &&
        board.value[row][col + 2] === player &&
        board.value[row][col + 3] === player
      ) {
        winningCells.value = [
          { row, col },
          { row, col: col + 1 },
          { row, col: col + 2 },
          { row, col: col + 3 },
        ];
        return true;
      }
    }
  }
  // diag right
  for (let row = 0; row <= rows - 4; row++) {
    for (let col = 0; col <= cols - 4; col++) {
      if (
        board.value[row][col] === player &&
        board.value[row + 1][col + 1] === player &&
        board.value[row + 2][col + 2] === player &&
        board.value[row + 3][col + 3] === player
      ) {
        winningCells.value = [
          { row, col },
          { row: row + 1, col: col + 1 },
          { row: row + 2, col: col + 2 },
          { row: row + 3, col: col + 3 },
        ];
        return true;
      }
    }
  }
  // diag left
  for (let row = 3; row < rows; row++) {
    for (let col = 0; col <= cols - 4; col++) {
      if (
        board.value[row][col] === player &&
        board.value[row - 1][col + 1] === player &&
        board.value[row - 2][col + 2] === player &&
        board.value[row - 3][col + 3] === player
      ) {
        winningCells.value = [
          { row, col },
          { row: row - 1, col: col + 1 },
          { row: row - 2, col: col + 2 },
          { row: row - 3, col: col + 3 },
        ];
        return true;
      }
    }
  }
  return false;
}

function playMove(col) {
  const position = dropDisk(col);
  if (!position) return;

  if (isWinningMove(position.targetRow, position.col)) {
    winner.value = currentPlayer.value;
    return;
  }

  currentPlayer.value = currentPlayer.value === 1 ? 2 : 1;
}

// Handle hover effect for markers in the column
const markerStyle = computed(() => {
  if (hoverColumn.value === null) return {};

  // grid-area names are col1 … col7
  return { gridArea: `col${hoverColumn.value + 1}` };
});
</script>

<style scoped>
@reference "../assets/css/main.css";

.container {
  @apply relative mx-auto flex h-screen w-full flex-col items-center justify-center px-10 z-20;

  .game-board {
    @apply mx-auto flex w-full flex-row items-center justify-center gap-20;

    .board-wrapper {
      @apply relative h-[420px] w-[500px];

      & > img {
        @apply relative z-[5] pointer-events-none;
      }

      .marker-grid {
        @apply absolute inset-0 grid h-[420px] w-[500px] grid-cols-7 gap-[0.8rem] px-[0.8rem] py-0 z-[6];

        .marker-wrapper {
          @apply absolute -top-16 grid h-12 w-full grid-cols-7 gap-[0.8rem] [grid-template-areas:'col1_col2_col3_col4_col5_col6_col7'] px-[0.8rem] pt-[0.8rem] z-[4];

          .marker {
            @apply flex justify-center;
          }
        }

        .col {
          @apply cursor-pointer;
        }
      }

      .cells-grid {
        @apply absolute inset-0 grid h-[420px] w-[500px] grid-cols-7 grid-rows-6 gap-[0.8rem] px-[0.8rem] pt-[0.8rem] z-[3];

        .cell {
          @apply relative cursor-pointer;

          .disk-wrapper {
            @apply relative inset-0 h-14 w-14 pointer-events-none;
            animation: dropAnimation 0.5s ease-out;

            .winner-circle {
              @apply absolute w-6 h-6 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-white z-10 pointer-events-none;
            }
          }

          .disk {
            @apply h-full w-full;
          }
        }
      }
    }
  }
}

@keyframes dropAnimation {
  from {
    transform: translateY(-50px);
  }
  to {
    transform: translateY(0);
  }
}

.fade-enter-from,
.fade-leave-to {
  @apply opacity-0;
}
.fade-enter-to,
.fade-leave-from {
  @apply opacity-100;
}
.fade-enter-active,
.fade-leave-active {
  @apply transition-opacity duration-150 ease-in-out;
}

.drop-enter-from,
.drop-leave-to {
  @apply opacity-0;
}
.drop-enter-active,
.drop-leave-active {
  @apply transition-opacity duration-500 ease-in-out;
}

.bg-footer {
  @apply absolute bottom-0 h-[calc(50%-205px)] w-full rounded-t-[60px] bg-dark-blue;
}
</style>
