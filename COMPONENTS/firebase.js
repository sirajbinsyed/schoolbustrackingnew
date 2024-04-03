import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import { getFirestore ,collection,addDoc,getDocs,where,query,doc,updateDoc,setDoc} from 'firebase/firestore';
import {getStorage,getDownloadURL,ref,uploadBytes} from 'firebase/storage'


const firebaseConfig = {
    apiKey: "AIzaSyAmQ5_pulGLRMfvjfTx1nXW87xIGeJl4J8",
    authDomain: "bus-tracking-35630.firebaseapp.com",
    projectId: "bus-tracking-35630",
    storageBucket: "bus-tracking-35630.appspot.com",
    messagingSenderId: "435179695170",
    appId: "1:435179695170:web:a5ffe3317c3c55497811db"
  };


  const app = initializeApp(firebaseConfig);

  const auth = getAuth(app);

  const db= getFirestore(app);

  const storage= getStorage(app)

  export {auth,db,getFirestore,collection,addDoc,getDocs,query,where,storage,getDownloadURL,ref,uploadBytes,doc,updateDoc,setDoc}