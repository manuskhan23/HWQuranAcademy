const firebaseConfig = {
  apiKey: "AIzaSyD_sKuSExdMVoIrxQJeNaDQuoCfUbhwKL8",
  authDomain: "quran-academy-eb7e6.firebaseapp.com",
  projectId: "quran-academy-eb7e6",
  storageBucket: "quran-academy-eb7e6.firebasestorage.app",
  messagingSenderId: "571576557828",
  appId: "1:571576557828:web:e5b640552dffa7e5ca7051",
  measurementId: "G-SF14G3CT8D"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
// const analytics = firebase.getAnalytics(app);
const db = firebase.database();
const auth = firebase.auth();

// Get current page path
const currentPath = window.location.pathname;

// Function to get correct path for redirects
function getPath(target) {
    if (currentPath.includes('main pages')) {
        return target === 'login' ? '../../mlogin.html' : 'index.html';
    } else if (currentPath.includes('login/html')) {
        return target === 'login' ? '../../mlogin.html' : '../../main pages/html/index.html';
    } else {
        return target === 'login' ? 'mlogin.html' : 'main pages/html/index.html';
    }
}

// Get DOM elements
const loginBtn = document.getElementById("login");
const form = document.getElementById('loginForm');
const email = document.getElementById('email');
const password = document.getElementById('password');
const name = document.getElementById('name');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const nameError = document.getElementById('nameError');
const card = document.getElementById('loginCard');

// Google Login Function
function loginWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
        .then((result) => {
            const user = result.user;
            // Save user data to database
            return db.ref('users/' + user.uid).set({
                email: user.email,
                displayName: user.displayName,
                createdAt: new Date().toISOString(),
                lastLogin: new Date().toISOString(),
                loginType: 'google'
            });
        })
        .then(() => {
            // Redirect to home page
            window.location.href = getPath('home');
        })
        .catch((error) => {
            console.error("Google login error:", error);
            alert(error.message);
        });
}

// Authentication state observer
auth.onAuthStateChanged((user) => {
    if (loginBtn) {
        if (user) {
            // User is authenticated
            loginBtn.innerHTML = `
                <a class="mt-2 nav-link text-white" href="#">
                    <i class="icon">👤</i> ${user.displayName || 'User'}
                    <button onclick="logout()" class="btn btn-link text-white p-0 ms-2">
                        <small>(Logout)</small>
                    </button>
                </a>
            `;
        } else {
            // User is not authenticated
            loginBtn.innerHTML = `
                <a class="mt-2 nav-link text-white" href="${getPath('login')}">
                    <i class="icon">🔑</i> Login
                </a>
            `;
        }
    }
});

// Form handling
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let valid = true;

        // Form validation
        if (name && name.value.trim() === "") {
            if (nameError) nameError.style.display = 'block';
            name.classList.add('is-invalid');
            valid = false;
        } else if (name) {
            if (nameError) nameError.style.display = 'none';
            name.classList.remove('is-invalid');
        }

        if (email.value.trim() === "") {
            if (emailError) emailError.style.display = 'block';
            email.classList.add('is-invalid');
            valid = false;
        } else {
            if (emailError) emailError.style.display = 'none';
            email.classList.remove('is-invalid');
        }

        if (password.value.trim() === "") {
            if (passwordError) passwordError.style.display = 'block';
            password.classList.add('is-invalid');
            valid = false;
        } else {
            if (passwordError) passwordError.style.display = 'none';
            password.classList.remove('is-invalid');
        }

        if (!valid) {
            if (card) {
                card.classList.add('shake');
                setTimeout(() => card.classList.remove('shake'), 500);
            }
            return;
        }

        // Handle signup
        if (name) {
            auth.createUserWithEmailAndPassword(email.value, password.value)
                .then((userCredential) => {
                    const user = userCredential.user;
                    return user.updateProfile({
                        displayName: name.value
                    }).then(() => {
                        return db.ref('users/' + user.uid).set({
                            email: user.email,
                            displayName: name.value,
                            createdAt: new Date().toISOString(),
                            lastLogin: new Date().toISOString(),
                            loginType: 'email'
                        });
                    });
                })
                .then(() => {
                    alert("Account created successfully!");
                    window.location.href = getPath('login');
                })
                .catch((error) => {
                    console.error("Signup error:", error);
                    alert(error.message);
                });
        } 
        // Handle login
        else {
            auth.signInWithEmailAndPassword(email.value, password.value)
                .then((userCredential) => {
                    const user = userCredential.user;
                    return db.ref('users/' + user.uid).update({
                        lastLogin: new Date().toISOString()
                    });
                })
                .then(() => {
                    window.location.href = getPath('home');
                })
                .catch((error) => {
                    console.error("Login error:", error);
                    alert(error.message);
                });
        }
    });
}

// Logout function
function logout() {
    const user = auth.currentUser;
    if (user) {
        db.ref('users/' + user.uid).update({
            lastLogout: new Date().toISOString()
        })
        .then(() => auth.signOut())
        .then(() => {
            window.location.href = getPath('login');
        })
        .catch((error) => {
            console.error("Logout error:", error);
            alert(error.message);
        });
    }
}

// Make functions available globally
window.loginWithGoogle = loginWithGoogle;
window.logout = logout;
// contact
function sendmsg(event) {
  event.preventDefault(); // Prevent form submission

  // Get form values
  const name = document.getElementById("cname").value;
  const cemail = document.getElementById("cemail").value;
  const phone = document.getElementById("cphone").value;
  const subject = document.getElementById("csubject").value;
  const msg = document.getElementById("cmassage").value;

  // Validate fields
  if (!name || !cemail || !phone || !subject || !msg) {
    alert("Please fill all fields");
    return;
  }

  const contactData = {
    name,
    cemail, 
    phone,
    subject,
    massage: msg,
    timestamp: Date.now()
  };

  // Send to Firebase
  firebase.database().ref("contact").push(contactData)
    .then(() => {
      alert("Message sent successfully!");
      // Clear form
      document.querySelector("form").reset();
    })
    .catch(error => {
      console.error("Error sending message:", error);
      alert("Error sending message. Please try again.");
    });
}