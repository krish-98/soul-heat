import { useEffect } from "react"
import { collection, addDoc, getDocs, doc } from "firebase/firestore"
import { db } from "../configs/firebase.config"

const Firestore = () => {
  const addDataToDocument = async () => {
    try {
      const docRef = await addDoc(collection(db, "user2"), {
        first: "Murali Krishnan",
        last: "M",
        born: 1998,
      })
      console.log(docRef)
      console.log("Document written with ID: ", docRef.id)
    } catch (e) {
      console.error("Error adding document: ", e)
    }
  }

  const colRef = collection(db, "user2")

  const fecthData = async () => {
    try {
      const snapshot = await getDocs(colRef)
      console.log(snapshot.docs.map((doc) => console.log(doc.data())))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fecthData()
    // return () => {

    // }
  }, [])

  return (
    <div>
      <h1>Firestore</h1>

      <button
        onClick={addDataToDocument}
        className="bg-orange-400 p-2 text-white rounded-lg px-4 cursor-pointer"
      >
        Add data to the Document
      </button>
    </div>
  )
}

export default Firestore
