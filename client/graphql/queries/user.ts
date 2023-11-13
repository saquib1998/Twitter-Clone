import { graphql } from "../../gql";

export const verifyUserGoogleTokenQuery = graphql(`#graphql
    query VerifyUserGoogleToken($token: String!) {
        verifyGoogleToken(token: $token)
    }
`)

export const getCurrentUserQuery = graphql(`#graphql
    query GetCurrentUser{
        getCurrentUser {
            id
            profileImageUrl
            email
            firstName
            lastName
            tweets {
                id
                content
                author {
                    firstName
                    lastName
                    profileImageUrl
                }
            }
        }
    }
`)

export const getUserByIdQuery = graphql(`#graphql
    query GetUserById($id: ID!) {
        getUserById(id: $id) {
            id
            profileImageUrl
            email
            firstName
            lastName
            tweets {
                id
                content
                imageURL
                author {
                    firstName
                    lastName
                    profileImageUrl
                }
            }
        }
    
    }
`)