import { defineStore } from "pinia";

export const useGameStore = defineStore("game", {
  state: () => ({
    depth: 2,
  }),
  actions: {
    setDepth(d) {
      this.depth = d;
    },
  },
});
