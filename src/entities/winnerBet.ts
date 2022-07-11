import Bet from './bet'

class WinnerBet extends Bet {
  house: boolean

  constructor ({ house, ...bet }: Partial<WinnerBet>) {
    super(bet)
    Object.assign(this, { house })
  }
}

export default WinnerBet
