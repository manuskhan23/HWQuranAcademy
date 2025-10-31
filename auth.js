const firebaseConfig = {
  apiKey: "AIzaSyDQ4HNXwACeEtFF_EAgSYemVJRvg0xNX8c",
  authDomain: "quran-academy-b5e0b.firebaseapp.com",
  databaseURL: "https://quran-academy-b5e0b-default-rtdb.firebaseio.com",
  projectId: "quran-academy-b5e0b",
  storageBucket: "quran-academy-b5e0b.firebasestorage.app",
  messagingSenderId: "158938222905",
  appId: "1:158938222905:web:13f1706aeef4770ced98e8",
  measurementId: "G-2LHNZ05V8E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log(app)
const db = firebase.database();
const auth=firebase.auth();
const loginbtn=document.getElementById("login")
const semail=document.getElementById("semail")
const spassword=document.getElementById("spassword")
const sname=document.getElementById("sname")
const temail=document.getElementById("temail")
const tpassword=document.getElementById("tpassword")
const tname=document.getElementById("tname")

function slogin(){
  try{
    auth.signInWithEmailAndPassword(semail.value,spassword.value)
    .then(function (response){
      console.log(response)
    })
  }
  catch(err){
    console.log(err)
  }
}
function tlogin(){}
function sloginwithgoogle(){}
function tloginwithgoogle(){}

// contact
function sendmsg(){
const name=document.getElementById("name").value
const email=document.getElementById("email").value
const phone=document.getElementById("phone").value
const subject=document.getElementById("subject").value
const msg=document.getElementById("massage").value

const c_obg={
  name:name,
  email:email,
  phone:phone,
  subject:subject,
  massage:msg
}
console.log(c_obg)


//  send data

firebase.database().ref("contact").push(c_obg);
}