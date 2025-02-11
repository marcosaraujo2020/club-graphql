const { gql } = require('graphql-tag');
const playersTypeDefs = gql `
  type Player {
    id: ID
    name: String
    position: String
    club: String
  }

  type Query {
    players: [Player]
  }
`;
module.exports = playersTypeDefs;
