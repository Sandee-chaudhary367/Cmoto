import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth';
import 'firebase/storage'

const config ={
  apiKey: 'AIzaSyA2BXvxqGhzbqa-9eCg1EXMA7u3u0G8UsM',
  authDomain: 'cmoto-4267a.firebaseapp.com',
  databaseURL: 'https://cmoto-4267a.firebaseio.com',
  projectId: 'cmoto-4267a',
  storageBucket: 'cmoto-4267a.appspot.com',
  messagingSenderId: '416346424448',
  appId: '1:416346424448:web:e7c40ab227e4e2c9341265',
  measurementId: 'G-LLBGG2X7FH',
};


firebase.initializeApp(config)
export const storage = firebase.storage()
export const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase

/*como
 {
  apiKey: "AIzaSyAQer6otB3blqGh3CKrviuemGMUwd6NNDo",
  authDomain: "como-69a54.firebaseapp.com",
  databaseURL: "https://como-69a54-default-rtdb.firebaseio.com",
  projectId: "como-69a54",
  storageBucket: "como-69a54.appspot.com",
  messagingSenderId: "605959152527",
  appId: "1:605959152527:web:f0ef2156ca9c11576fa1fa",
  measurementId: "G-D2V0V7HSGB"
};
*/

/*cmoto
 {
  apiKey: 'AIzaSyA2BXvxqGhzbqa-9eCg1EXMA7u3u0G8UsM',
  authDomain: 'cmoto-4267a.firebaseapp.com',
  databaseURL: 'https://cmoto-4267a.firebaseio.com',
  projectId: 'cmoto-4267a',
  storageBucket: 'cmoto-4267a.appspot.com',
  messagingSenderId: '416346424448',
  appId: '1:416346424448:web:e7c40ab227e4e2c9341265',
  measurementId: 'G-LLBGG2X7FH',
}
*/