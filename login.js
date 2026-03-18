window.onload = function () {
  const form = document.getElementById("loginForm");
  const btn = document.getElementById("loginBtn");

  form.addEventListener("submit", function (e) {
    e.preventDefault(); // Stop default page reload

    // Visual feedback
    btn.textContent = "Logging in...";e
    btn.disabled = true;

    // Redirect after 1.5 seconds
    setTimeout(function () {
      window.location.href = "dashboard.html";
    }, 1500);
  });
};