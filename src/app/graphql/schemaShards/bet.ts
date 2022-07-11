import { gql } from 'apollo-server'

import { BetServices } from '../../../services'

const typeDefs = gql`
type WinnerBet {
  id: String!
  champId: String!
  matchId: String!
  better: String!
  value: String!
  house: Boolean!
}

type ScoreBet {
  id: String!
  champId: String!
  matchId: String!
  better: String!
  value: String!
  house: Int!
  visitor: Int!
}

type GoalsBet {
  id: String!
  champId: String!
  matchId: String!
  better: String!
  value: String!
  house: Boolean!
  goals: Int!
}

input FindBet {
  champId: String!
  matchId: String!
}

type Bets {
  winner: [WinnerBet]!
  score: [ScoreBet]!
  goals: [GoalsBet]!
}

extend type Query {
  bets(better: String!): Bets!
  winner (input: FindBet): [WinnerBet]!
  score (input: FindBet): [ScoreBet]!
  goals (input: FindBet): [GoalsBet]!
}
`

export default {
  resolvers: {
    Query: {
      bets: async (root: any, { better }: { better: string }) => await BetServices.getMany(better),
      winner: async (
        root: any,
        { champId, matchId }: { champId: string, matchId: string }
      ) => await BetServices.getWinner(champId, matchId),
      score: async (
        root: any,
        { champId, matchId }: { champId: string, matchId: string }
      ) => await BetServices.getScore(champId, matchId),
      goals: async (
        root: any,
        { champId, matchId }: { champId: string, matchId: string }
      ) => await BetServices.getGoals(champId, matchId)
    }
  },
  typeDefs: [typeDefs]
}
