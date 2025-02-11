const app = require('./app');
const config = require('./config');
const PORT = config.PORT || 4000;
app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}/graphql/clubs`);
    console.log(`🚀 Server ready at http://localhost:${PORT}/graphql/players`);
});
