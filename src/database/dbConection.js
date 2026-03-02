import { Sequelize } from "sequelize";

const activateLogs = process.env.DB_LOGGING === "true"

const host = process.env.DB_HOST
const username = process.env.DB_USERNAME
const password = process.env.DB_PASSWORD
const database = process.env.DB_NAME
const port = process.env.DB_PORT

const sequelize = new Sequelize({
    dialect: 'postgres',
    host: host,
    username: username,
    password: password,
    database: database,
    port: port,
    logging: activateLogs ? console.log : false
})

export default sequelize;