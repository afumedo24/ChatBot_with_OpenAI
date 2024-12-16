import app from "./app.js"
import { connectToDatabase, disconnectFromDatabase } from "./db/connect.js"

const port = process.env.PORT

connectToDatabase().then(() => {
  app.listen(port, () => {
    console.log(`Server stated on Port ${port}...`)
  })
}).catch((err) => console.log(err))


