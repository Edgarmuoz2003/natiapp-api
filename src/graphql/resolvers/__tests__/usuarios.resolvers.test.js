import { jest } from '@jest/globals';
import Usuario from '../../../database/models/Usuario.js';
import usuariosResolvers from '../usuarios.resolvers.js';
import resolvers from '../resolvers.js';

describe('usuarios.resolvers', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('Query.usuarios', () => {
    it('returns usuarios ordered by created_at desc', async () => {
      const rows = [{ id: '1' }, { id: '2' }];
      const findAllSpy = jest.spyOn(Usuario, 'findAll').mockResolvedValue(rows);

      const result = await usuariosResolvers.Query.usuarios();

      expect(findAllSpy).toHaveBeenCalledWith({ order: [['created_at', 'DESC']] });
      expect(result).toEqual(rows);
    });
  });

  describe('Query.usuario', () => {
    it('returns one usuario by id', async () => {
      const user = { id: 'u-1', email: 'a@a.com' };
      const findByPkSpy = jest.spyOn(Usuario, 'findByPk').mockResolvedValue(user);

      const result = await usuariosResolvers.Query.usuario(null, { id: 'u-1' });

      expect(findByPkSpy).toHaveBeenCalledWith('u-1');
      expect(result).toEqual(user);
    });

    it('returns null when usuario does not exist', async () => {
      jest.spyOn(Usuario, 'findByPk').mockResolvedValue(null);

      const result = await usuariosResolvers.Query.usuario(null, { id: 'missing' });

      expect(result).toBeNull();
    });
  });

  describe('Mutation.createUsuario', () => {
    it('creates and returns usuario', async () => {
      const input = {
        nombre_completo: 'Ana Perez',
        email: 'ana@test.com',
        telefono: '3001234567',
        password_hash: 'hash123',
      };
      const created = { id: 'u-2', ...input };
      const createSpy = jest.spyOn(Usuario, 'create').mockResolvedValue(created);

      const result = await usuariosResolvers.Mutation.createUsuario(null, { input });

      expect(createSpy).toHaveBeenCalledWith(input);
      expect(result).toEqual(created);
    });
  });

  describe('Mutation.updateUsuario', () => {
    it('updates and returns usuario when exists', async () => {
      const updateMock = jest.fn().mockResolvedValue(undefined);
      const existing = { id: 'u-3', update: updateMock };
      jest.spyOn(Usuario, 'findByPk').mockResolvedValue(existing);

      const input = { nombre_completo: 'Nuevo Nombre' };
      const result = await usuariosResolvers.Mutation.updateUsuario(null, { id: 'u-3', input });

      expect(updateMock).toHaveBeenCalledWith(input);
      expect(result).toBe(existing);
    });

    it('throws error when usuario does not exist', async () => {
      jest.spyOn(Usuario, 'findByPk').mockResolvedValue(null);

      await expect(
        usuariosResolvers.Mutation.updateUsuario(null, { id: 'missing', input: { email: 'x@test.com' } })
      ).rejects.toThrow('Usuario no encontrado');
    });
  });

  describe('Mutation.deleteUsuario', () => {
    it('deletes and returns true when usuario exists', async () => {
      const destroyMock = jest.fn().mockResolvedValue(undefined);
      const existing = { id: 'u-4', destroy: destroyMock };
      jest.spyOn(Usuario, 'findByPk').mockResolvedValue(existing);

      const result = await usuariosResolvers.Mutation.deleteUsuario(null, { id: 'u-4' });

      expect(destroyMock).toHaveBeenCalledTimes(1);
      expect(result).toBe(true);
    });

    it('returns false when usuario does not exist', async () => {
      jest.spyOn(Usuario, 'findByPk').mockResolvedValue(null);

      const result = await usuariosResolvers.Mutation.deleteUsuario(null, { id: 'missing' });

      expect(result).toBe(false);
    });
  });
});

describe('resolvers aggregator', () => {
  it('returns health status', () => {
    expect(resolvers.Query.health()).toBe('ok');
  });
});
