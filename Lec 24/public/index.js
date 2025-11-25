let signupForm=document.querySelector("#signup-form")
let signupName=document.querySelector("#signup-name")
let signupEmail=document.querySelector("#signup-email")
let signupPassword=document.querySelector("#signup-password")

signupForm.addEventListener("submit", async function(e) {
    e.preventDefault();
    let nameValue = signupName.value;
    let emailValue = signupEmail.value;
    let passwordValue = signupPassword.value;
    const messageDiv = document.getElementById("signup-message");
    messageDiv.textContent = "";
    try {
        const response = await fetch("/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: nameValue,
                email: emailValue,
                password: passwordValue
            })
        });
        const data = await response.json();
        if (data.success) {
            messageDiv.style.color = "#28a745";
            messageDiv.textContent = data.message || "Signup successful!";
            signupForm.reset();
        } else {
            messageDiv.style.color = "#d9534f";
            messageDiv.textContent = data.message || "Signup failed.";
        }
    } catch (err) {
        messageDiv.style.color = "#d9534f";
        messageDiv.textContent = "Error connecting to server.";
    }
});