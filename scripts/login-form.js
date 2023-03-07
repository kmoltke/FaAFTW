//DOM selectors
const loginForm = document.getElementById("loginForm");
const nameInput = document.getElementById("fullNameInput");
const emailInput = document.getElementById("emailInput");
const passwordInput = document.getElementById("passwordInput");
const rememberMeCheckbox = document.getElementById("rememberMeCheckbox");

//loginInformation initial state
const loginInformation = {
  user: "",
  email: "",
  password: "",
  remember: "off",
};

//Event handlers
nameInput.addEventListener("change", (e) => {
  loginInformation.user = e.target.value;
});
emailInput.addEventListener("change", (e) => {
  loginInformation.email = e.target.value;
});
passwordInput.addEventListener("change", (e) => {
  loginInformation.password = e.target.value;
});
rememberMeCheckbox.addEventListener("change", (e) => {
  loginInformation.remember = e.target.value;
});

//Form submission
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  localStorage.setItem("userInfo", JSON.stringify(loginInformation));
  alert("You have logged in successfully, you will be redirected shortly..");
  window.location.replace("../pages/index.html");
  loginForm.reset();
});
