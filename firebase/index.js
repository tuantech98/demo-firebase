

const express = require('express')
var cors = require('cors')
var faker = require('faker');

var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
}

const app = express()
app.use(cors())


var admin = require("firebase-admin");
const { getDatabase } = require('firebase-admin/database');

var serviceAccount = require("./key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://tuannguyen-d268a-default-rtdb.asia-southeast1.firebasedatabase.app" // "https://tuannguyen-6236d-default-rtdb.asia-southeast1.firebasedatabase.app"
});


const db = admin.database();


app.get('/', function(req, res) {
  const userId = req.query.id;
  
  if (!userId) return res.json({ error: "Invalid user" })
  return admin.auth().createCustomToken(userId).then(function(token){
     res.json({ token: token });
  })
  .catch(function(error) {
    res.status(500).json({error: String(error) });
  });

});

app.get('/ping', async function(req, res) {
  const userId = req.query.id;
  const mess = req.query.mess || faker.name.findName()
  
  if (!userId) return res.json({ error: "Invalid user" });

  const newContact = {
      mess: mess,
      uid: userId
  }
  await db.ref(`message/${userId}`).push(newContact);
  res.send("ok")
});

app.listen(5000, () => console.log(">>>>>> Server running at port 5000"))










// var db = admin.database();

// var ref = db.ref("message");
// ref.once("value", function(snapshot) {
//   console.log(snapshot.val());
// });

// ref.on("value", function(data) {
//   console.log(">>>>> CHANGE DATA:", JSON.stringify(data))
// })

// const usersRef = ref.child('users/abc');
// usersRef.set({
//   alanisawesome: {
//     date_of_birth: 'June 23, 1912',
//     full_name: 'Alan Turing'
//   },
//   gracehop: {
//     date_of_birth: 'December 9, 1906',
//     full_name: 'Grace Hopper'
//   }
// });



// ==========================================






// const { initializeApp } = require('@firebase/app');
// const { getAuth } = require ("@firebase/auth");

// const firebaseConfig = {
//   apiKey: "AIzaSyAYJ_4_FG8Y-sSdu8N8V6zMqjG6ysKLx8s",
//   authDomain: "tuannguyen-6236d.firebaseapp.com",
//   databaseURL: "https://tuannguyen-6236d-default-rtdb.asia-southeast1.firebasedatabase.app",
//   storageBucket: "tuannguyen-6236d.appspot.com"
// };

// const auth = getAuth(firebaseConfig);
// auth.onAuthStateChanged((user) => {
//   console.log({  user })
// })

// const appF = initializeApp();

// appF.auth().signInWithCustomToken(token)
//   .then((userCredential) => {
//     // Signed in
//     var user = userCredential.user;
//     // ...
//   })
//   .catch((error) => {
//     var errorCode = error.code;
//     var errorMessage = error.message;
    
//     console.log(error)
//   });

// signInWithCustomToken(auth, token)
//   .then((userCredential) => {
//     const user = userCredential.user;
//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//   });

// const firebaseConfig = {
//   apiKey: "AIzaSyAYJ_4_FG8Y-sSdu8N8V6zMqjG6ysKLx8s",
//   authDomain: "tuannguyen-6236d.firebaseapp.com",
//   databaseURL: "https://tuannguyen-6236d-default-rtdb.asia-southeast1.firebasedatabase.app",
//   storageBucket: "tuannguyen-6236d.appspot.com"
// };
// const appF = initializeApp();


// initializeApp.auth().signInWithCustomToken(token) // token này được truyền từ server xuống client (từ file blade của Laravel vào file js)
// .then(function () {
//     alert('Đăng nhập thành công');
// })
// .catch(function(error) {
//       if (error.code === 'auth/invalid-custom-token') {
//           alert('Hết hạn đăng nhập');
//       } else {
//           alert('Lỗi xác thực');
//       }
// });

// // const database = getDatabase(appF);

// appF.auth().signInWithCustomToken("token")
// .then(function () {
//     alert('Đăng nhập thành công');
// })
// .catch(function(error) {
//       if (error.code === 'auth/invalid-custom-token') {
//           alert('Hết hạn đăng nhập');
//       } else {
//           alert('Lỗi xác thực');
//       }
// });

