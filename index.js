import Grid from "./grid.js"
import { _supabase } from "./supabase.js"
import { createConnection } from "./sockets.js"
import { getData } from "./db-functions.js"

createConnection()

export async function update() {
    const numList = (await getData()).data
    console.log(numList)

    if (numList) {
        Grid(numList).updateGrid()
    }
}

update()
