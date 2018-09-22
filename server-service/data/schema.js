import { gql } from 'apollo-server-express';
const typeDefs = gql`
  type User {
    id: Int!
    firstName: String!
    lastName: String!
    email: String!
    password: String!
  }

  type Query {
    me: User
  }

  type Mutation {
    register(
      firstName: String!
      lastName: String!
      email: String!
      password: String!
    ): User
    login(email: String!, password: String!): String
  }
`;

export default typeDefs;
