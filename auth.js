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
const app = firebase.initializeApp(firebaseConfig);
// console.log(app)
const db = firebase.database();
console.log(db)
const auth=firebase.auth();
const loginbtn=document.getElementById("login")
const email=document.getElementById("email").value
const password=document.getElementById("password").value
const user_name=document.getElementById("name").value

function signup(){
  try{
    firebase.auth().createUserWithEmailAndPassword(email,password)
    .then(function (response){
      console.log(response)
      const user_uid=response.user.uid;

      const user_obg={
        user_name:user_name,
        password:password,
        email:email
      }

      firebase.database().ref("manage_user/" + user_uid).set(user_obg)

    })
    .catch(function (err)  {
      console.log(err)
    })
  }
  catch(err){
    console.log(err)
  }
}
function login(){}
function loginwithgoogle(){}

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