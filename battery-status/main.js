let batteryStatusElement = document.getElementById('status');
let levelElement = document.getElementById('level');

navigator.getBattery().then(battery => {
  const _RED = '#cc324c';
  const _GREEN = '#b0dc4c';
  const _YELLOW = '#ffe351';

  function updateValues(batteryInfo) {
    updateChargingStatus(batteryInfo.charging);

    const level = batteryInfo.level * 100;
    levelElement.textContent = `${level}%`;

    if (level >= 75) {
      levelElement.style.color = _GREEN;
    }
    if (level >= 50 || level < 75) {
      levelElement.style.color = _GREEN;
    }
    if (level < 50) {
      levelElement.style.color = _RED;
    }
  }

  battery.addEventListener('chargingchange', (event) => {
    updateValues(event.target);
  });

  battery.addEventListener('levelchange', (event) => {
    levelElement.textContent = `${event.target.level * 100}%`;
  });

  updateValues(battery);

  function updateChargingStatus(charging) {
    batteryStatusElement.textContent = charging ? 'Charging': 'Not Charging';
    batteryStatusElement.style.color = charging ? _GREEN : _YELLOW;
  }
});