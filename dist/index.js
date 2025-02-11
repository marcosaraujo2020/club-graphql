import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import axios from 'axios';
const typeDefs = `#graphql
  
  type Club {
    name: String
    country: String
    uf: String
    year_foundation: Int
  }

  type Player {
    name: String
    age: Int
    shirt_number: Int
    position: String
    clubName: String
  }
  
  type Query {
    clubs: [Club]
    players: [Player]
  }

  type Mutation {
    createClub(name: String!, country: String!, uf: String, year_foundation: Int): Club
    createPlayer(name: String!, age: Int!, shirt_number: Int, position: String!, clubId: String!): Player

    deleteClub(id: String!): String
    deletePlayer(id: String!): String
  }
`;
const clubs = [
    {
        name: 'Flamengo',
        country: 'Brazil',
    },
    {
        name: 'Barcelona',
        country: 'Espanha',
    },
];
// Configurando para utilizar API externa
const resolvers = {
    Query: {
        clubs: async () => {
            try {
                const response = await axios.get('http://localhost:3000/clubs');
                return response.data;
            }
            catch (error) {
                console.error('Erro ao consultar a API externa:', error);
                throw new Error('Não foi possível obter clubs');
            }
        },
        players: async () => {
            try {
                const response = await axios.get('http://localhost:3000/players');
                return response.data;
            }
            catch (error) {
                console.error('Erro ao consultar a API externa:', error);
                throw new Error('Não foi possível obter players');
            }
        },
    },
    Mutation: {
        createClub: async (_, { name, country, uf, year_foundation }) => {
            try {
                const response = await axios.post('http://localhost:3000/clubs', {
                    name,
                    country,
                    uf,
                    year_foundation,
                });
                return response.data;
            }
            catch (error) {
                console.error('Erro ao criar clube:', error);
                throw new Error('Não foi possível criar o clube.');
            }
        },
        createPlayer: async (_, { name, age, shirt_number, position, clubId }) => {
            try {
                const response = await axios.post('http://localhost:3000/players', {
                    name,
                    age,
                    shirt_number,
                    position,
                    clubId,
                });
                return response.data;
            }
            catch (error) {
                console.error('Erro ao criar jogador:', error);
                throw new Error('Não foi possível criar o jogador.');
            }
        },
        deleteClub: async (_, { id }) => {
            try {
                await axios.delete(`http://localhost:3000/clubs/${id}`);
                return `Clube "${id}" deletado com sucesso.`;
            }
            catch (error) {
                console.error('Erro ao deletar clube:', error);
                throw new Error('Não foi possível deletar o clube.');
            }
        },
        deletePlayer: async (_, { id }) => {
            try {
                await axios.delete(`http://localhost:3000/players/${id}`);
                return `Jogador "${id}" deletado com sucesso.`;
            }
            catch (error) {
                console.error('Erro ao deletar jogador:', error);
                throw new Error('Não foi possível deletar o jogador.');
            }
        },
    },
};
const server = new ApolloServer({
    typeDefs,
    resolvers,
});
const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
});
console.log(`🚀  Server ready at: ${url}`);
