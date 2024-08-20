const db = require('../config/connection');
const { User, Entry, DraftResult } = require('../models');
const userSeeds = require('./userSeeds.json');
const draftResultSeeds = require('./draftResultSeeds.json');

db.once('open', async () => {
  try {
    // Clear existing data
    await Entry.deleteMany({});
    await User.deleteMany({});
    await DraftResult.deleteMany({});

    // Insert draft results
    await DraftResult.create(draftResultSeeds);

    // Insert users and entries
    for (const userSeed of userSeeds) {
      const { entries, ...userData } = userSeed;

      // Create the user
      const user = await User.create(userData);

      // Create entries and link them to the user
      const entryDocs = await Entry.create(
        entries.map(entry => ({
          ...entry,
          user: user._id
        }))
      );

      // Update user with the created entries
      await User.findByIdAndUpdate(user._id, {
        $addToSet: {
          entries: { $each: entryDocs.map(entry => entry._id) }
        }
      });
    }

    console.log('all done!');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
});
