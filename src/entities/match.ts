class Match {
  id: string
  champId: string
  house: number
  visitor: string

  constructor (init: Partial<Match>) {
    Object.assign(this, init)
  }
}

export default Match
