import Database from '..'
import { Championship } from '../../entities'

class ChampionshipQuery {
  async getMany (): Promise<Championship[]> {
    const championships = await Database.query<Championship>('SELECT * FROM championship')

    return championships
  }
}

export default new ChampionshipQuery()
