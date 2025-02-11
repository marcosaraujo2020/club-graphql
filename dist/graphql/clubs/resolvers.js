const clubsResolvers = {
    Query: {
        clubs: () => [
            { id: 1, name: 'FC Barcelona', country: 'Spain' },
            { id: 2, name: 'Manchester United', country: 'England' },
        ],
    },
};
module.exports = clubsResolvers;
