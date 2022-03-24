let connectButtonElement = document.getElementById('connectButton');
let sendButtonElement = document.getElementById('sendButton');
let bc;

connectButtonElement.addEventListener('click', (event) => {
  bc = new BroadcastChannel('neural_system-channel');

  bc.onmessage = event => { 
    console.log(event)
    document.getElementById('log').textContent = event.data;
  }
});

