import { gql } from 'apollo-server'

import { ChampionshipServices, MatchServices } from '../../../services'

const typeDefs = gql`
type Championships {
  id: String!
  name: String!
  season: Int!
  country: String!
  matches: [Match]!
}


extend type Query {
  champs: [Championships]!
}
`

export default {
  resolvers: {
    Query: {
      champs: async () => await ChampionshipServices.getMany()
    },
    Championships: {
      matches: async (root: any) => await MatchServices.getMany(root.id)
    }
  },
  typeDefs: [typeDefs]
}
