import { gql } from "@apollo/client";

// Get user profile
export const QUERY_ME = gql`
  query Me {
    me {
      _id
      username
      email
      entries {
        _id
        pickNumber
        playerName
        playerPosition
        score
      }
    }
  }
`;

// Get all users
export const QUERY_USERS = gql`
  query Users {
    users {
      _id
      username
      email
      entries {
        _id
        pickNumber
        playerName
        playerPosition
        score
      }
    }
  }
`;

// Get a single user
export const QUERY_USER = gql`
  query User($username: String!) {
    user(username: $username) {
      _id
      username
      email
      entries {
        _id
        pickNumber
        playerName
        playerPosition
        score
      }
    }
  }
`;

// Get all entries
export const QUERY_ENTRIES = gql`
  query Entries {
    entries {
      _id
      pickNumber
      playerName
      playerPosition
      score
    }
  }
`;
 
// Get a single entry
export const QUERY_ENTRY = gql`
  query Entry($id: Int!) {
    entry(id: $id) {
      _id
      pickNumber
      playerName
      playerPosition
      score
      user {
        _id
        username
      }
    }
  }
`;

// Get all draft results
export const QUERY_DRAFT_RESULTS = gql`
  query DraftResults {
    draftResults {
      _id
      pickNumber
      playerName
      playerPosition
      teamName
    }
  }
`;

// Get a single draft result by ID
export const QUERY_DRAFT_RESULT = gql`
  query DraftResult($id: Int!) {
    draftResult(id: $id) {
      _id
      pickNumber
      playerName
      playerPosition
      teamName
    }
  }
`;