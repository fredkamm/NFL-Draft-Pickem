const { User, Entry, DraftResult } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate("entries");
    },
    user: async (_, { username }) => {
      return User.findOne({ username }).populate("entries");
    },
    entries: async (parent, { year }) => {
      return Entry.find({ year }).populate("user");
    },
    entry: async (_, { id }) => {
      return Entry.findById(id).populate("user");
    },
    draftResults: async (parent, { year }) => {
      return DraftResult.find({ year });
    },
    draftResult: async (_, { id }) => {
      return DraftResult.findById(id);
    },
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id }).populate('entries');
        return userData;
      }
      throw new AuthenticationError('Not logged in');
    },
  },

  Mutation: {
    addUser: async (_, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }
      const token = signToken(user);
      return { token, user };
    },
    addEntry: async (_, { year, picks }, context) => {
      if (context.user) {
        const entry = await Entry.create({
          user: context.user._id,
          year,
          picks,
        });
        await User.findByIdAndUpdate(context.user._id, {
          $push: { entries: entry._id },
        });
        return entry;
      }
      throw new AuthenticationError('Not logged in');
    },
    addDraftResult: async (_, { year, picks }) => {
      const draftResult = await DraftResult.create({
        year,
        picks,
      });
      return draftResult;
    },
    scoreEntry: async (_, { entryId }) => {
      const entry = await Entry.findById(entryId);
      const draftResult = await DraftResult.findOne({ year: entry.year });

      let score = 0;
      for (const pick of entry.picks) {
        const correctPick = draftResult.picks.find(
          (draftPick) => draftPick.pickNumber === pick.pickNumber && draftPick.playerName === pick.playerName
        );
        if (correctPick) {
          score++;
        }
      }

      entry.score = score;
      return entry.save();
    },
  },

  User: {
    entries: async (user) => {
      return Entry.find({ user: user._id });
    },
  },

  Entry: {
    user: async (entry) => {
      return User.findById(entry.user);
    },
  },
};

module.exports = resolvers;
