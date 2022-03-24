let sendButtonElement = document.getElementById('sendButton');
let bc = new BroadcastChannel('neural_system-channel');

sendButtonElement.addEventListener('click', (event) => {
  bc.postMessage('Ping to Neural System');
});