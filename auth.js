var firebaseConfig = {
    apiKey: "AIzaSyD_sKuSExdMVoIrxQJeNaDQuoCfUbhwKL8",
    authDomain: "quran-academy-eb7e6.firebaseapp.com",
    projectId: "quran-academy-eb7e6",
    storageBucket: "quran-academy-eb7e6.firebasestorage.app",
    messagingSenderId: "571576557828",
    appId: "1:571576557828:web:e5b640552dffa7e5ca7051",
    measurementId: "G-SF14G3CT8D",
    databaseURL: "https://quran-academy-eb7e6-default-rtdb.firebaseio.com" // Added database URL
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.database();
console.log(app);
// console.log(auth);
console.log(db);


const sname=document.getElementById('name').value;
const email=document.getElementById('email').value;
const password=document.getElementById('password').value;
const loginbtn=document.getElementById("login").value

function signup(){
  try{
    const dbsignup={
      name:sname,
      email:email,
      password:password
    }

    firebase.database().ref("auth").push(dbsignup)



    auth
    .createUserWithEmailAndPassword(email,password)

    .then(function (response) {
      console.log(response);

      response.
      user.
      sendEmailVerification()
      .then(function () {
        console.log("email verification sent...")
      })
      .catch(function (err) {
        console.log(err);
      })
    }

    )
    .catch(function (err) {
      console.log(err);
    })
    
    localStorage.setItem("name",sname)
  }
  catch(err){
    console.log(err);
  }
}

function  login(){
  try{

    auth.signInWithEmailAndPassword(email,password)
    .then(function (response){
      console.log(response);
    })
    .catch(function (err){
      console.log(err);
    })


    loginbtn.innerHTML=`<a>
    Welcome ${localStorage.getItem("name")} &nbsp;
    <button onclick="logout()" style="padding:5px 10px; background-color: red; color: white; border: none;">Logout</button>
    </a>`
  }
  catch(err){
    console.log(err);
  }
}

function logout(){
  auth.signOut()
  loginbtn.innerHTML=`
  <li class="nav-item list-unstyled mx-2" id="login"><a class="nav-link text-white" href="../mlogin.html">🔑 Login</a></li>
  `
  localStorage.removeItem("name")
}

function loginWithGoogle(){
  const provider=new firebase.auth.GoogleAuthProvider();
  firebase
  .auth()
  .signInWithPopup(provider)
  .then(function(response){
    console.log(response);
  })
  .catch(function(err){
    console.log(err);
  })
}


// contact
function sendmsg(event) {
  try{
    alert("Message sent successfully ")
    event.preventDefault();
    const cname = document.getElementById('cname').value;
    const cemail = document.getElementById('cemail').value;
    const cmsg = document.getElementById('cmessage').value;
    const cphone = document.getElementById('cphone').value;
    const csubject = document.getElementById('csubject').value;
    
    const user_obj = {
        name: cname,
        email: cemail,
        message: cmsg,
        phone: cphone,
        subject: csubject
    };
    
    firebase.database().ref("contact").push(user_obj)
    // input empty when user click on submit
    cname.value = "";
    cemail.value = "";
    cmsg.value = "";
    cphone.value = "";  
    csubject.value = "";
  }
  catch(err){
    console.log(err);
  }
}