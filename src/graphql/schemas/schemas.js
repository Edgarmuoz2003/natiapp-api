import { gql } from 'graphql-tag'

const typeDefs = gql`
 type Query {
    health: String!
  }

`

export default typeDefs;