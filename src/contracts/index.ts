import Web3 from 'web3'
import moment from 'moment'

import Database from '../data'

import BrazilianJson from './artifacts/contracts/BrazilianStorm.sol/BrazilianStormSportingbet.json'
import MatchesJson from './artifacts/contracts/Matches.sol/Matches.json'
import BetsJson from './artifacts/contracts/Bets.sol/Bets.json'

class Contracts {
  brazilianContract: any
  mathcesContract: any
  betsContract: any

  constructor () {
    const web3 = new Web3(process.env.RPCURL)

    // @ts-expect-error
    this.brazilianContract = new web3.eth.Contract(BrazilianJson.abi, process.env.BRAZILIAN_ADDRESS)
    // @ts-expect-error
    this.mathcesContract = new web3.eth.Contract(MatchesJson.abi, process.env.MATCHES_ADDRESS)
    // @ts-expect-error
    this.betsContract = new web3.eth.Contract(BetsJson.abi, process.env.BET_ADDRESS)
  }

  async init (): Promise<any> {
    this.mathcesContract.events.ChampionshipInserted()
      .on('data', (event) => {
        this.insertChampionships([event.returnValues])
          .catch(() => {})
      }).on('error', console.error)

    this.mathcesContract.events.MatchInserted()
      .on('data', (event) => {
        this.insertMatches([event.returnValues])
          .catch(() => {})
      }).on('error', console.error)

    this.betsContract.events.WinnerBetInserted()
      .on('data', (event) => {
        this.insertWinnerBets([event.returnValues])
          .catch(() => {})
      }).on('error', console.error)

    this.betsContract.events.ScoreBetInserted()
      .on('data', (event) => {
        this.insertScoreBets([event.returnValues])
          .catch(() => {})
      }).on('error', console.error)

    this.betsContract.events.GoalsBetInserted()
      .on('data', (event) => {
        this.insertGoalsBets([event.returnValues])
          .catch(() => {})
      }).on('error', console.error)

    const championships = await this.mathcesContract.getPastEvents('ChampionshipInserted', {
      fromBlock: 0,
      toBlock: 'latest'
    })

    const matches = await this.mathcesContract.getPastEvents('MatchInserted', {
      fromBlock: 0,
      toBlock: 'latest'
    })

    const winnerBets = await this.betsContract.getPastEvents('WinnerBetInserted', {
      fromBlock: 0,
      toBlock: 'latest'
    })

    const scoreBets = await this.betsContract.getPastEvents('ScoreBetInserted', {
      fromBlock: 0,
      toBlock: 'latest'
    })

    const goalsBets = await this.betsContract.getPastEvents('GoalsBetInserted', {
      fromBlock: 0,
      toBlock: 'latest'
    })

    await this.insertChampionships(championships.map(c => c.returnValues))
    await this.insertMatches(matches.map(m => m.returnValues))
    await Promise.all([
      this.insertWinnerBets(winnerBets.map(b => b.returnValues)),
      this.insertGoalsBets(goalsBets.map(b => b.returnValues)),
      this.insertScoreBets(scoreBets.map(b => b.returnValues))
    ])
  }

  private async insertChampionships (champs: Array<{
    id: string
    name: string
    season: number
    country: string
  }>): Promise<any> {
    if (champs.length) {
      let queryString = 'INSERT INTO championship (id, name, season, country) VALUES '

      champs.forEach(c => {
        queryString += `('${c.id}', '${c.name}', ${c.season}, '${c.country}'), `
      })

      await Database.query(queryString.slice(0, -2))
    }
  }

  private async insertMatches (matches: Array<{
    id: string
    champId: string
    house: string
    visitor: string
    start: string
  }>): Promise<any> {
    if (matches.length) {
      let queryString = 'INSERT INTO match (id, champ_id, house, visitor, start) VALUES '

      matches.forEach(m => {
        queryString += `('${m.id}', '${m.champId}', '${m.house}', '${m.visitor}', '${moment.unix(Number(m.start)).utc().format()}'), `
      })

      await Database.query(queryString.slice(0, -2))
    }
  }

  private async insertWinnerBets (bets: Array<{
    id: string
    champId: string
    matchId: string
    better: string
    value: string
    house: boolean
  }>): Promise<any> {
    if (bets.length) {
      let queryString = 'INSERT INTO winner_bet (id, champ_id, match_id, better, "value", house) VALUES '

      bets.forEach(b => {
        queryString += `('${b.id}', '${b.champId}', '${b.matchId}', '${b.better}', '${b.value}', ${b.house ? 'true' : 'false'}), `
      })

      await Database.query(queryString.slice(0, -2))
    }
  }

  private async insertScoreBets (bets: Array<{
    id: string
    champId: string
    matchId: string
    better: string
    value: string
    house: number
    visitor: number
  }>): Promise<any> {
    if (bets.length) {
      let queryString = 'INSERT INTO score_bet (id, champ_id, match_id, better, "value", house, visitor) VALUES '

      bets.forEach(b => {
        queryString += `('${b.id}', '${b.champId}', '${b.matchId}', '${b.better}', '${b.value}', ${b.house}, ${b.visitor}), `
      })

      await Database.query(queryString.slice(0, -2))
    }
  }

  private async insertGoalsBets (bets: Array<{
    id: string
    champId: string
    matchId: string
    better: string
    value: string
    house: boolean
    goals: number
  }>): Promise<any> {
    if (bets.length) {
      let queryString = 'INSERT INTO goals_bet (id, champ_id, match_id, better, "value", house, goals) VALUES '

      bets.forEach(b => {
        queryString += `('${b.id}', '${b.champId}', '${b.matchId}', '${b.better}', '${b.value}', ${b.house ? 'true' : 'false'}, ${b.goals}), `
      })

      await Database.query(queryString.slice(0, -2))
    }
  }
}

export default new Contracts()
