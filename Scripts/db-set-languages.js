const adminCore =  require("firebase-admin");
const languages =  require("./data/languages.json");

const serviceAccount = require("../googleaccount.json");
adminCore.initializeApp({
    credential: adminCore.credential.cert(serviceAccount),
    databaseURL: 'https://mparablas.firebaseio.com'
});
const db = adminCore.firestore();

languages.forEach(function(obj) {
    db.collection("languages").doc(obj.title).set(obj).then(function(docRef) {
        console.log("Document written with ID: ", docRef);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
});