document.addEventListener('visibilitychange', () => {
  navigator.sendBeacon('http://localhost:3000/', JSON.stringify({ data: 'Beacon Data' }));
})