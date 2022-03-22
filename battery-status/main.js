let batteryStatusElement = document.getElementById('status');
let levelElement = document.getElementById('level');

navigator.getBattery().then(battery => {
  function updateValues(batteryInfo) {
    batteryStatusElement.textContent = batteryInfo.charging ? 'Charging' : 'Not Charging';
    levelElement.textContent = `${batteryInfo.level * 100}%`;
  }

  battery.addEventListener('chargingchange', (event) => {
    updateValues(event.target);
  });

  battery.addEventListener('levelchange', (event) => {
    levelElement.textContent = `${event.target.level * 100}%`;
  });

  updateValues(battery);
})