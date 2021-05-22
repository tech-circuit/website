import firebase from 'firebase'

var firebaseConfig = {
    apiKey: "AIzaSyC-6lK2k54sAuRlTSQM-LZ7lEVqJ33SQxA",
    authDomain: "techcircuit.firebaseapp.com",
    projectId: "techcircuit",
    storageBucket: "techcircuit.appspot.com",
    messagingSenderId: "884360040700",
    appId: "1:884360040700:web:d814d2db4b16bc9f9d4779"
};

firebase.initializeApp(firebaseConfig);

export default firebase;