import Database from './data'
import app from './app'
import Contracts from './contracts'

Database.init()

Contracts.init()
  .catch((err) => { console.log('❌ Failed to start contracts', err) })

app.listen({ port: 5000 })
  .then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`)
  })
  .catch(err => { console.log('❌ Failed to start server', err) })
