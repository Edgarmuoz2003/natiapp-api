import sequelize from '../dbConection.js';
import Usuario from './Usuario.js';

const db = {
  sequelize,
  Usuario,
};

export default db;
