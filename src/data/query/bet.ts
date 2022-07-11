import Database from '..'
import { WinnerBet, GoalsBet, ScoreBet } from '../../entities'

class BetQuery {
  async getMany (better: string): Promise<{
    winner: WinnerBet[]
    score: ScoreBet[]
    goals: GoalsBet[]
  }> {
    const res: {
      winner: WinnerBet[]
      score: ScoreBet[]
      goals: GoalsBet[]
    } = { winner: [], score: [], goals: [] }

    await Promise.all(['winner', 'score', 'goals'].map(async (key, index) => {
      let BetType: typeof WinnerBet | typeof ScoreBet | typeof GoalsBet

      if (index === 0) {
        BetType = WinnerBet
      } else if (index === 1) {
        BetType = ScoreBet
      } else { BetType = GoalsBet }

      const bets = await Database.query(`SELECT * FROM ${key}_bet WHERE better = '${better}'`)

      res[key] = bets.map(({ champ_id, match_id, ...b }: any) => new BetType({
        champId: champ_id,
        matchId: match_id,
        ...b
      }))
    }))

    return res
  }

  async getWinner (champId: string, matchId: string): Promise<WinnerBet[]> {
    const bets = await Database.query<winnerBet>(`SELECT * FROM winner_bet WHERE champ_id = '${champId}' AND match_id = '${matchId}'`)

    return bets.map(({ champ_id, match_id, ...b }: any) => new WinnerBet({
      champId: champ_id,
      matchId: match_id,
      ...b
    }))
  }

  async getScore (champId: string, matchId: string): Promise<ScoreBet[]> {
    const bets = await Database.query<scoreBet>(`SELECT * FROM score_bet WHERE champ_id = '${champId}' AND match_id = '${matchId}'`)

    return bets.map(({ champ_id, match_id, ...b }: any) => new ScoreBet({
      champId: champ_id,
      matchId: match_id,
      ...b
    }))
  }

  async getGoals (champId: string, matchId: string): Promise<GoalsBet[]> {
    const bets = await Database.query<goalsBet>(`SELECT * FROM goals_bet WHERE champ_id = '${champId}' AND match_id = '${matchId}'`)

    return bets.map(({ champ_id, match_id, ...b }: any) => new GoalsBet({
      champId: champ_id,
      matchId: match_id,
      ...b
    }))
  }
}

export default new BetQuery()

interface bet {
  id: string
  champ_id: string
  match_id: string
  better: string
  value: string
}

interface winnerBet extends bet {
  house: boolean
}

interface scoreBet extends bet {
  house: number
  visitor: number
}

interface goalsBet extends bet {
  house: boolean
  goals: number
}
