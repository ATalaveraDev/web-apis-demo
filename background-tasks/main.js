let tasks = [];
let totalTaskCount = 0;
let currentTaskNumber = 0;
let taskHandle = null;

let logElement = document.getElementById('log');
let progressBarElement = document.getElementById('progress');
let startButtonElement = document.getElementById('startButton');
let totalTaskCountElement = document.getElementById('totalTaskCount');
let currentTaskNumberElement = document.getElementById('currentTaskNumber');

let logFragment = null;
let refreshScheduled = false;

function enqueueTask(taskHandler, taskData) {
  tasks.push({
    handler: taskHandler,
    data: taskData
  });

  totalTaskCount++;

  if (!taskHandle) {
    taskHandle = requestIdleCallback(runTaskQueue, { timeout: 1000 });
  }

  scheduleRefresh();
}

function runTaskQueue(deadline) {
  while ((deadline.timeRemaining() > 0 || deadline.didTimeout) && tasks.length) {
    let task = tasks.shift();
    currentTaskNumber++;

    task.handler(task.data);
    scheduleRefresh();
  }

  if (tasks.length) {
    taskHandle = requestIdleCallback(runTaskQueue, { timeout: 1000} );
  } else {
    taskHandle = 0;
  }
}

function scheduleRefresh() {
  if (!refreshScheduled) {
    requestAnimationFrame(updateDisplay);
    refreshScheduled = true;
  }
}

function updateDisplay() {
  let scrollDown = logElement.scrollHeight - logElement.clientHeight <= logElement.scrollTop + 1;

  if (totalTaskCount) {
    if (progressBarElement.max !== totalTaskCount) {
      totalTaskCountElement.textContent = totalTaskCount;
      progressBarElement.max = totalTaskCount;
    }

    if (progressBarElement.value !== currentTaskNumber) {
      currentTaskNumberElement.textContent = currentTaskNumber;
      progressBarElement.value = currentTaskNumber;
    }
  }

  if (logFragment) {
    logElement.appendChild(logFragment);
    logFragment = null;
  }

  if (scrollDown) {
    logElement.scrollTop = logElement.scrollHeight - logElement.clientHeight;
  }

  refreshScheduled = false;
}

function log(text) {
  if (!logFragment) {
    logFragment = document.createDocumentFragment();
  }

  const newLogEntry = document.createElement('div');
  newLogEntry.textContent = text;
  logFragment.appendChild(newLogEntry);
}

function logTaskHandler(data) {
  log(`Building part #${currentTaskNumber}`);

  for (let i = 0; i < data.count; i += 1) {
    log(`${(i+1).toString()}. ${data.text}`);
  }
}

function createCyborg() {
  totalTaskCount = 0;
  currentTaskNumber = 0;
  updateDisplay();

  let iterations = generateRandomNumberInRange(100, 200);

  for (let i = 0; i < iterations; i++) {
    let taskData = {
      count: generateRandomNumberInRange(75, 150),
      text: `Developing subtask inside process ${(i+1).toString()} of ${iterations}`
    };

    enqueueTask(logTaskHandler, taskData);
  }
}

function generateRandomNumberInRange(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1) + min);
}

document.getElementById('startButton').addEventListener('click', createCyborg, false);