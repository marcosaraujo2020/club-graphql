const playersResolvers = {
    Query: {
        players: () => [
            { id: 1, name: 'Lionel Messi', position: 'Forward', club: 'Inter Miami' },
            { id: 2, name: 'Cristiano Ronaldo', position: 'Forward', club: 'Al-Nassr' },
        ],
    },
};
module.exports = playersResolvers;
