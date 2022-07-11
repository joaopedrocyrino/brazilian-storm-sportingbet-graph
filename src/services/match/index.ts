import Services from '../Services'
import { MatchQuery } from '../../data/query'
import { Match } from '../../entities'
import { getManyValidator } from './validators'

class MatchServices extends Services {
  async getMany (champId?: string): Promise<Match[]> {
    await this.gateway({
      req: { champId },
      schema: getManyValidator
    })

    const matches = await MatchQuery.getMany(champId)

    return matches
  }
};

export default new MatchServices()
