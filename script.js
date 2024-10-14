// Import the Firebase SDK components
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-auth.js";

// Firebase configuration settings for the web app
const firebaseConfig = {
    apiKey: "AIzaSyCPfG6EQ4pZGb6EQcc6uNK22eauvLINUdQ", // API key for accessing Firebase services
    authDomain: "teacher-booking-eb429.firebaseapp.com", // Firebase Authentication domain
    projectId: "teacher-booking-eb429", // Identifier for the Firebase project
    storageBucket: "teacher-booking-eb429.appspot.com", // Storage bucket for the project
    messagingSenderId: "839379658332", // Sender ID for Firebase Cloud Messaging
    appId: "1:839379658332:web:98f4a343722649453c6899", // Unique identifier for the app
    measurementId: "G-SXMS7694BD" // Measurement ID for Google Analytics
};

// Initialize Firebase app with the provided configuration
const app = initializeApp(firebaseConfig); 
const auth = getAuth(app); // Get the Firebase Authentication instance

// Toggle between the Register and Login forms
document.getElementById('show-login').addEventListener('click', () => {
    // Hide the registration form and show the login form
    document.getElementById('register').style.display = 'none';
    document.getElementById('login').style.display = 'block';
});

document.getElementById('show-register').addEventListener('click', () => {
    // Hide the login form and show the registration form
    document.getElementById('login').style.display = 'none';
    document.getElementById('register').style.display = 'block';
});

// Handle user registration
document.getElementById('register-button').addEventListener('click', () => {
    const email = document.getElementById('register-email').value; // Retrieve email from input
    const password = document.getElementById('register-password').value; // Retrieve password from input

    // Create a new user with the provided email and password
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user; // Get the registered user object
            console.log('User registered:', user); // Log the registration details
            document.getElementById('register-message').innerText = 'Registration successful!'; // Display success message
        })
        .catch((error) => {
            console.error('Error:', error.code, error.message); // Log error details
            document.getElementById('register-message').innerText = `Error: ${error.message}`; // Display error message
        });
});

// Handle user login
document.getElementById('login-button').addEventListener('click', () => {
    const email = document.getElementById('login-email').value; // Retrieve email from input
    const password = document.getElementById('login-password').value; // Retrieve password from input

    // Sign in the user with the provided email and password
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user; // Get the logged-in user object
            console.log('User logged in:', user); // Log the login details
            document.getElementById('login-message').innerText = 'Login successful!'; // Display success message
            
            // Redirect to the book-appointment page upon successful login
            window.location.href = 'book-appointment.html';
        })
        .catch((error) => {
            console.error('Error:', error.code, error.message); // Log error details
            document.getElementById('login-message').innerText = `Error: ${error.message}`; // Display error message
        });
});

// Initial setup for forms when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    const registerForm = document.getElementById("register"); // Get the registration form element
    const loginForm = document.getElementById("login"); // Get the login form element
    const showLogin = document.getElementById("show-login"); // Get the login toggle link
    const showRegister = document.getElementById("show-register"); // Get the registration toggle link

    // Show the registration form initially
    registerForm.classList.add("active"); // Set the registration form as active

    // Event listener to toggle to the login form
    showLogin.addEventListener("click", (e) => {
        e.preventDefault(); // Prevent default link behavior
        registerForm.classList.remove("active"); // Hide the registration form
        loginForm.classList.add("active"); // Show the login form
    });

    // Event listener to toggle to the registration form
    showRegister.addEventListener("click", (e) => {
        e.preventDefault(); // Prevent default link behavior
        loginForm.classList.remove("active"); // Hide the login form
        registerForm.classList.add("active"); // Show the registration form
    });
});
