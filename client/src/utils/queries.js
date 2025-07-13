import { gql } from "@apollo/client";

export const GET_ME = gql`
  query Me {
    me {
      _id
      username
      email
      entries {
        _id
        year
        picks {
          pickNumber
          playerName
        }
        score
      }
    }
  }
`;

export const QUERY_USERS = gql`
  query Users {
    users {
      _id
      username
      email
      entries {
        _id
        year
        picks {
          pickNumber
          playerName
        }
        score
      }
    }
  }
`;

export const QUERY_USER = gql`
  query User($username: String!) {
    user(username: $username) {
      _id
      username
      email
      entries {
        _id
        year
        picks {
          pickNumber
          playerName
        }
        score
      }
    }
  }
`;

export const QUERY_ENTRIES = gql`
  query Entries($year: Int!) {
    entries(year: $year) {
      _id
      year
      picks {
        pickNumber
        playerName
      }
      score
    }
  }
`;

export const QUERY_ENTRY = gql`
  query Entry($id: ID!) {
    entry(id: $id) {
      _id
      year
      picks {
        pickNumber
        playerName
      }
      score
      user {
        _id
        username
      }
    }
  }
`;

export const QUERY_DRAFT_RESULTS = gql`
  query DraftResults($year: Int!) {
    draftResults(year: $year) {
      _id
      pickNumber
      playerName
      playerPosition
      teamName
    }
  }
`;

export const QUERY_DRAFT_RESULT = gql`
  query DraftResult($id: ID!) {
    draftResult(id: $id) {
      _id
      pickNumber
      playerName
      playerPosition
      teamName
    }
  }
`;