class Championship {
  id: string
  name: string
  season: number
  country: string

  constructor (init: Partial<Championship>) {
    Object.assign(this, init)
  }
}

export default Championship
