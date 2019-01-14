const root = require('./root.graphqls')
const test = require('./test.graphqls')
const proposed = require('./proposed.graphqls')
const typeDefs = [root, proposed]
module.exports = typeDefs
