import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import "firebase/performance";

const config = {
    apiKey: "AIzaSyDNV66Y6OvQejjbDmCObRizNx_d0vNT6H4",
    authDomain: "socialanalytics-94264.firebaseapp.com",
    databaseURL: "https://socialanalytics-94264.firebaseio.com",
    projectId: "socialanalytics-94264",
    storageBucket: "",
    messagingSenderId: "96735003275",
    appId: "1:96735003275:web:c2e5caaba7cf5f5c"
  };
firebase.initializeApp(config)

export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const firebaseAuth = firebase.auth
export const db = firebase.firestore();
export const perf = firebase.performance();

export function loginWithGoogle() {
  return firebaseAuth().signInWithRedirect(googleProvider);
}

export function auth(email, pw) {
  let username = localStorage.getItem('user')
  return firebaseAuth().createUserWithEmailAndPassword(email, pw)
    .then(function (newUser) {
      db.collection("users").doc(newUser.user.uid).set({
        email: email,
        username: username,
        funds: "100000",
        currentfunds: "100000",
        positions: "0"
      })
        .catch(function (error) {
          console.error("Error writing document: ", error);
        });
      return firebase.auth().currentUser.updateProfile({
        displayName: username
      });
    })

}

export function logout() {
  return firebaseAuth().signOut()
}

export function login(email, pw) {
  return firebaseAuth().signInWithEmailAndPassword(email, pw)
}

export function resetPassword(email) {
  return firebaseAuth().sendPasswordResetEmail(email)
}

