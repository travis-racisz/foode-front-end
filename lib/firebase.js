import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore'
import { getAuth } from 'firebase/auth';
import "firebase/app";
import { addDoc, doc, collection, onSnapshot, updateDoc } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: "AIzaSyDvt4s3cLo33JVRqtRTbuli2-1WzVzt5D8",

	authDomain: "foode-b60da.firebaseapp.com",

	projectId: "foode-b60da",

	storageBucket: "foode-b60da.appspot.com",

	messagingSenderId: "101793080333",

	appId: "1:101793080333:web:c318af87c26728bb04a144",

	measurementId: "G-E2KEH5TSC3",
};

// // Initialize Firebase

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const db = getFirestore(app);
export { addDoc, doc, collection, onSnapshot, updateDoc, auth };
// //   const analytics = getAnalytics(app)
