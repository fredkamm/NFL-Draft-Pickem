const typeDefs = `
  type User {
    _id: ID!
    username: String!
    email: String!
    entries: [Entry]
  }

  type Entry {
    _id: ID!
    user: User!
    pickNumber: Int!
    playerName: String!
    playerPosition: String!
    teamName: String!
    score: Int
  }

  type DraftResult {
    _id: ID!
    pickNumber: Int!
    playerName: String!
    playerPosition: String!
    teamName: String!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    entries: [Entry]
    entry(id: ID!): Entry
    draftResults: [DraftResult]
    draftResult(id: ID!): DraftResult
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    addEntry(userId: ID!, pickNumber: Int!, playerName: String!, playerPosition: String!, teamName: String!): Entry
    addDraftResult(pickNumber: Int!, playerName: String!, playerPosition: String!, teamName: String!): DraftResult
    login(email: String!, password: String!): Auth  
  }
`;

module.exports = typeDefs;