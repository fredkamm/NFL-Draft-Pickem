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
    entries: async () => {
      return Entry.find().populate("user");
    },
    entry: async (_, { id }) => {
      return Entry.findById(id).populate("user");
    },
    draftResults: async () => {
      return DraftResult.find();
    },
    draftResult: async (_, { id }) => {
      return DraftResult.findById(id);
    },
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id });
        return userData;
      }
      return null;
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
    addEntry: async (
      _,
      { userId, pickNumber, playerName, playerPosition, teamName }
    ) => {
      const entry = new Entry({
        user: userId,
        pickNumber,
        playerName,
        playerPosition,
        teamName,
      });
      return entry.save();
    },
    addDraftResult: async (
      _,
      { pickNumber, playerName, playerPosition, teamName }
    ) => {
      const draftResult = new DraftResult({
        pickNumber,
        playerName,
        playerPosition,
        teamName,
      });
      return draftResult.save();
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
