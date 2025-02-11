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
  
  type Query {
    clubs: [Club]
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
/* const resolvers = {
    Query: {
        clubs: () => clubs,
    },
}; */
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
