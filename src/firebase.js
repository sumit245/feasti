import * as firebase from "firebase";
import 'firebase/auth'
const firebaseConfig = {
  apiKey: "AIzaSyCUKpgq5nEK1NTQXoBXnj5EPH5hkr-07Mg",
  authDomain: "feasti-user.firebaseapp.com",
  databaseURL: "https://feasti-user-default-rtdb.firebaseio.com",
  projectId: "feasti-user",
  appId: "1:147437295322:android:8d23cf7145d85c3c7977e3",

};
firebase.initializeApp(firebaseConfig);
export default firebase;
