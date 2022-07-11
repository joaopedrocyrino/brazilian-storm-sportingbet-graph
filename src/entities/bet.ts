class Bet {
  id: string
  champId: string
  matchId: string
  better: string
  value: string

  constructor (init: Partial<Bet>) {
    Object.assign(this, init)
  }
}

export default Bet
