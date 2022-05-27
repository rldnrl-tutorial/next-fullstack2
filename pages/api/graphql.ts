import { ApolloServer } from 'apollo-server-micro'
import Cors from 'micro-cors'

import { createContext } from '@/libs/graphql/context'
import { typeDefs, schema } from '@/libs/graphql/schema'
import { resolvers } from '@/libs/graphql/resolvers'

const cors = Cors()

const apolloServer = new ApolloServer({
  schema,
  typeDefs,
  resolvers,
  context: createContext,
})

const startServer = apolloServer.start()

export default cors(async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.end()
    return false
  }
  await startServer

  await apolloServer.createHandler({
    path: '/api/graphql',
  })(req, res)
})

export const config = {
  api: {
    bodyParser: false,
  },
}