const form = document.querySelector(".login-form");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const togglePasswordBtn = document.getElementById("togglePassword");
const emailError = document.getElementById("email-error");
const passwordError = document.getElementById("password-error");

const emailErrorText = "Please enter a valid email address.";
const passwordErrorBaseText = "Min 8 chars, 1 upper, 1 lower, 1 special";

function validateEmail(email) {
  return /\S+@\S+\.\S+/.test(email);
}

function getPasswordErrors(password) {
  const errors = [];
  if (password.length < 8) errors.push("min 8 chars");
  if (!/[A-Z]/.test(password)) errors.push("uppercase");
  if (!/[a-z]/.test(password)) errors.push("lowercase");
  if (!/[\W_]/.test(password)) errors.push("special");
  return errors;
}

emailInput.addEventListener("input", () => {
  const email = emailInput.value.trim();
  if (!validateEmail(email)) {
    emailInput.classList.add("error");
    emailError.textContent = "";
    emailError.style.display = "none";
  } else {
    emailInput.classList.remove("error");
    emailError.textContent = "";
    emailError.style.display = "none";
  }
});

passwordInput.addEventListener("input", () => {
  const password = passwordInput.value;
  const errors = getPasswordErrors(password);
  if (password && errors.length) {
    passwordInput.classList.add("error");
    passwordError.textContent = "";
    passwordError.style.display = "none";
  } else {
    passwordInput.classList.remove("error");
    passwordError.textContent = "";
    passwordError.style.display = "none";
  }
});

togglePasswordBtn.addEventListener("click", () => {
  const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
  passwordInput.setAttribute("type", type);
  togglePasswordBtn.textContent = type === "password" ? "👁️" : "🙈";
});

form.addEventListener("submit", function (e) {
  e.preventDefault();

  let valid = true;
  const email = emailInput.value.trim();
  if (!validateEmail(email)) {
    emailInput.classList.add("error");
    emailError.textContent = emailErrorText;
    emailError.style.display = "block";
    valid = false;
  } else {
    emailInput.classList.remove("error");
    emailError.textContent = "";
    emailError.style.display = "none";
  }

  const password = passwordInput.value;
  const errors = getPasswordErrors(password);
  if (errors.length) {
    passwordInput.classList.add("error");
    passwordError.textContent =
      errors.length === 4
        ? passwordErrorBaseText
        : errors.map((e) => (e === "min 8 chars" ? e : `missing ${e}`)).join(", ");
    passwordError.style.display = "block";
    valid = false;
  } else {
    passwordInput.classList.remove("error");
    passwordError.textContent = "";
    passwordError.style.display = "none";
  }

  if (valid) {
    alert("Login successful!");
  }
});