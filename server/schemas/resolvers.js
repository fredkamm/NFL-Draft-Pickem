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
    me: async (_, args, context) => {
      if (context.user) {
        return User.findOne({_id: context.user._id}).populate("entries");
      }
      throw new AuthenticationError("You need to be logged in!");
    }
  },

  Mutation: {
    addUser: async (_, { username, email, password }) => {
      const user = new User({ username, email, password });
      return user.save();
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
