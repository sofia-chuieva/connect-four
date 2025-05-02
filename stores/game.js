import { defineStore } from "pinia";

export const useGameStore = defineStore("game", {
  state: () => ({
    depth: 3,
  }),
  actions: {
    setDepth(d) {
      this.depth = d;
    },
  },
});
