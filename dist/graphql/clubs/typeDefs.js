const { gql } = require('graphql-tag');
const clubsTypeDefs = gql `
  type Club {
    id: ID
    name: String
    country: String
  }

  type Query {
    clubs: [Club]
  }
`;
module.exports = clubsTypeDefs;
