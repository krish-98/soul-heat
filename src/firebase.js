import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCQ3el-boNY8IN2v0cVZLLUunSHMTsnuMk",
  authDomain: "soul-heat.firebaseapp.com",
  projectId: "soul-heat",
  storageBucket: "soul-heat.appspot.com",
  messagingSenderId: "979216988232",
  appId: "1:979216988232:web:8237add6744de39642007d",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

export { app, auth }
