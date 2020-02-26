//IIFE
(function() {
  const time = document.getElementById("timer");
  const WORK_SECONDS = 1500;
  const REST_SECONDS = 300;

  let totalSeconds = WORK_SECONDS;

  const startButton = document.getElementById("start");
  const stopButton = document.getElementById("stop");
  const resetButton = document.getElementById("reset");
  const workMode = document.getElementById("workId");
  const restMode = document.getElementById("restId");

  // sets timer to 25:00

  workMode.addEventListener("click", () => {
    if (workMode.checked) {
      clearInterval(timer);
      totalSeconds = WORK_SECONDS;
      timerDisplay(totalSeconds);
    }
  });

  //sets timer to 05:00

  restMode.addEventListener("click", () => {
    if (restMode.checked) {
      clearInterval(timer);
      totalSeconds = REST_SECONDS;
      timerDisplay(totalSeconds);
    }
  });

  startButton.addEventListener("click", () => {
    clearInterval(timer);
    if (workMode.checked) totalSeconds = totalSeconds;
    if (restMode.checked) totalSeconds = totalSeconds;
    clearInterval(timer);
    timer = setInterval(countDown, 1000);
  });

  stopButton.addEventListener("click", () => {
    clearInterval(timer);
  });

  // resets timer to 25 or 5 minutes based on workMode or restMode

  resetButton.addEventListener("click", () => {
    if (workMode.checked) {
      totalSeconds = WORK_SECONDS;
    } else if (restMode.checked) {
      totalSeconds = REST_SECONDS;
    }
    timerDisplay(totalSeconds);
  });

  // displays correctly formatted time

  function timerDisplay(totalSeconds) {
    let refactoredMinutes;
    let refactoredSeconds;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds - minutes * 60;
    refactoredMinutes =
      minutes < 10
        ? (refactoredMinutes = `0${minutes}`)
        : (refactoredMinutes = `${minutes}`);
    refactoredSeconds =
      seconds < 10
        ? (refactoredSeconds = `0${seconds}`)
        : (refactoredSeconds = `${seconds}`);
    time.innerHTML = `${refactoredMinutes}:${refactoredSeconds}`;
  }

  //decrement time until 00:00, plays timer sound

  function countDown() {
    totalSeconds--;
    timerDisplay(totalSeconds);
    if (totalSeconds == 0) {
      playSound();
      clearInterval(timer);
      time.innerHTML = "00:00";
    }
  }

  function playSound() {
    const audio = new Audio("sounds/shine-ding_GyZLjr4O.mp3");
    audio.play();
  }
  timerDisplay(totalSeconds);
})();
