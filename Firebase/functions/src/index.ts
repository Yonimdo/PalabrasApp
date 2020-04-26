import * as functions from 'firebase-functions';
import * as adminCore from 'firebase-admin';
import { MdFirebaseServer } from './express/server';

const serviceAccount = require("../../../googleaccount.json");
adminCore.initializeApp({
    credential: adminCore.credential.cert(serviceAccount),
    databaseURL: 'https://mparablas.firebaseio.com'
});
const db = adminCore.firestore();



const app = new MdFirebaseServer(db);
export const api = functions.https.onRequest(app.get());
