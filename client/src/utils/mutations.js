import { gql } from '@apollo/client';

// Login mutation
export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

// Add user
export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

// Add entry
export const ADD_ENTRY = gql`
  mutation AddEntry($userId: ID!, $pickNumber: Int!, $playerName: String!, $playerPosition: String!, $teamName: String!) {
    addEntry(userId: $userId, pickNumber: $pickNumber, playerName: $playerName, playerPosition: $playerPosition, teamName: $teamName) {
      _id
      pickNumber
      playerName
      playerPosition
      teamName
    }
  }
`;

// Update entry
export const UPDATE_ENTRY = gql`
  mutation UpdateEntry($id: ID!, $pickNumber: Int!, $playerName: String!, $playerPosition: String!, $teamName: String!) {
    updateEntry(id: $id, pickNumber: $pickNumber, playerName: $playerName, playerPosition: $playerPosition, teamName: $teamName) {
      _id
      pickNumber
      playerName
      playerPosition
      teamName
    }
  }
`;

// Delete entry
export const DELETE_ENTRY = gql`
  mutation DeleteEntry($id: ID!) {
    deleteEntry(id: $id) {
      _id
      pickNumber
      playerName
      playerPosition
      teamName
    }
  }
`;

// Add draft result
export const ADD_DRAFT_RESULT = gql`
  mutation AddDraftResult($pickNumber: Int!, $playerName: String!, $playerPosition: String!, $teamName: String!) {
    addDraftResult(pickNumber: $pickNumber, playerName: $playerName, playerPosition: $playerPosition, teamName: $teamName) {
      _id
      pickNumber
      playerName
      playerPosition
      teamName
    }
  }
`;  