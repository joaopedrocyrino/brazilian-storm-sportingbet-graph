import moment from 'moment'
import Database from '..'
import { Match } from '../../entities'

class MatchQuery {
  async getMany (champId?: string): Promise<Match[]> {
    let queryString = `SELECT * FROM match WHERE start > '${moment().utc().format()}'`

    if (champId) { queryString += ` AND champ_id = '${champId}'` }

    const matches = await Database.query<match>(queryString)

    return matches.map(({ champ_id, ...m }) => new Match({
      champId: champ_id,
      ...m
    }))
  }
}

export default new MatchQuery()

interface match {
  id: string
  champ_id: string
  house: number
  visitor: string
}
