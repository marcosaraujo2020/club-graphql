import express from "express";
import { ApolloServer, gql } from "apollo-server-express";
import axios from "axios";
const PORT = 4000;
const API_URL = "http://localhost:3000";
// Definição do esquema GraphQL
const typeDefs = gql `
  type Club {
    id: ID!
    name: String!
  }

  type Player {
    id: ID!
    name: String!
    clubId: ID!
  }

  type Query {
    clubs: [Club]
    players: [Player]
  }

  type Mutation {
    addClub(name: String!): Club
    deleteClub(id: ID!): Boolean
    addPlayer(name: String!, clubId: ID!): Player
    deletePlayer(id: ID!): Boolean
  }
`;
// Resolvers
const resolvers = {
    Query: {
        clubs: async () => {
            const response = await axios.get(`${API_URL}/clubs`);
            return response.data;
        },
        players: async () => {
            const response = await axios.get(`${API_URL}/players`);
            return response.data;
        },
    },
    Mutation: {
        addClub: async (_, { name }) => {
            const response = await axios.post(`${API_URL}/clubs`, { name });
            return response.data;
        },
        deleteClub: async (_, { id }) => {
            await axios.delete(`${API_URL}/clubs/${id}`);
            return true;
        },
        addPlayer: async (_, { name, clubId }) => {
            const response = await axios.post(`${API_URL}/players`, { name, clubId });
            return response.data;
        },
        deletePlayer: async (_, { id }) => {
            await axios.delete(`${API_URL}/players/${id}`);
            return true;
        },
    },
};
// Configuração do servidor Apollo
async function startServer() {
    const app = express();
    const server = new ApolloServer({ typeDefs, resolvers });
    await server.start();
    server.applyMiddleware({ app });
    app.listen(PORT, () => {
        console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
    });
}
startServer().catch((err) => {
    console.error("Failed to start server:", err);
});
