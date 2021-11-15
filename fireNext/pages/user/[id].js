import Link from 'next/link';
import { useRouter } from 'next/router'

const axios = require('axios');
var faker = require('faker');
import React, { useEffect, useState } from "react"

import { firebaseConfig } from "../../config";
import { initializeApp } from 'firebase/app';
import { signInWithCustomToken, getAuth } from "firebase/auth";

import { 
  getDatabase, ref, onValue, set, push, limitToLast, query
} from "firebase/database";

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

const ROOT_API = "http://localhost:5000"


export async function getServerSideProps(context) {
    return {
      props: {}
    }
}

export default function Chatage() {
  const [token, setToken] = useState();
  const [uid, setUID] = useState()
  const [message, setMessage] = useState([])

  const router = useRouter()
  const { id } = router.query;

  useEffect(async () => {
    const loginRes = await axios.get(`${ROOT_API}/?id=${id}`); // const token = loginRes.data.token;
    setToken(loginRes.data.token)
    
    const userCredential = await signInWithCustomToken(auth, loginRes.data.token)
    setUID(userCredential.user.uid) //  accessToken: userCredential.user.accessToken

    const pathMess = `message/${userCredential.user.uid}`

    const messageRef = ref(database, pathMess, limitToLast(100));
    onValue(messageRef, (snapshot) => {
      const data = snapshot.val()

      const arrMess = []
      for (let item in data) {
        arrMess.push(data[item]['mess'])
      }
      setMessage(arrMess)
    });
  }, [])

  const addValidData = async () => {
    const dataAddMess = { 
      uid: uid,
      mess: faker.name.findName()
    }
    
    const pathMess = `message/${uid}`
    return push(ref(database, pathMess), dataAddMess)
  }

  const addErrData = async () => {
    const dataAddMess = { 
      uid: uid,
      mess: faker.name.findName()
    }
    
    const pathMess = `message/tuannguyen`
    try {
      await push(ref(database, pathMess), dataAddMess)
    } catch (err) {
      alert(String(err))
    }
    
  }

  return (
    <>
      <h1 style={{ display: "block" }}>
        FIREBASE APP
      </h1>
      
      <p>UID: {uid}</p>

      {
        message.map((item, index) => {
          return (
            <>
              <li key={index}>{ item }</li>
            </>
          )
        })
      }

      <br />
      <div>
        <button key={1111111} onClick={() => addValidData()}>
          Add data to {uid}
        </button>

        <button key={2222222} onClick={() => addErrData()}>
          Add data to 403 path
        </button>
      </div>
    </>
  )
}


