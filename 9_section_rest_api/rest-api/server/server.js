const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./utils/database");
const app = express();

const {graphqlHTTP} = require("express-graphql");
const schema = require("./graphql/schema");
const resolver = require("./graphql/resolver");

app.use(bodyParser.json());

app.use(express.static(__dirname + "/dist/"));
app.use(graphqlHTTP({
  schema,
  rootValue: resolver,
  graphiql: true
}));


async function start() {
  try {
    await sequelize.sync();
    app.listen(process.env.PORT || 8080, () =>
      console.log(`listening on http://localhost:${process.env.PORT || 8080}`)
    );
  } catch (error) {
    console.log("Connect error in DB - ", error);
  }
}

start();
