const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const { typeDefs, resolvers } = require('./graphql');
const app = express();
// Middleware geral
app.use(cors());
app.use(bodyParser.json());
// Configura Apollo Server
async function setupApolloServer() {
    const server = new ApolloServer({ typeDefs, resolvers });
    await server.start();
    // Rota para clubs
    app.use('/graphql/clubs', expressMiddleware(server, { context: () => ({}) }));
    // Rota para players
    app.use('/graphql/players', expressMiddleware(server, { context: () => ({}) }));
}
setupApolloServer();
module.exports = app;
