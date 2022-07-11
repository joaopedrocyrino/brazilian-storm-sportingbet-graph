// import { UserInputError } from 'apollo-server'

import Services from '../Services'
import { BetQuery } from '../../data/query'
import { WinnerBet, ScoreBet, GoalsBet } from '../../entities'
import { getBetsValidator, getManyValidator } from './validators'

class BetServices extends Services {
  async getWinner (champId: string, matchId: string): Promise<WinnerBet[]> {
    await this.gateway({
      req: { champId, matchId },
      schema: getBetsValidator
    })

    const winner = await BetQuery.getWinner(champId, matchId)

    return winner
  }

  async getScore (champId: string, matchId: string): Promise<ScoreBet[]> {
    await this.gateway({
      req: { champId, matchId },
      schema: getBetsValidator
    })

    const score = await BetQuery.getScore(champId, matchId)

    return score
  }

  async getGoals (champId: string, matchId: string): Promise<GoalsBet[]> {
    await this.gateway({
      req: { champId, matchId },
      schema: getBetsValidator
    })

    const goals = await BetQuery.getGoals(champId, matchId)

    return goals
  }

  async getMany (better: string): Promise<{
    winner: WinnerBet[]
    score: ScoreBet[]
    goals: GoalsBet[]
  }> {
    await this.gateway({
      req: { better },
      schema: getManyValidator
    })

    const bets = await BetQuery.getMany(better)

    return bets
  }
};

export default new BetServices()
