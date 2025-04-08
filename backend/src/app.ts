import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import typeDefs from './schema/typeDefs';
import resolvers from './resolvers';
import jwt from 'jsonwebtoken';

dotenv.config();
connectDB();

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return {};
    try {
      const user = jwt.verify(token, process.env.JWT_SECRET!);
      return { user };
    } catch {
      return {};
    }
  },
});

async function startServer() {
await server.start();
server.applyMiddleware({ app: app as express.Application, path: '/graphql' });
}

startServer();

export default app;
