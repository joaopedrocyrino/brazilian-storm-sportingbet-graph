import Services from '../Services'
import { ChampionshipQuery } from '../../data/query'
import { Championship } from '../../entities'

class ChampionshipServices extends Services {
  async getMany (): Promise<Championship[]> {
    const champs = await ChampionshipQuery.getMany()
    return champs
  }
};

export default new ChampionshipServices()
