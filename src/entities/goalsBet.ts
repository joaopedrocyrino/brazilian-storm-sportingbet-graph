import Bet from './bet'

class GoalsBet extends Bet {
  house: boolean
  goals: number

  constructor ({ house, goals, ...bet }: Partial<GoalsBet>) {
    super(bet)
    Object.assign(this, { house, goals })
  }
}

export default GoalsBet
