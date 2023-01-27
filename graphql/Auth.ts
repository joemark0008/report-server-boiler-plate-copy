import { gql } from "@apollo/client";


export const SIGN_IN = gql`
  mutation SignIn($signInInput: SignInInput!) {
    signin(signInInput: $signInInput) {
      accessToken
      user {
        id
        role
        username
      }
    }
  }
`;

export const GET_ACCOUNT = gql`
  query getAccount {
    user: meQuery {
      id
      username
      email
      role
      updatedAt
      createdAt
      employee {
        id
        firstName
        lastName
        middleName
        clinicId
      }
    }
  }
`;