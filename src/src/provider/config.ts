import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


export const config = {
    firebaseConfig: {
        apiKey: "AIzaSyDPeWCYLNlBjN21bDZ8PQVPetidrF5GVas",
        authDomain: "testes-full-dev.firebaseapp.com",
        projectId: "testes-full-dev",
        storageBucket: "testes-full-dev.appspot.com",
        messagingSenderId: "823886784353",
        appId: "1:823886784353:web:647fa58110ed4c389f4720",
        measurementId: "G-H89052B4G5"
    }
};

export const app = initializeApp(config.firebaseConfig);

export const db = getFirestore(app);

export { getFirestore };
