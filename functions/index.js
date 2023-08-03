const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.visitorCount = functions.https.onRequest(async (request, response) => {
  // Set CORS headers for preflight requests
  // Allows GETs from origin https://cloud-resume-34b6d.web.app with the Content-Type
  // header and caches preflight response for an 1 hour

  response.set('Access-Control-Allow-Origin', 'https://cloud-resume-34b6d.web.app');
  response.set('Access-Control-Allow-Methods', 'GET');

  if (request.method !== "GET") {
    response.status(403).send('Forbidden!');
    return;
  }

  const docRef = admin.firestore().doc("pages/home");
  const doc = await docRef.get();

  if (!doc.exists) {
    await docRef.set({visits: 0});
  }

  await docRef.update("visits", admin.firestore.FieldValue.increment(1));
  const snapshot = await docRef.get();
  response.send({visits: snapshot.data().visits});
});
