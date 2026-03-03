import { gql } from 'graphql-tag';
import usuariosTypeDefs from './usuarios.schemas.js';

const baseTypeDefs = gql`
  type Query {
    health: String!
  }

  type Mutation {
    _empty: String
  }
`;

const typeDefs = [baseTypeDefs, usuariosTypeDefs];

export default typeDefs;
