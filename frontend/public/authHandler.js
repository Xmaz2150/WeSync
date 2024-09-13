// Get elements
const modal = document.getElementById("authModal");
const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");
const closeModal = document.querySelector(".close-btn");

// Show signup form
document.getElementById("showSignup").addEventListener("click", (e) => {
  e.preventDefault();
  loginForm.style.display = "none";
  signupForm.style.display = "block";
});

// Show login form
document.getElementById("showLogin").addEventListener("click", (e) => {
  e.preventDefault();
  signupForm.style.display = "none";
  loginForm.style.display = "block";
});

// Close modal
closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});

// Open modal (you can trigger this based on a button click somewhere on the page)
function openAuthModal() {
  modal.style.display = "flex";
}

// Handle login form submission
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  const response = await fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const result = await response.json();
  if (response.ok) {
    alert(result.message);
    modal.style.display = "none"; // Close modal on success
  } else {
    alert(result.message);
  }
});

// Handle signup form submission
signupForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (password !== confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  const response = await fetch("/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const result = await response.json();
  if (response.ok) {
    alert(result.message);
    modal.style.display = "none"; // Close modal on success
  } else {
    alert(result.message);
  }
});
