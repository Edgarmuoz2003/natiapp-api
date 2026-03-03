import { gql } from 'graphql-tag';

const usuariosTypeDefs = gql`
  type Usuario {
    id: ID!
    nombre_completo: String!
    email: String!
    telefono: String
    password_hash: String!
    created_at: String!
    updated_at: String!
  }

  input CreateUsuarioInput {
    nombre_completo: String!
    email: String!
    telefono: String
    password_hash: String!
  }

  input UpdateUsuarioInput {
    nombre_completo: String
    email: String
    telefono: String
    password_hash: String
  }

  extend type Query {
    usuarios: [Usuario!]!
    usuario(id: ID!): Usuario
  }

  extend type Mutation {
    createUsuario(input: CreateUsuarioInput!): Usuario!
    updateUsuario(id: ID!, input: UpdateUsuarioInput!): Usuario!
    deleteUsuario(id: ID!): Boolean!
  }
`;

export default usuariosTypeDefs;
