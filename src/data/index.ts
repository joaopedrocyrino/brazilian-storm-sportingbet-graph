import 'dotenv/config'
import { Pool } from 'pg'

class Database {
  private pool: Pool

  init (): void {
    this.pool = new Pool({
      connectionString: process.env.DATABASE_STRING
    })
  }

  async query<T>(queryString: string): Promise<T[]> {
    const client = await this.pool.connect()

    const res: { rows: T[] } = await client.query(queryString)

    client.release()

    return res.rows
  }
}

export default new Database()
