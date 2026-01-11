let loggedIn = false;

const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");

loginBtn.onclick = () => {
    loggedIn = true;
    loginBtn.style.display = "none";
    logoutBtn.style.display = "inline";
    alert("Logged in successfully");
};

logoutBtn.onclick = () => {
    loggedIn = false;
    loginBtn.style.display = "inline";
    logoutBtn.style.display = "none";
    alert("Logged out");
};

function bookToken() {
    alert("Redirect to Token Booking Page");
    // later → window.location.href = "/tokens/create/";
}