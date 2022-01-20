// Initialize Cloud Firestore through Firebase
import { initializeApp } from "firebase/app"
import { getFirestore, doc, onSnapshot,collection,getDocs,addDoc, orderBy } from "firebase/firestore"
const firebaseApp = initializeApp({
    apiKey: "AIzaSyBdOs_FtWN077DWtHxYKx9xuf1yfT8M3oA",
    authDomain: "messenger-clone-947ff.firebaseapp.com",
    projectId: "messenger-clone-947ff",
    storageBucket: "messenger-clone-947ff.appspot.com",
    messagingSenderId: "879451149866",
    appId: "1:879451149866:web:230eb3c949b610b7c59553"
});

const db = getFirestore();

export {
    db,
    doc,
    onSnapshot,
    getDocs,collection,
    addDoc
}