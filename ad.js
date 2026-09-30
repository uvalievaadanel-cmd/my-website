const form = document.getElementById("registerForm");
const formMessage = document.getElementById("formMessage");

function showError(input, message) {
  input.classList.add("invalid");

  const group = input.closest(".form-group");
  const error = group.querySelector(".error");

  error.textContent = message;
}

function clearError(input) {
  input.classList.remove("invalid");

  const group = input.closest(".form-group");
  const error = group.querySelector(".error");

  error.textContent = "";
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isStrongPassword(password) {
  const hasUppercase = /[A-ZА-ЯӘІҢҒҮҰҚӨҺ]/.test(password);
  const hasNumber = /\d/.test(password);

  return password.length >= 8 && hasUppercase && hasNumber;
}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const fullName = document.getElementById("fullName");
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const confirmPassword = document.getElementById("confirmPassword");
  const terms = document.getElementById("terms");
  const termsError = document.getElementById("termsError");

  let isValid = true;

  formMessage.textContent = "";
  formMessage.className = "form-message";
  termsError.textContent = "";

  [fullName, email, password, confirmPassword].forEach(clearError);

  if (fullName.value.trim().length < 2) {
    showError(fullName, "Аты-жөніңізді енгізіңіз.");
    isValid = false;
  }

  if (!isValidEmail(email.value.trim())) {
    showError(email, "Дұрыс электрондық пошта енгізіңіз.");
    isValid = false;
  }

  if (!isStrongPassword(password.value)) {
    showError(
      password,
      "Құпиясөз кемінде 8 таңбадан, бір бас әріптен және бір саннан тұрсын."
    );

    isValid = false;
  }

  if (confirmPassword.value !== password.value) {
    showError(confirmPassword, "Құпиясөздер бірдей емес.");
    isValid = false;
  }

  if (!terms.checked) {
    termsError.textContent = "Қолдану ережелерімен келісу қажет.";
    isValid = false;
  }

  if (isValid) {
    formMessage.textContent =
      "Тіркелу сәтті өтті! Бұл әзірше демонстрациялық нұсқа.";

    formMessage.classList.add("success");
    form.reset();
  }
});

document.querySelectorAll(".show-password").forEach(function (button) {
  button.addEventListener("click", function () {
    const input = document.getElementById(button.dataset.target);
    const passwordIsHidden = input.type === "password";

    input.type = passwordIsHidden ? "text" : "password";
    button.textContent = passwordIsHidden ? "Жасыру" : "Көрсету";
  });
});

document.querySelectorAll(".form-group input").forEach(function (input) {
  input.addEventListener("input", function () {
    clearError(input);
    formMessage.textContent = "";
  });
});

