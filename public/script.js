const socket = io();

const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (input.value) {
    socket.emit('message', input.value);
    input.value = '';
  }
});

socket.on('message', (data) => {
  const item = document.createElement('li');
  item.textContent = data;
  messages.appendChild(item);
});
