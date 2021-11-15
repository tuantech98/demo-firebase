import Link from 'next/link';
import { useRouter } from 'next/router'

const axios = require('axios');
var faker = require('faker');
import React, { useEffect, useState } from "react"

import { firebaseConfig } from "../config";
import { initializeApp } from 'firebase/app';
import { signInWithCustomToken, getAuth } from "firebase/auth";

import { 
  getDatabase, ref, onValue, set, push, limitToLast, query
} from "firebase/database";

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);



export default function IndexPage() {
  return (
    <>
      <h1 style={{ display: "block" }}>
        FIREBASE APP
      </h1>
    </>
  )
}


