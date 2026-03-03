import Usuario from '../../database/models/Usuario.js';

const usuariosResolvers = {
  Query: {
    usuarios: async () => {
      return Usuario.findAll({ order: [['created_at', 'DESC']] });
    },
    usuario: async (_, { id }) => {
      return Usuario.findByPk(id);
    },
  },
  Mutation: {
    createUsuario: async (_, { input }) => {
      return Usuario.create(input);
    },
    updateUsuario: async (_, { id, input }) => {
      const usuario = await Usuario.findByPk(id);

      if (!usuario) {
        throw new Error('Usuario no encontrado');
      }

      await usuario.update(input);
      return usuario;
    },
    deleteUsuario: async (_, { id }) => {
      const usuario = await Usuario.findByPk(id);

      if (!usuario) {
        return false;
      }

      await usuario.destroy();
      return true;
    },
  },
};

export default usuariosResolvers;
