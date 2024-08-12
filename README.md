# cloud_resume
https://cloudyjoe.com/

This repository contains HTML, CSS, and JavaScript files for a cloud resume website using Firebase and Google Cloud Build. The JavaScript implements a counter function to track number of visitors.

The Cloud Resume Challenge is a project where you build a simple resume website and host it on AWS. However, it can also be implemented using Google Cloud and Firebase. Here's a general step-by-step guide to doing the Cloud Resume Challenge with Firebase and Google Cloud:

**1. Create a Static HTML Resume**

You'll start by creating a simple HTML and CSS file to serve as your resume. You can use any tool you're comfortable with to create it. You can include your name, skills, projects, and any other information you think is relevant.

**2. Deploy the Static HTML Resume to Firebase Hosting**

Firebase Hosting provides fast and secure hosting for your web app. Here's how to deploy your static HTML resume:

- Install Node.js and npm on your machine.
- Install Firebase CLI by running `npm install -g firebase-tools`.
- Sign into Firebase using your Google account by running `firebase login`.
- Initialize your project by running `firebase init`.
- During initialization, choose to set up "Hosting", then select "Create a new project", and provide your project details.
- When asked for your public directory, type "public".
- When asked to configure as a single-page app, reply with "no".
- Replace the automatically generated `public/index.html` file with your resume HTML file.
- Deploy your website by running `firebase deploy`.

Your resume should now be live at your Firebase app URL (something like `https://your-app-id.firebaseapp.com`).

**3. Create a Visitor Counter with Firestore and Cloud Functions**

To count the number of visitors to your site, you can use Firestore (a NoSQL document database for mobile and web app development) to store the count and Cloud Functions to increment it.

- Initialize Firestore in the Firebase Console.
- Install the Firebase Functions SDK with `npm install firebase-functions@latest firebase-admin@latest --save`
- Initialize Firebase Functions by running `firebase init functions`.
- Write a Firebase Function that increments a counter in your Firestore database each time it's called, and returns the current count. This function might look something like this:

```jsx
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.visitorCount = functions.https.onRequest(async (request, response) => {
  const docRef = admin.firestore().doc('pages/home');
  await docRef.update('visits', admin.firestore.FieldValue.increment(1));
  const snapshot = await docRef.get();
  response.send({visits: snapshot.data().visits});
});

```

- Deploy your function by running `firebase deploy --only functions`.

**4. Connect your Front-End to your Firebase Function**

In your HTML file, you'll need to make a fetch request to your Firebase Function's URL (something like `https://us-central1-your-app-id.cloudfunctions.net/visitorCount`). You'll then display the count that's returned by this function somewhere on your page. This might look something like:

```jsx
fetch('<https://us-central1-your-app-id.cloudfunctions.net/visitorCount>')
  .then(response => response.json())
  .then(data => {
    document.getElementById('visit-count').innerText = 'Visits: ' + data.visits;
  });

```

**5. Setup Continuous Deployment with Google Cloud Build**

Google Cloud Build allows you to automate your deployment so that each time you push to your Git repository, your site gets automatically redeployed.

- Connect your GitHub repository to Google Cloud Build.
- Configure the build trigger to redeploy your site on each push to the main branch.
- Create a `cloudbuild.yaml` file in your project's root directory. This file might look something like this:

```yaml
steps:
- name: 'gcr.io/cloud-builders/npm'
  args: ['install']
- name: 'gcr.io/$PROJECT_ID/firebase'
  args: ['deploy', '--project', '$PROJECT_ID', '--token', '${_FIREBASE_TOKEN}']

```

- In Google Cloud Console, create a new service account with the "Firebase Admin" role.
- Generate a new private key for the service account and download it.
- Use the private key to log in to Firebase CLI and obtain a CI token by running `firebase login:ci`.
- Add this token as a secret named `_FIREBASE_TOKEN` to your Google Cloud Build trigger.

Now, every time you push to your repository, Google Cloud Build will redeploy your site.
