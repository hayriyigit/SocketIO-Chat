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
  console.log(msg);
});

{
  /* <div class="msg sender">
              <span>Hayri</span>
              <p>Hi guys, what'sup?</p>
            </div>
            <div class="msg receiver">
              <span>Ali Firat</span>
              <p>
                All alright, nothing new, would you like to have some cups of
                wine this friday?
              </p>
            </div>
            <div class="msg sender">
              <span>Hayri</span>
              <p>Tabi ki hayir amk sarapcisi</p>
            </div> */
}
