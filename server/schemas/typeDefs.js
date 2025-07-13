const typeDefs = `
  type User {
    _id: ID!
    username: String!
    email: String!
    entries: [Entry]
  }

  type Pick {
    pickNumber: Int!
    playerName: String!
  }

  input PickInput {
    pickNumber: Int!
    playerName: String!
  }

  type Entry {
    _id: ID!
    user: User!
    year: Int!
    picks: [Pick]
    score: Int
  }

  type DraftPick {
    pickNumber: Int!
    playerName: String!
    playerPosition: String!
    teamName: String!
  }

  type DraftResult {
    _id: ID!
    year: Int!
    picks: [DraftPick]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    entries(year: Int!): [Entry]
    entry(id: ID!): Entry
    draftResults(year: Int!): [DraftResult]
    draftResult(id: ID!): DraftResult
    me: User
  }

  type DraftPickInput {
    pickNumber: Int!
    playerName: String!
    playerPosition: String!
    teamName: String!
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    addEntry(year: Int!, picks: [PickInput]!): Entry
    addDraftResult(year: Int!, picks: [DraftPickInput]!): DraftResult
    scoreEntry(entryId: ID!): Entry
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;