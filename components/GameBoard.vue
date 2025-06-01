<template>
  <div class="container">
    <Header @toggle-pause="togglePause" @restart="restartGame" />
    <div class="player-cards-wrapper">
      <PlayerCard
        id="player-1"
        icon="player-one-smiley-face.svg"
        player="You"
        :score="playerScore"
      />
      <PlayerCard
        id="player-2"
        icon="player-two-smiley-face.svg"
        player="CPU"
        :score="cpuScore"
      />
    </div>
    <div class="game-board">
      <div class="board-wrapper">
        <img src="/images/board.svg" alt="Game Board" />
        <div class="marker-grid" v-show="!winner">
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
            @click="currentPlayer === 1 && playMove(col - 1)"
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
        <Timer :timer="initialTimer" :currentPlayer="currentPlayer" />
      </div>
    </div>
  </div>
  <WinnerModal v-if="showWinnerModal" :winner="winner" @restart="restartGame" />
  <transition name="fade" mode="out-in" appear>
    <PauseModal
      v-if="showPauseModal"
      @continue="continueGame"
      @quit="quitGame"
    />
  </transition>

  <div class="bg-footer"></div>
</template>

<script setup>
import PauseModal from "~/components/modals/PauseModal.vue";
import WinnerModal from "~/components/modals/WinnerModal.vue";
import { ref, computed, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { useGameStore } from "~/stores/game";
import { useTimer } from "~/utils/useTimer";
const router = useRouter();
const game = useGameStore();
const depth = computed(() => game.depth);
const rows = 6;
const cols = 7;
const windowLength = 4;
const totalCells = rows * cols;
const cellIndices = Array.from({ length: totalCells }, (_, i) => i);
const hoverColumn = ref(null);
const winner = ref(null);
const winningCells = ref([]);
const playerScore = ref(0);
const cpuScore = ref(0);
const showWinnerModal = ref(false);
const showPauseModal = ref(false);
let cpuTimeoutId = null;
let winnerModalTimeoutId = null;

// Track the current player (1 or 2)
const currentPlayer = ref(1);

// The board state is a 2D array (0 indicates an empty cell)
const board = ref(
  Array.from({ length: rows }, () => Array.from({ length: cols }, () => 0))
);

// Array to store dropped disk objects (each having row, column, player, and an id)
const droppedDisks = ref([]);
let diskId = 0;

function handlePlayerTimeout() {
  if (winner.value) return;
  winner.value = 2;
  cpuScore.value += 1;
  winnerModalTimeoutId = setTimeout(() => {
    showWinnerModal.value = true;
  }, 1500);
  pauseTimer();
}

const timer = useTimer(30, handlePlayerTimeout);

const initialTimer = timer.initialTimer;
const restartTimer = timer.restartTimer;
const resumeTimer = timer.resumeTimer;
const pauseTimer = timer.pauseTimer;

onUnmounted(() => {
  clearTimeout(cpuTimeoutId);
  clearTimeout(winnerModalTimeoutId);
});

function togglePause() {
  showPauseModal.value = !showPauseModal.value;
  showPauseModal.value ? pauseTimer() : resumeTimer();
}

function restartGame() {
  showPauseModal.value = false;

  board.value = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => 0)
  );

  droppedDisks.value = [];
  winningCells.value = [];

  winner.value = null;
  showWinnerModal.value = false;
  clearTimeout(winnerModalTimeoutId);

  currentPlayer.value = 1;
  restartTimer();
  clearTimeout(cpuTimeoutId);
}

function continueGame() {
  showPauseModal.value = false;
  resumeTimer();
}

function quitGame() {
  showPauseModal.value = false;
  restartGame();
  router.push({ path: "/" });
}

// Get the column (0-indexed) from a 1D cell index.
function cellToColumn(cellIndex) {
  return cellIndex % cols;
}

// Get the row (0-indexed) from a 1D cell index.
function cellToRow(cellIndex) {
  return Math.floor(cellIndex / cols);
}

// Find the lowest empty row in the specified column.
function lowestEmptyRow(gridOrRef, col) {
  // Normalize to the raw grid
  const grid = Array.isArray(gridOrRef) ? gridOrRef : gridOrRef.value;

  for (let row = rows - 1; row >= 0; row--) {
    if (grid[row][col] === 0) return row;
  }
  return -1;
}

// Drop a disk in the specified column. If the column is full, do nothing.
function dropDisk(col) {
  const targetRow = lowestEmptyRow(board.value, col);
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

function scorePosition(board, player) {
  let score = 0;

  // score centre column
  const centreArray = board.map((row) => Number(row[Math.floor(cols / 2)]));
  const centreCount = centreArray.filter((cell) => cell === player).length;
  score += centreCount * 3;

  // vertical
  for (let col = 0; col < cols; col++) {
    const colArray = board.map((row) => Number(row[col]));
    for (let row = 0; row < rows - 3; row++) {
      const window = colArray.slice(row, row + windowLength);
      score += evaluateWindow(window, player);
    }
  }

  // horizontal
  for (let row = 0; row < rows; row++) {
    const rowArray = board[row].map(Number);
    for (let col = 0; col < cols - 3; col++) {
      const window = rowArray.slice(col, col + windowLength);
      score += evaluateWindow(window, player);
    }
  }
  // diag ↘
  for (let row = 0; row < rows - 3; row++) {
    for (let col = 0; col < cols - 3; col++) {
      const window = Array.from(
        { length: windowLength },
        (_, i) => board[row + i][col + i]
      );
      score += evaluateWindow(window, player);
    }
  }
  // diag ↙
  for (let row = 0; row < rows - 3; row++) {
    for (let col = 0; col < cols - 3; col++) {
      const window = Array.from(
        { length: windowLength },
        (_, i) => board[row + 3 - i][col + i]
      );
      score += evaluateWindow(window, player);
    }
  }
  return score;
}

function evaluateWindow(window, player) {
  let score = 0;

  const cpuPieces = window.filter((v) => v === player).length;
  const playerPieces = window.filter((v) => v !== player && v !== 0).length;
  const empties = 4 - cpuPieces - playerPieces;

  if (cpuPieces == 4) {
    score += 100;
  } else if (cpuPieces == 3 && empties == 1) {
    score += 10;
  } else if (cpuPieces == 2 && empties == 2) {
    score += 2;
  }

  if (playerPieces == 3 && empties == 1) {
    score -= 80;
  }

  return score;
}

/** Convenience: return 0 | 1 | 2 for nobody / human / CPU */
function winnerOnGrid(board) {
  if (isWinningMove(board, 1)) return 1;
  if (isWinningMove(board, 2)) return 2;
  return 0;
}

function findWinningCells(board, player) {
  //   // vertical
  for (let row = 0; row < rows - 3; row++) {
    for (let col = 0; col < cols; col++) {
      if (
        board[row][col] === player &&
        board[row + 1][col] === player &&
        board[row + 2][col] === player &&
        board[row + 3][col] === player
      ) {
        return [
          { row, col },
          { row: row + 1, col },
          { row: row + 2, col },
          { row: row + 3, col },
        ];
      }
    }
  }
  //   // horizontal
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col <= cols - 4; col++) {
      if (
        board[row][col] === player &&
        board[row][col + 1] === player &&
        board[row][col + 2] === player &&
        board[row][col + 3] === player
      ) {
        return [
          { row, col },
          { row, col: col + 1 },
          { row, col: col + 2 },
          { row, col: col + 3 },
        ];
      }
    }
  }
  // diag right
  for (let row = 0; row <= rows - 4; row++) {
    for (let col = 0; col <= cols - 4; col++) {
      if (
        board[row][col] === player &&
        board[row + 1][col + 1] === player &&
        board[row + 2][col + 2] === player &&
        board[row + 3][col + 3] === player
      ) {
        return [
          { row, col },
          { row: row + 1, col: col + 1 },
          { row: row + 2, col: col + 2 },
          { row: row + 3, col: col + 3 },
        ];
      }
    }
  }
  // diag left
  for (let row = 3; row < rows; row++) {
    for (let col = 0; col <= cols - 4; col++) {
      if (
        board[row][col] === player &&
        board[row - 1][col + 1] === player &&
        board[row - 2][col + 2] === player &&
        board[row - 3][col + 3] === player
      ) {
        return [
          { row, col },
          { row: row - 1, col: col + 1 },
          { row: row - 2, col: col + 2 },
          { row: row - 3, col: col + 3 },
        ];
      }
    }
  }
  return null;
}

function isWinningMove(board, player) {
  return !!findWinningCells(board, player);
}

function evaluateBoard(board) {
  const cpuScore = scorePosition(board, 2);
  const playerScore = scorePosition(board, 1);
  return cpuScore - playerScore;
}

function isBoardFull(b) {
  return b.every((row) => row.every((cell) => cell !== 0));
}

function minimax(node, alpha, beta, maximise, depth) {
  const win = winnerOnGrid(node);
  if (win === 1) return [-Infinity, null]; // human already wins
  if (win === 2) return [Infinity, null]; // CPU already wins
  if (depth === 0 || isBoardFull(node)) {
    return [evaluateBoard(node), null];
  }

  let bestScore = maximise ? -Infinity : Infinity;
  let bestCol = null;

  for (let col = 0; col < cols; col++) {
    const row = lowestEmptyRow(node, col);
    if (row === -1) continue; // column full

    const child = cloneBoard(node);
    child[row][col] = maximise ? 2 : 1;

    const [score] = minimax(child, alpha, beta, !maximise, depth - 1);

    // first legal move OR strictly better score
    if (
      bestCol === null ||
      (maximise && score > bestScore) ||
      (!maximise && score < bestScore)
    ) {
      bestScore = score;
      bestCol = col;
    }

    if (maximise) {
      alpha = Math.max(alpha, bestScore);
    } else {
      beta = Math.min(beta, bestScore);
    }
    if (alpha >= beta) break; // α-β cutoff
  }

  return [bestScore, bestCol];
}

function cloneBoard(board) {
  return board.map((row) => [...row]);
}

function cpuMove() {
  cpuTimeoutId = setTimeout(() => {
    let [, bestCol] = minimax(
      cloneBoard(board.value),
      -Infinity,
      Infinity,
      true,
      depth.value
    );
    if (bestCol === null) {
      for (let col = 0; col < cols; col++) {
        if (lowestEmptyRow(board.value, col) !== -1) {
          // column not full
          bestCol = col;
          break;
        }
      }
    }
    if (bestCol !== null) playMove(bestCol);
  }, 1200);
}

function playMove(col) {
  if (showPauseModal.value || winner.value) return;
  const position = dropDisk(col);
  if (!position) return;

  if (isWinningMove(board.value, currentPlayer.value)) {
    const cells = findWinningCells(board.value, currentPlayer.value);
    if (cells) {
      winningCells.value = cells;
      winner.value = currentPlayer.value;
      winnerModalTimeoutId = setTimeout(() => {
        showWinnerModal.value = true;
      }, 1500);
      pauseTimer();
      clearTimeout(cpuTimeoutId);
      if (winner.value === 1) {
        playerScore.value += 1;
      } else {
        cpuScore.value += 1;
      }
      return;
    }
  }

  if (isBoardFull(board.value)) {
    pauseTimer();
    clearTimeout(cpuTimeoutId);
    winnerModalTimeoutId = setTimeout(() => {
      showWinnerModal.value = true;
    }, 1500);
    winner.value = 0;
    return;
  }

  currentPlayer.value = currentPlayer.value === 1 ? 2 : 1;
  if (currentPlayer.value === 2 && !winner.value) {
    cpuMove();
  }
  restartTimer();
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
  @apply transition-opacity duration-200 ease-in-out;
}
.container {
  @apply relative mx-auto flex h-[90vh] xs:h-screen w-full flex-col items-center justify-center px-6 z-20;

  .player-cards-wrapper {
    @apply lg:absolute w-82 md:w-125 lg:w-220 gap-12 pb-8 lg:pb-0 lg:gap-0 flex justify-between items-center;
  }

  .game-board {
    @apply mx-auto flex w-full flex-row items-center justify-center gap-20;

    .board-wrapper {
      @apply relative md:h-[420px] md:w-[500px];

      & > img {
        @apply relative z-[5] pointer-events-none;
      }

      .marker-grid {
        @apply absolute inset-0 grid md:h-[420px] md:w-[500px] grid-cols-7 gap-[0.6rem] px-2 md:gap-[0.8rem] md:px-[0.8rem] py-0 z-[6];

        .marker-wrapper {
          @apply absolute -top-16 hidden lg:grid h-12 w-full grid-cols-7 gap-[0.8rem] [grid-template-areas:'col1_col2_col3_col4_col5_col6_col7'] px-[0.8rem] pt-[0.8rem] z-[4];

          .marker {
            @apply flex justify-center;
          }
        }

        .col {
          @apply cursor-pointer;
        }
      }

      .cells-grid {
        @apply absolute inset-0 grid md:h-[420px] md:w-[500px] grid-cols-7 grid-rows-6 pb-[2.3rem] pt-2 px-2 gap-[0.6rem] md:gap-[0.8rem] md:px-[0.8rem] md:pt-[0.8rem] md:pb-0 z-[3];

        .cell {
          @apply relative cursor-pointer;

          .disk-wrapper {
            @apply relative inset-0 h-11 w-11 md:h-14 md:w-14 pointer-events-none;
            animation: dropAnimation 0.5s ease-out;

            .winner-circle {
              @apply absolute w-4 h-4 xs:w-6 xs:h-6 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-white z-10 pointer-events-none;
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
    transform: translateY(-500px);
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
  @apply absolute bottom-0  h-[calc(50%-170px)] lg:h-[calc(50%-205px)] w-full rounded-t-[40px] lg:rounded-t-[60px] bg-dark-blue;
}
</style>
