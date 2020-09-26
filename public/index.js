const usernameInput = document.getElementById("username");
const loginButton = document.getElementById("login");

loginButton.addEventListener("click", () => {
  const content = usernameInput.value.toString();

  if (!content) {
    alert("Please enter a username");
  } else {
    localStorage.setItem("username", content);
    document.location.href = "/rooms";
  }
});
