const { ApolloServer, gql } = require('apollo-server-express')
const { schema } = require('./schema')
const server = new ApolloServer({
  // These will be defined for both new or existing servers
  schema
})
module.exports = server
