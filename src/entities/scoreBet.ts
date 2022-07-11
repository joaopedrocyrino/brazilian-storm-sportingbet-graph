import Bet from './bet'

class ScoreBet extends Bet {
  house: number
  visitor: number

  constructor ({ house, visitor, ...bet }: Partial<ScoreBet>) {
    super(bet)
    Object.assign(this, { house, visitor })
  }
}

export default ScoreBet
