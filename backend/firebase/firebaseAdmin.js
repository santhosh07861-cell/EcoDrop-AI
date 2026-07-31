const admin = require('firebase-admin');
const dbStore = require('../config/db');

let firestoreDb = null;
let isFirebaseConnected = false;

try {
  if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
    firestoreDb = admin.firestore();
    isFirebaseConnected = true;
    console.log('✅ Firebase Admin SDK Initialized Successfully');
  } else {
    console.log('ℹ️ Firebase credentials not set. Operating in high-performance local persistent store mode.');
  }
} catch (error) {
  console.warn('⚠️ Firebase Admin initialization deferred:', error.message);
}

module.exports = {
  admin,
  firestoreDb,
  isFirebaseConnected,
  dbStore
};
