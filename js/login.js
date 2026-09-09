document.getElementById("loginForm").addEventListener("submit", function(event) {

    event.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    const errorMsg = document.getElementById("errorMsg");

    // Demo Login
    if (username === "student" && password === "1234") {

        localStorage.setItem("studentName", username);

        window.location.href = "dashboard.html";

    } else {

        errorMsg.textContent = "Invalid Username or Password!";

    }

});
