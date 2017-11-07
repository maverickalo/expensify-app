import * as firebase from 'firebase';

const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
};

firebase.initializeApp(config);

const database = firebase.database();

export { firebase, database as default };

// database.ref('expenses').on('child_removed', snapshot => {
//   console.log(snapshot.key, snapshot.val());
// });

// database.ref('expenses').on('child_changed', snapshot => {
//   console.log(snapshot.key, snapshot.val());
// });

// database
//   .ref('expenses')
//   .once('value')
//   .then(snapshot => {
//     const expenses = [];
//     snapshot.forEach(childSnapshot => {
//       expenses.push({
//         id: childSnapshot.key,
//         ...childSnapshot.val(),
//       });
//     });
//     console.log(expenses);
//   });
// database.ref('expenses').on('value', snapshot => {
//   const expenses = [];
//   snapshot.forEach(childSnapshot => {
//     expenses.push({
//       id: childSnapshot.key,
//       ...childSnapshot.val(),
//     });
//   });
//   console.log(expenses);
// });

// database.ref('expenses').push({
//   description: 'Test',
//   note: 'Testing',
//   amount: 234.43,
//   createdAt: 'Yesterday',
// });

// database.ref('notes').push({
//   title: 'Course Topicss',
//   body: 'Blah Blah Blah',
//   fuck: 'hello',
// });

// database.ref().on('value', snapshot => {
//   const val = snapshot.val();
//   console.log(`${val.name} is a ${val.job.title} at ${val.job.company}`);
// });

// database
//   .ref('location/city')
//   .once('value')
//   .then(snapshot => {
//     const val = snapshot.val();
//     console.log(val);
//   })
//   .catch(e => {
//     console.log('Error Fetching Data', e);
//   });

// database
//   .ref()
//   .set({
//     name: 'Sean Vernon',
//     age: 26,
//     stressLevel: 6,
//     job: { title: 'Software Developer', company: 'Google' },
//     location: {
//       city: 'Philly',
//       country: 'United States',
//     },
//   })
//   .then(() => {
//     console.log('Data is Saved!');
//   })
//   .catch(e => {
//     console.log('This failed!.', e);
//   });

// database.ref().update({
//   stressLevel: '9',
//   'location/city': 'Seattle',
//   'job/company': 'Amazon',
// });

// database
//   .ref('isSingle')
//   .remove()
//   .then(() => {
//     console.log('Data Was Removed');
//   })
//   .catch(e => {
//     console.log('Data Not Removed! Error: ', e);
//   });
