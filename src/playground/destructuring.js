// const person = {
//   name: 'Sean',
//   age: 29,
//   location: {
//     city: 'Portland',
//     temp: 62,
//   },
// };

// const { name: firstName = 'Anonymous', age } = person;

// const { city, temp } = person.location;

// console.log(`${firstName} is ${age}.`);

// console.log(`It's ${temp} in ${city}.`);

// const book = {
//   title: 'Ego is the Enemy',
//   author: 'Ryan Holiday',
//   publisher: {
//     name: 'Penguin',
//   },
// };

// const { name: publisherName = 'Self Published' } = book.publisher;

// console.log(publisherName);

// ARRAY DESTRUCTORING

const address = ['1299 S Juniper Street', 'Temecula', 'California', '19148'];

const [, city, state = 'New York'] = address;

console.log(`You are in ${city} ${state}.`);

const item = ['Coffee (Iced)', '$3.00', '$3.50', '$3.75'];

const [coffee, , medium, ,] = item;

console.log(`A medium ${coffee} costs ${medium}.`);
