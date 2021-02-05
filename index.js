//imports 
const express = require('express');
const cors = require('cors');

const { graphqlHTTP } = require('express-graphql');
const schema = require("./graphql/graphs");

// App config
const app = express();
app.use(cors()) // enable CORS
app.use("/graphql", graphqlHTTP({ schema: schema, graphiql: true })); // graphql config

// Listern on port 4000
app.listen(4000, () => {
    console.log("GraphQL server running at http://localhost:4000.");
});