document.addEventListener("DOMContentLoaded", function () {
    // Fetch and display bus timings
    if (document.getElementById("bus-timings")) {
        fetch("http://localhost:5000/api/bus-timings")
            .then(response => response.json())
            .then(data => {
                const tableBody = document.querySelector("#bus-timings tbody");
                data.forEach(bus => {
                    let row = `<tr>
                        <td>${bus.route}</td>
                        <td>${bus.departure}</td>
                        <td>${bus.arrival}</td>
                    </tr>`;
                    tableBody.innerHTML += row;
                });
            });
    }

    // Handle Bus Pass Booking
    const busPassForm = document.getElementById("bus-pass-form");
    if (busPassForm) {
        busPassForm.addEventListener("submit", function(event) {
            event.preventDefault();
            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const route = document.getElementById("route").value;

            fetch("http://localhost:5000/api/book-pass", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, route })
            })
            .then(response => response.json())
            .then(data => alert(data.message));
        });
    }
    // Handle Sign Up
    const signupForm = document.getElementById("signup-form");
    if (signupForm) {
        signupForm.addEventListener("submit", function(event) {
            event.preventDefault();
            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            fetch("http://localhost:5000/api/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password })
            })
            .then(response => response.json())
            .then(data => alert(data.message));
        });
    }

    // Handle Sign In
    const loginForm = document.getElementById("login-form");
    if (loginForm) {
        loginForm.addEventListener("submit", function(event) {
            event.preventDefault();
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            fetch("http://localhost:5000/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert("Login successful!");
                    localStorage.setItem("token", data.token);
                    window.location.href = "dashboard.html"; // Redirect after login
                } else {
                    alert("Invalid credentials");
                }
            });
        });
    }
});
