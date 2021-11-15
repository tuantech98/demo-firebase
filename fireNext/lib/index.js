import { initializeApp } from 'firebase/app';
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyChZXw44thRcqiDxFhFmX-VsII5SHsVAxs",
    authDomain: "tuannguyen-d268a.firebaseapp.com",
    databaseURL: "https://tuannguyen-d268a-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "tuannguyen-d268a",
    storageBucket: "tuannguyen-d268a.appspot.com",
    messagingSenderId: "555602032443",
    appId: '1:555602032443:web:da8445819d2ce31756a91e'
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);



import { getDatabase, ref, onValue} from "firebase/database";

const db = getDatabase();
const starCountRef = ref(db, 'posts/' + postId + '/starCount');
onValue(starCountRef, (snapshot) => {
  const data = snapshot.val();
  updateStarCount(postElement, data);
});



export default database;



// import firebase from 'firebase';

// const firebaseApp = firebase.initializeApp({
//   apiKey: "AIzaSyChZXw44thRcqiDxFhFmX-VsII5SHsVAxs",
//   authDomain: "tuannguyen-d268a.firebaseapp.com",
//   databaseURL: "https://tuannguyen-d268a-default-rtdb.asia-southeast1.firebasedatabase.app",
//   projectId: "tuannguyen-d268a",
//   storageBucket: "tuannguyen-d268a.appspot.com",
//   messagingSenderId: "555602032443",
//   appId: '1:555602032443:web:da8445819d2ce31756a91e'
// });

// const DB = firebaseApp.database()

// export default DB;
