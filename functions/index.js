const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.visitorCount = functions.https.onRequest(async (request, response) => {
  const docRef = admin.firestore().doc("pages/home");
  const doc = await docRef.get();

  if (!doc.exists) {
    await docRef.set({visits: 0});
  }

  await docRef.update("visits", admin.firestore.FieldValue.increment(1));
  const snapshot = await docRef.get();
  response.send({visits: snapshot.data().visits});
});
