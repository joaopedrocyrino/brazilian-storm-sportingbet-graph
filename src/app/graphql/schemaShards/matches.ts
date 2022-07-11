import { gql } from 'apollo-server'

import { MatchServices, BetServices } from '../../../services'

const typeDefs = gql`
type Match {
  id: String!
  champId: String!
  house: String!
  visitor: String!
  start: String!
  winnerBets: [WinnerBet]!
  scoreBets: [ScoreBet]!
  goalsBets: [GoalsBet]!
}

extend type Query {
  matches: [Match]!
}
`

export default {
  resolvers: {
    Query: {
      matches: async () => await MatchServices.getMany()
    },
    Match: {
      winnerBets: async (root: any) => await BetServices.getWinner(root.champId, root.id),
      scoreBets: async (root: any) => await BetServices.getScore(root.champId, root.id),
      goalsBets: async (root: any) => await BetServices.getGoals(root.champId, root.id)
    }
  },
  typeDefs: [typeDefs]
}
