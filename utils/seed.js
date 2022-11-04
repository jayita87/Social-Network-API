const connection = require('../config/connection');
const { Thought, User } = require('../models');
const { getRandomUserName,  getRandomThoughts, getRandomEmail } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  // Delete existing thoughts
  await Thought.deleteMany({});

  // Delete existing users
  await User.deleteMany({});

  // Create empty array to hold the users
  const users = [];

  // Loop 5 times -- add users to the users array
  for (let i = 0; i < 5; i++) {
    // Get some random thought objects using a helper function that was imported from ./data
    const thoughts = getRandomThoughts(5);

    const userName = getRandomUserName();
    const email = getRandomEmail();

    users.push({
        userName,
        email,
        thoughts,
    });
  }

  // Add users to the collection and await the results
  await User.collection.insertMany(users);

  // Add thoughts to the collection and await the results
  await Thought.collection.insertOne({
    thoughtText: [...thoughts],
    username: [...user.userName],
  });

  // Log out the seed data to indicate what should appear in the database
  console.table(users);
  console.info('The data has been seeded');
  process.exit(0);
});