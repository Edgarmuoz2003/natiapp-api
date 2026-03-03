import usuariosResolvers from './usuarios.resolvers.js';

const resolvers = {
  Query: {
    health: () => 'ok',
    ...(usuariosResolvers.Query || {}),
  },
  Mutation: {
    ...(usuariosResolvers.Mutation || {}),
  },
};

export default resolvers;
