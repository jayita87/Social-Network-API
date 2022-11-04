const userNameList = [
  'Grace109',
  'Alex007',
  'Mark123',
  'Ziya456',
  'Ziyaan789',
  'Zohaib911',
  'Aaran420',
  'Smith566',
  'Aaren888',
  'Aarez900',
  'Aarman100',
  'Aaron200'
];
const emails = [
    'Grace109@gmail.com',
    'Alex007@yahoo.com',
    'Mark123@hotmail.com',
    'Ziya456@yahoo.com',
    'Ziyaan789@gamil.com',
    'Zohaib911@yahoo.com',
    'Aaran420@yahoo.com',
    'Smith566@hotmail.com',
    'Aaren888@gmail.com',
    'Aarez900@hotmail.com',
    'Aarman100@yahoo.com',
    'Aaron200@gmail.com' 
];
const thoughtList = [
'What is your name?',
'Do you like to travel?',
'Everybody is diffferent.',
'Do you like icecream?'
];

// Get a random item given an array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];
  
// Gets a random username
const getRandomUserName = () =>
  `${getRandomArrItem(userNameList)}`;

//gets a random email
const getRandomEmail = () => getRandomArrItem(emails);

// Function to generate random thoughts that we can add to user object.
const getRandomThoughts = (int) => {
  const results = [];
  for (let i = 0; i < int; i++) {
    results.push({
      thoughtName: getRandomArrItem(thoughtList),
      score: Math.floor(Math.random() * (99 - 70 + 1) + 70),
    });
  }
  return results;
};

// Export the functions for use in seed.js
module.exports = { getRandomUserName, getRandomThoughts,
getRandomEmail 
};