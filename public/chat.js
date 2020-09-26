const socket = io();

const sendButton = document.getElementById("send");
const messageInput = document.getElementById("message");
const chatContainer = document.getElementById("chat");

const username = localStorage.getItem("username");

sendButton.addEventListener("click", () => {
  const msg = messageInput.value.toString();
  if (!msg) {
    alert("Lutfen mesajinizi giriniz");
  } else {
    socket.emit("message", { msg, username });
  }
  messageInput.value = "";
  return false;
});

socket.on("connect", () => {
  socket.emit("connection_message", { username });
});

socket.on("connect_message", (data) => {
  chatContainer.innerHTML += `<div class="msg connect">
    <p>
      ${data.username} connected
    </p>
  </div>`;
});

socket.on("message", (data) => {
  if (data.username === username) {
    chatContainer.innerHTML += `<div class="msg sender">
    <p>
      ${data.msg}
    </p>
  </div>`;
  } else {
    chatContainer.innerHTML += `<div class="msg receiver">
    <span>${data.username}</span>
    <p>
      ${data.msg}
    </p>
  </div>`;
  }

  chatContainer.scrollTop = chatContainer.scrollHeight;
});
