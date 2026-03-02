import express from "express";
import cors from "cors";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import http from "http";
import sequelize from "./src/database/dbConection.js";
import typeDefs from "./src/graphql/schemas/schemas.js";
import resolvers from "./src/graphql/resolvers/resolvers.js";

const app = express();
const httpServer = http.createServer(app);
const port = process.env.PORT || 3000;
const host = process.env.HOST || "http://localhost";

try {
  await sequelize.authenticate();
  console.log("Database connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", JSON.stringify(error, null, 2));
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();

app.use(
    express.json(),
    cors({
        origin: 'localhost:3000',
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
    }),
    expressMiddleware(server, {
    context: async ({ req }) => ({ token: req.headers.token }),
  }),
);

await new Promise((resolve) =>
  httpServer.listen({ port: 4000 }, resolve),
);
console.log(`🚀 Server ready at ${host}:${port}/graphql`);
