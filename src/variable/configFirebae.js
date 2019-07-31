import firebase from 'firebase/app';
import 'firebase/storage';

export const config = {
  apiKey: "AIzaSyBNXax0KkPaPC0ohE3UbtEKlSZM603Z_QY",
  authDomain: "mad-coder.firebaseapp.com",
  databaseURL: "https://mad-coder.firebaseio.com",
  storageBucket: "mad-coder.appspot.com",
};
firebase.initializeApp(config);

export let storage = firebase.storage();
export let storageRef = storage.ref();