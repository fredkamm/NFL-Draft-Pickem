import { gql } from '@apollo/client';

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

export const ADD_DRAFT_RESULT = gql`
  mutation addDraftResult($year: Int!, $picks: [DraftPickInput]!) {
    addDraftResult(year: $year, picks: $picks) {
      _id
      year
      picks {
        pickNumber
        playerName
        playerPosition
        teamName
      }
    }
  }
`;

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

export const ADD_ENTRY = gql`
  mutation addEntry($year: Int!, $picks: [PickInput]!) {
    addEntry(year: $year, picks: $picks) {
      _id
      year
      picks {
        pickNumber
        playerName
      }
    }
  }
`;  