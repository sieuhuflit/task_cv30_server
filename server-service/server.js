import express from 'express';
import { createServer } from 'http';
import { ApolloServer, gql } from 'apollo-server-express';
import typeDefs from './data/schema';
import resolvers from './data/resolvers';

const PORT = process.env.PORT || 3000;
const app = express();

const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app });
const httpServer = createServer(app);
httpServer.listen(PORT, () => {
  console.log(
    `🚀 Server running at http://localhost:${PORT}${server.graphqlPath}`
  );
});
