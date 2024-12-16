import { log } from "console"
import { connect, disconnect }from "mongoose"

async function connectToDatabase() {
    try {
        await connect(process.env.MONGODB_URL)
        console.log("Connected to Dababase")
    }
    catch (err) {
        console.log(err)
        throw new Error("cannot connect to mogodb")
    }

}

async function disconnectFromDatabase() {
    try {
        await disconnect()
    } 
    catch(err) {
        console.log(err)
        throw new Error("cannot disconnect to mogodb")
    }
}

export { connectToDatabase, disconnectFromDatabase }