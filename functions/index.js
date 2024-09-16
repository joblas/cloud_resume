import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

export const visitorCount = functions.https.onRequest(async (request, response) => {
  // Get the origin of the request
  const origin = request.get("origin");

  // Array of valid origins
  const validOrigins = ["https://cloud-resume-34b6d.web.app", "https://cloudyjoe.com"];

  // If the origin of the request is in our array of valid origins
  if (validOrigins.includes(origin)) {
    // Set the "Access-Control-Allow-Origin" header to the origin of the request
    response.set({"Access-Control-Allow-Origin": origin});
  }

  response.set("Access-Control-Allow-Methods", "GET");

  if (request.method !== "GET") {
    response.status(403).send("Forbidden!");
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
