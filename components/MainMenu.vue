<template>
  <div class="container">
    <div class="wrapper">
      <div class="menu">
        <img
          src="../assets/images/logo-connect-four.svg"
          alt="logo connect four"
          class="w-fit"
        />
        <div class="buttons">
          <button class="player-vs-cpu-btn">
            <p>Play vs CPU</p>
            <img src="../assets/images/player-vs-cpu.svg" alt="player-vs-cpu" />
          </button>
          <div class="player-vs-cpu-bg"></div>
          <button class="player-vs-player-btn">
            <p>Play vs Player</p>
            <img
              src="../assets/images/player-vs-player.svg"
              alt="player-vs-player"
            />
          </button>
          <div class="player-vs-player-bg"></div>
          <button class="rules-btn">
            <p>Game Rules</p>
          </button>
          <div class="rules-bg"></div>
        </div>
      </div>
      <div class="menu-bg"></div>
    </div>
  </div>
</template>

<style>
@reference "../assets/css/main.css";

.container {
  @apply mx-auto max-w-3xl w-full h-screen flex items-center justify-center;
}

.wrapper {
  @apply relative;
}

.menu {
  @apply relative z-20 min-w-[30rem] gap-16 p-10 items-center justify-between flex flex-col bg-dark-blue rounded-4xl border-[3px] border-black;
}

.buttons {
  @apply flex flex-col w-full gap-8;
}

button {
  @apply flex cursor-pointer px-8 py-3 relative z-20 justify-between items-center uppercase rounded-3xl border-[3px] border-black;
}

.player-vs-cpu-btn {
  @apply bg-red;
}

.player-vs-cpu-bg {
  @apply w-[395px] h-[74px] top-[36%];
}

.player-vs-player-btn {
  @apply bg-orange;
}

.player-vs-player-bg {
  @apply w-[395px] h-[74px] top-[58%];
}

.player-vs-player-bg,
.player-vs-cpu-bg,
.rules-bg {
  @apply absolute bg-black rounded-3xl z-10;
}

.rules-btn {
  @apply bg-white py-5;
}

.rules-bg {
  @apply w-[395px] h-[74px] top-[79%];
}

.menu-bg {
  @apply absolute z-10 h-[450px] w-[30rem] bg-black rounded-4xl top-6;
}
</style>
