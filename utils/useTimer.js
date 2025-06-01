import { ref, onMounted, onUnmounted } from "vue";

export function useTimer(initialSeconds, handlePlayerTimeout) {
  const initialTimer = ref(initialSeconds);
  let intervalId = null;

  function startTimer() {
    intervalId = setInterval(() => {
      if (initialTimer.value > 0) {
        initialTimer.value--;
      } else {
        handlePlayerTimeout();
        clearInterval(intervalId);
      }
    }, 1000);
  }

  function restartTimer() {
    clearInterval(intervalId);
    initialTimer.value = initialSeconds;
    startTimer();
  }

  function resumeTimer() {
    clearInterval(intervalId);
    startTimer();
  }

  function pauseTimer() {
    clearInterval(intervalId);
  }

  onMounted(startTimer);
  onUnmounted(() => clearInterval(intervalId));

  return { initialTimer, restartTimer, resumeTimer, pauseTimer };
}
